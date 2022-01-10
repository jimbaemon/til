# SPRING DATA JPA 리스트 바인딩 하기

* in 사용후 컬렉션 형태의 변수 바인딩시 자동으로 조회문을 만들어 준다

```
@Query("select m from Member m where m.username in :names")
List<Member> findByNames(@Param("names") Collection<String> names);
```

## 실행결과

![image-20210414221850499](http://www.jimbae.com:59005/image/271)