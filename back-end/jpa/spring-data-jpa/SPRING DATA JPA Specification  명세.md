# SPRING DATA JPA Specification  명세

* 책 도메인 주도 설계 는 SPECIFICATION(명세)라는 개념을 소개
* 스프링 데이터 JPA는 JPA Criteria를 활용해서 이 개념을 사용할수 있도록 지원
* 실무에서 쓰기 애매하다고 한다.



```java
public interface MemberRepository extends JpaRepository<Member, Long>, JpaSpecificationExecutor<Member> {
	...
}
```

> JpaSpecificationExecutor<T> 를 상속받으면 된다.