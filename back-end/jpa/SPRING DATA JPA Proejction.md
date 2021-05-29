# Spring Data Jpa Proejction
[참조](https://www.baeldung.com/spring-data-jpa-projections)
* 엔티티가 아닌 DTO 를 이용해서 데이터를 조회가능.
* 단순한 쿼리의 목적으로 사용해야함, 복잡해지면 QueryDSL 을 추천함.
```java
publicinterfaceUsernameOnly{    
	String getUsername();
}
```
> 단순히 유저 이름을 조회 하고 싶을떄 위와 같이 getter 를 이용해서 함수만 생성해두면 조회 가능

* 쿼리는 아래와 같이 이름만 조회하도록 나간다
```sql
select m.username from member m
``` 
