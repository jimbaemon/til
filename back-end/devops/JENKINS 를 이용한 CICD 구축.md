# JENKINS 를 이용한 CI/CD 구축

​	![image-20210320120426382](http://www.jimbae.com:59005/image/255)


## 도커 설치 [CENTOS7]

```bash
yum -y update
yum install -y yum-utils device-mapper-persistent-data lvm2 #뭔지 모르겠다.
yum install docker-ce #무료 버전 설치 https://nobase-dev.tistory.com/34 참조
systemctl start docker
```



## jenkins 설치

![image-20210319192355679](http://www.jimbae.com:59005/image/250)

> docker hub 에서 jenkins latest 버전확인

```bash 
docker run -d -p 8080:8080 -v ~/config:/app/config -v /app/jenkins_home/var/jenkins_home --name jk jimbae/jenkins-tripko
docker exec -it jk cat /var/jenkins_home/secrets/initialAdminPassword #초기화 암호 조회
```



![image-20210319193231782](http://www.jimbae.com:59005/image/252)

> 초기화 암호 입력후 추천 플러그인 설치



## JENKINS 를 통한 CI 환경 구축

### Github 연동

* 새로운 Item 생성
* build 설정
* WebHook 설정



### S3 연동

> https://m.blog.naver.com/PostView.nhn?blogId=chcjswoda&logNo=221069905153

* IAM 사용자 생성 [S3 접근 권한 추가]
* Jenkins 에 사용자 프로필 등록
* Jenkins 에 S3 빌드파일 업로드 추가



### AWS CODEDeploy 활성화





https://goddaehee.tistory.com/258

https://goddaehee.tistory.com/260



## AWS CODEDeploy 활성화

https://jojoldu.tistory.com/265?category=635883

https://galid1.tistory.com/747



### S3 Jenkins 연동





## NGINX 를 이용한 CD 환경 구축

```bash
sudo amazon-linux-extras install -y nginx1
sudo service nginx start
```









https://zetawiki.com/wiki/CentOS7_docker_%EC%84%A4%EC%B9%98

