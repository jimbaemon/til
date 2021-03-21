# CENTOS 7 방화벽 허용 목록 조회/추가/삭제

## 방화벽 허용 목록 조회

```bash
firewall-cmd --list-all
```

![image-20210320001008435](http://www.jimbae.com:59005/image/253)



## 방화벽 허용 목록 추가

```bash
firewall-cmd --add-port=[port]/[tcp/udp] --permanent #--permanent 미추가시 reload 하면 사라진다..
```



## 방화벽 허용 목록 삭제

```bash
firewall-cmd --remove-port=[port]/[tcp/udp] --permanent
```



## 방화벽 변경 사항 적용

```bash
firewall-cmd --reload
```

