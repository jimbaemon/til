# 스프린트 4일차 - SSL 생성 및 Lets Encrypt 연결

## Stand-up

- What did I work on yesterday?
  - N/A
- What am I working on today?
  - openSSL 이용 SSL 생성, Nginx 를 이용한 Lets Encrypt 동기화
- What issues are blocking me?
  - N/A



Docker Regisry 에 외부에서 로그인 하기 위해서는 Https 를 통한 통신이 필요하다. 설정을 통해  Https 통신 없이 이용할수도 있지만 추후 이용할 서비스에서도 Https 는 필요하니 사전에 발급받아둔다.

SSL 발급은 CertBot 을 이용하여 설치 갱신 을 받아줄 것이다.



## Nginx 및 CertBot Docker Compose 생성하기

설치에 대한 전반적인 개요는 [[nginx에 Let's Encrypt 적용하기 (certbot, docker)](https://g-g-g-g.tistory.com/entry/nginx에-Lets-Encrypt-적용하기-certbot-docker)]를 참조 하였고, 

소스는 [[docker-nginx-certbot](https://github.com/staticfloat/docker-nginx-certbot)] 를 참조하였다.



### 소스 분석

**/scripts/util.sh**

```shell
#!/bin/bash

# Helper function to output error messages to STDERR, with red text
error() {
    (set +x; tput -Tscreen bold
    tput -Tscreen setaf 1
    echo $*
    tput -Tscreen sgr0) >&2
}

parse_extra_domains() {
    extra_domains_conf=/etc/certbot/extra_domains/$1
    if [ -f $extra_domains_conf ]; then 
        cat $extra_domains_conf | xargs echo
    fi
}

# Helper function that sifts through /etc/nginx/conf.d/, looking for lines that
# contain ssl_certificate_key, and try to find domain names in them.  We accept
# a very restricted set of keys: Each key must map to a set of concrete domains
# (no wildcards) and each keyfile will be stored at the default location of
# /etc/letsencrypt/live/<primary_domain_name>/privkey.pem
parse_domains() {
    sed -n -r -e 's&^\s*ssl_certificate_key\s*\/etc/letsencrypt/live/(.*)/privkey.pem;\s*(#.*)?$&\1&p' /etc/nginx/conf.d/*.conf* | sort | uniq | xargs echo
}

# Given a config file path, spit out all the ssl_certificate_key file paths
parse_keyfiles() {
    sed -n -e 's&^\s*ssl_certificate_key\s*\(.*\);&\1&p' "$1"
}

# Given a config file path, return 0 if all keyfiles exist (or there are no
# keyfiles), return 1 otherwise
keyfiles_exist() {
    for keyfile in $(parse_keyfiles $1); do
        currentfile=${keyfile//$'\r'/}
        if [ ! -f $currentfile ]; then
            echo "Couldn't find keyfile $currentfile for $1"
            return 1
        fi
    done
    return 0
}

# Helper function that sifts through /etc/nginx/conf.d/, looking for configs
# that don't have their keyfiles yet, and disabling them through renaming
auto_enable_configs() {
    for conf_file in /etc/nginx/conf.d/*.conf*; do
        if keyfiles_exist $conf_file; then
            if [ ${conf_file##*.} = nokey ]; then
                echo "Found all the keyfiles for $conf_file, enabling..."
                mv $conf_file ${conf_file%.*}
            fi
        else
            if [ ${conf_file##*.} = conf ]; then
                echo "Keyfile(s) missing for $conf_file, disabling..."
                mv $conf_file $conf_file.nokey
            fi
        fi
    done
}

# Helper function to ask certbot for the given domain(s).  Must have defined the
# EMAIL environment variable, to register the proper support email address.
get_certificate() {
    echo "Getting certificate for domain $1 on behalf of user $2"
    PRODUCTION_URL='https://acme-v02.api.letsencrypt.org/directory'
    STAGING_URL='https://acme-staging-v02.api.letsencrypt.org/directory'

    if [ "${IS_STAGING}" = "1" ]; then
        letsencrypt_url=$STAGING_URL
        echo "Staging ..."
    else
        letsencrypt_url=$PRODUCTION_URL
        echo "Production ..."
    fi
    
    opt_domains=$(for i in $1; do printf -- "-d $i "; done;)

    echo "running certbot ... $letsencrypt_url $1 $2"
    certbot certonly --expand --agree-tos --keep -n --text --email $2 --server \
        $letsencrypt_url $opt_domains --http-01-port 1337 \
        --standalone --preferred-challenges http-01 --debug
}

# Given a domain name, return true if a renewal is required (last renewal
# ran over a week ago or never happened yet), otherwise return false.
is_renewal_required() {
    # If the file does not exist assume a renewal is required
    last_renewal_file="/etc/letsencrypt/live/$1/privkey.pem"
    [ ! -e "$last_renewal_file" ] && return;
    
    # If the file exists, check if the last renewal was more than a week ago
    one_week_sec=604800
    now_sec=$(date -d now +%s)
    last_renewal_sec=$(stat -c %Y "$last_renewal_file")
    last_renewal_delta_sec=$(( ($now_sec - $last_renewal_sec) ))
    is_finshed_week_sec=$(( ($one_week_sec - $last_renewal_delta_sec) ))
    [ $is_finshed_week_sec -lt 0 ]
}

# copies any *.conf files in /etc/nginx/user.conf.d
# to /etc/nginx/conf.d so they are included as configs
# this allows a user to easily mount their own configs
# We make use of `envsubst` to allow for on-the-fly templating
# of the user configs.
template_user_configs() {
    SOURCE_DIR="${1-/etc/nginx/user.conf.d}"
    TARGET_DIR="${2-/etc/nginx/conf.d}"

    # envsubst needs dollar signs in front of all variable names
    DENV=$(echo ${ENVSUBST_VARS} | sed -E 's/\$*([^ ]+)/\$\1/g')

    echo "templating scripts from ${SOURCE_DIR} to ${TARGET_DIR}"
    echo "Substituting variables ${DENV}"

    if [ ! -d "$SOURCE_DIR" ]; then
        echo "no ${SOURCE_DIR}, nothing to do."
    else
        for conf in ${SOURCE_DIR}/*.conf; do
            echo " -> ${conf}"
            envsubst "${DENV}" <"${conf}" > "${TARGET_DIR}/$(basename ${conf})"
        done
    fi
}
```

* 각종 유틸들이다.



**/scripts/entrypoint.sh**

```shell

#!/bin/bash

# When we get killed, kill all our children
# 강제 종료시 하위 프로세스 종료
trap "exit" INT TERM
trap "kill 0" EXIT

# Source in util.sh so we can have our nice tools
# util.sh 실행
. $(cd $(dirname $0); pwd)/util.sh

# first include any user configs if they've been mounted
# 사용자 설정 가져오기
template_user_configs

# Immediately run auto_enable_configs so that nginx is in a runnable state
auto_enable_configs

# Start up nginx, save PID so we can reload config inside of run_certbot.sh
nginx -g "daemon off;" &
NGINX_PID=$!

# Lastly, run startup scripts
for f in /scripts/startup/*.sh; do
    if [ -x "$f" ]; then
        echo "Running startup script $f"
        $f
    fi
done
echo "Done with startup"

# Instead of trying to run `cron` or something like that, just sleep and run `certbot`.
while [ true ]; do
    # Make sure we do not run container empty (without nginx process).
    # If nginx quit for whatever reason then stop the container.
    # Leave the restart decision to the container orchestration.
    if ! ps aux | grep --quiet [n]ginx ; then
        exit 1
    fi

    # Run certbot, tell nginx to reload its config
    echo "Run certbot"
    /scripts/run_certbot.sh
    kill -HUP $NGINX_PID

    # Sleep for 1 week
    sleep 604810 &
    SLEEP_PID=$!

    # Wait for 1 week sleep or nginx
    wait -n "$SLEEP_PID" "$NGINX_PID"
done
```

* 실행 쉘



**/scripts/run_certbot.sh**

```shell
#!/bin/bash

# Source in util.sh so we can have our nice tools
. $(cd $(dirname $0); pwd)/util.sh

# We require an email to register the ssl certificate for
if [ -z "$CERTBOT_EMAIL" ]; then
    error "CERTBOT_EMAIL environment variable undefined; certbot will do nothing"
    exit 1
fi

exit_code=0
set -x
# Loop over every domain we can find
for domain in $(parse_domains); do
    if is_renewal_required $domain; then
        extra_domains=$(parse_extra_domains $domain)
        renewal_domains="$domain $extra_domains"
        # Renewal required for this doman.
        # Last one happened over a week ago (or never)
        if ! get_certificate "$renewal_domains" $CERTBOT_EMAIL; then
            error "Cerbot failed for $renewal_domain. Check the logs for details."
            exit_code=1
        fi
    else
        echo "Not run certbot for $domain; last renewal happened just recently."
    fi
done

# After trying to get all our certificates, auto enable any configs that we
# did indeed get certificates for
auto_enable_configs

set +x
exit $exit_code

```





**./conf/nginx.conf**

```shell
server {
    listen              443 ssl;
    server_name         host.that.wanted;
    ssl_certificate     /etc/letsencrypt/live/host.that.wanted/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/host.that.wanted/privkey.pem;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

* 원하는 도메인을 server_name 으로 지정하고 ssl 지정 경로에도 해당 도메인을 넣어준다.



**Dockerfile**

```Dock
FROM nginx

VOLUME /etc/letsencrypt
EXPOSE 80
EXPOSE 443

# Do this apt/pip stuff all in one RUN command to avoid creating large
# intermediate layers on non-squashable docker installs
# 하위 명령어를 한줄로 처리하여, 많은 요청을 줄여준다.
RUN apt update && \
    apt install -y python3 python3-dev libffi6 libffi-dev libssl-dev curl build-essential procps && \
    curl -L 'https://bootstrap.pypa.io/get-pip.py' | python3 && \
    pip install -U cffi certbot && \
    apt remove --purge -y python3-dev build-essential libffi-dev libssl-dev curl && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy in scripts for certbot
# 스크립트 복사
COPY ./scripts/ /scripts
RUN chmod +x /scripts/*.sh

# Add /scripts/startup directory to source more startup scripts
# 스크립트용 폴더 생성
RUN mkdir -p /scripts/startup

# Copy in default nginx configuration (which just forwards ACME requests to
# certbot, or redirects to HTTPS, but has no HTTPS configurations by default).
# 컨테이너 내 nginx 설정 파일 제거 후, certbot 용 conf.d 복사
RUN rm -f /etc/nginx/conf.d/*
COPY nginx_conf.d/ /etc/nginx/conf.d/


ENTRYPOINT []
CMD ["/bin/bash", "/scripts/entrypoint.sh"]
```

* nginx 이미지로 컨테이너를 생성, 내부에서 certbot 을 설치해 준다.
* certbot 으로 SSL 자동발급 해주는 script 복사후 실행



**Makefile**

````makefile
$(warning $(shell IMAGE_NAME=$(IMAGE_NAME) printenv | grep IMAGE_NAME))
ifndef IMAGE_NAME
	#$(warning IMAGE_NAME is not set)
	IMAGE_NAME=nginx-certbot
endif

# If we have `--squash` support, then use it!
ifneq ($(shell docker build --help 2>/dev/null | grep squash),)
DOCKER_BUILD = docker build --squash
else
DOCKER_BUILD = docker build
endif

all: build

build: Makefile Dockerfile
	$(DOCKER_BUILD) -t $(IMAGE_NAME) .
	@echo "Done!  Use docker run $(IMAGE_NAME) to run"

push:
	docker push $(IMAGE_NAME)
````

* 빌드용 파일로 별 내용이 없다.





## 실행후 결과

![스크린샷 2021-07-25 오전 12.33.09](/Users/jimbae/Pictures/ScreenCapture/스크린샷 2021-07-25 오전 12.33.09.png)

