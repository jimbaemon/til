# 스프린트 1일차 - Docker 설치하기

집에서 사용하는 서버에 Docker 를 설치해 보겠습니다.

※ 도커에 대한 도움은 [Docker Docs](https://docs.docker.com/get-started/overview/) 를 참조 했습니다.



## 설치하기

[도커 설치 - Cent OS](https://docs.docker.com/engine/install/centos/) 를 참조 했고, Repository를 이용해 설치 했습니다.

### 1. 구버전 삭제

```bash
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate \
                  docker-logrotate docker-engine
```

![image-20210719222720165](/Users/jimbae/Library/Application Support/typora-user-images/image-20210719222720165.png)



### 2. 레포지토리 설정

yum-utils 패키지 설치후 repository를 설정한다.

```bash
$sudo yum install -y yum-utils
$sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```



### 3. Docker Engine 설치 및 실행

기본 설치시 아래 명령어를 이용한다.

```bash
$yum install docker-ce docker-ce-cli containerd.io
```



특별 버전을 설치하고 싶으면 아래 명령어로 버전 검색후

```bash
$yum list docker-ce --showduplicates | sort -r
```

![스크린샷 2021-07-19 오후 10.45.22](/Users/jimbae/Pictures/ScreenCapture/스크린샷 2021-07-19 오후 10.45.22.png)

아래와 같이 버전을 입력하여 설치하면 된다.

```shell
 $sudo yum install docker-ce-{VERSION_STRING} docker-ce-cli-{VERSION_STRING} containerd.io
```



설치를 완료 하고 docker 를 시작해 준다.

```shell
$systemctl start docker
```



**설치 완료**

![image-20210719225655318](/Users/jimbae/Library/Application Support/typora-user-images/image-20210719225655318.png)

