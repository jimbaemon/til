# 스프린트 2일차 - Docker Compose공부하기

## Stand-up

- What did I work on yesterday?
  - Docker 서비스 설치
- What am I working on today?
  - Docker Compose 공부 및 내용 정리
- What issues are blocking me?
  - N/A

![스크린샷 2021-07-20 오후 10.26.52](/Users/jimbae/Pictures/ScreenCapture/스크린샷 2021-07-20 오후 10.26.52.png)



## Docker Compose

[Docker Compose Docs](https://docs.docker.com/compose/) 및 하위 문서를 참조 했습니다.

Docker Run 을 이용해서 Repository 또는 Hub 에서 Image 를 pull 받아 이용할수도 있지만, 매번 컨테이너를 생성할때마다 명령어를 입력하면 재사용성이 떨어지게 되고, 자신이 생성한 컨테이너를 추적하기가 힘들어 질수 있습니다. 이럴때 Docker Compose 를 사용하여 상황별로 Docker Container 를 관리해 줄수 있습니다.

Docker Compose 를 만드는 단계 3가지

* `Dockerfile` 를 이용해  app 구성
* `docker-compose.yml` 를 생성하여 다양한 환경에서 동일한 컨테이너 구성
* `$Docker-compose up` 명령어로 활성화



### Docker compose 설치하기 [리눅스]

* Docker Compose 다운로드 및 설치

  ```rbash
  curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  ```

* 권한설정

  ```bash
  chmod +x /usr/local/bin/docker-compose
  ```

* 설치여부 확인

  ```bash
  docker-compose --version
  ```

![스크린샷 2021-07-20 오후 11.08.38](/Users/jimbae/Pictures/ScreenCapture/스크린샷 2021-07-20 오후 11.08.38.png)



## Python 을 이용한 Docker-Compose 체험하기

### 1. 기본 설정

* 프로젝트 폴더 생성하기

  ```bash
  mkdir composetest
  cd composetest
  ```

* app.py 생성

  ```python
  import time
  
  import redis
  from flask import Flask
  
  app = Flask(__name__)
  cache = redis.Redis(host='redis', port=6379)
  
  def get_hit_count():
      retries = 5
      while True:
          try:
              return cache.incr('hits')
          except redis.exceptions.ConnectionError as exc:
              if retries == 0:
                  raise exc
              retries -= 1
              time.sleep(0.5)
  
  @app.route('/')
  def hello():
      count = get_hit_count()
      return 'Hello World! I have been seen {} times.\n'.format(count)
  ```

* requiredment.txt 생성

  ```txt
  flask
  redis
  ```

  

### 2. Dockerfile 생성

Docker Image 를 생성하기 위한 `Dockerfile` 를 생성하자, 내부에는 python app 을 실행하기 위한 재료와, python app 을 포함한다.

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
```

This tells Docker to:

- Build an image starting with the Python 3.7 image.
- Set the working directory to `/code`.
- Set environment variables used by the `flask` command.
- Install gcc and other dependencies
- Copy `requirements.txt` and install the Python dependencies.
- Add metadata to the image to describe that the container is listening on port 5000
- Copy the current directory `.` in the project to the workdir `.` in the image.
- Set the default command for the container to `flask run`.



### 3. Compose file 로 서비스 구현하기

```yaml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```

#### web 서비스

* `build: .` 
  * . 폴더의 Dockerfile 가 있으면 build 한다.
* `ports: - "5000:5000"`
  * 외부포트:내부포트

### redis 서비스

* `image: "redis:alpine"`
  * Docker Hub Registry 에서 redis:alpine 이미지를 내려받아 사용한다.



### 4. Compose 를 이용하여 App 빌드 실행

* `docker-compse up` 명령어를 이용하여 app 을 빌드하고 실행해 준다.

<video src="/Users/jimbae/Pictures/ScreenCapture/화면 기록 2021-07-20 오후 11.38.30.mov"></video>

* 테스트 하기

  ``` bash
  curl http://localhost:5000/ 
  ```

  ![스크린샷 2021-07-20 오후 11.41.26](/Users/jimbae/Pictures/ScreenCapture/스크린샷 2021-07-20 오후 11.41.26.png)

