# SPRING DATA JPA 사용자 정의 리포지토리 구현

* Spring Data Jpa 는 인터페이스만 정의하고 구현체는 스프링이 자동 생성한다.
* 실무에서는 쿼리를 직접 구현해야 하는 경우도 많은데, 인터페이스 특징상 구현하려면 모든 추상체를 구현해야 한다.
* Spring Data Jpa 를 이용하면서 직접 구현하는 방법에 대해서 알아보자



## 1. 직접 정의할 메소드를 가진 리포지토리 인터페이스 생성

```java
public interface MemberRepositoryCustom {
	List<Member> findMemberCustom();
}
```



## 2. 정의한 메소드를 상속후 구현

```java
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{

	private final EntityManager em;

	@Override
	public List<Member> findMemberCustom() {
		return em.createQuery("select m from Member m")
			.getResultList();
	}
}
```

> 상속받을 Spring Data Jpa 리포지토리명 + Impl (`MemberRepositoryImpl`) 규칙을 지켜줘야 한다.



## 3. 위에서 생성한 인터페이스를 Spring Data Jpa 인터페이스에서 상속 받는다

```java
public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {
	...
}
```

