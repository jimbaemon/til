# 스프린트 5일차 - Docker Registry 생성

## Stand-up

- What did I work on yesterday?
  - SSL CertBot with ngingx
- What am I working on today?
  - openSSL 이용 SSL 생성, Nginx 를 이용한 Lets Encrypt 동기화
- What issues are blocking me?
  - N/A



## Docker Registry 생성

    ssl_certificate     /etc/letsencrypt/live/registry.jimbae.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/registry.jimbae.com/privkey.pem;
