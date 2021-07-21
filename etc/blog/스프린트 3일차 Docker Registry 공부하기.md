# 스프린트 2일차 - Docker Compose공부하기

## Stand-up

- What did I work on yesterday?
  - Docker Compose 공부 및 정리
- What am I working on today?
  - Docker Registry 내용 정리 및 Docker compose 로 구동해보기
- What issues are blocking me?
  - N/A

![스크린샷 2021-07-21 오후 10.18.02](/Users/jimbae/Pictures/ScreenCapture/스크린샷 2021-07-21 오후 10.18.02.png)



## Docker Registry

[Docker Registry Docs](https://docs.docker.com/registry/) 및 하위 문서를 참조 했습니다.

Docker Registry 는 Docker image 를 관리해주는 open source 도구입니다.

개인적으로 이용하는 Docker Image 를 Docker Hub 가 아닌 private 서버에 두고 사용할수 있어서 유용합니다.

기본적으로 `docker pull ubuntu` 와 같이 이용하던 명령어는 사실, `docker pull docker.io/library/ubuntu` 와 동일합니다. 

특별한 Registry 에서 이미지를 받고 싶으면 `docker pull {Registry 도메인}:{Port}/library/ubuntu` 와 같이 registry 도메인과 포트를 앞에 입력해 주어야 합니다.



### 시작하기

local 에서 Docker Regitry 를 실행해 보겠습니다.

registry version 2를 registry 라는 컨테이너 명으로 시작.

```bash
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```



### 기존 이미지를 내 개인 Repository에 넣어보기

1.  `ubuntu:16.04` 이미지를 내려 받습니다.

   ```
   $ docker pull ubuntu:16.04
   ```

2. 이미지에 `localhost:5000/my-ubuntu`. 개인 레포지토리 도메인:포트 와 사용할 이미지 명으로 태그를 추가해 줍니다.

   ```
   $ docker tag ubuntu:16.04 localhost:5000/my-ubuntu
   ```

3. 이미지를 실행중인 개인 레포지토리 `localhost:5000`: 로 푸쉬 합니다

   ```
   $ docker push localhost:5000/my-ubuntu
   ```

4. 이미 가지고 있는 이미지를 지웁니다.

   ```
   $ docker image remove ubuntu:16.04
   $ docker image remove localhost:5000/my-ubuntu
   ```

5.  `localhost:5000/my-ubuntu` 를 내려받으면 로컬 레포지토리에서 정상적으로 이미지를 다운로드 하는것을 확인 가능 합니다.

   ```
   $ docker pull localhost:5000/my-ubuntu
   ```



### 인증서 발급받기

개인 레지스트리를 외부에서 접속할때, 로그인과 같은 보안을 사용하려면 기본적으로 https 로 통신하여야 하기 때문에 인증서를 받아야 합니다...

[OpenSSL 로 인증서 만들기](https://oingdaddy.tistory.com/229)

[OpenSSL Lets Encrypt 로 인증 받고 갱신하기](https://www.tuwlab.com/ece/28638)

