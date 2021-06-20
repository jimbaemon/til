# JPA - 준영속 상태

* 영속 상태의 엔티티가 영속성 컨텍스트에서 분리
* 영속성 컨텍스트가 제공하는 기능을 사용 못함.



```java
...
	Member member = em.find(Member.classs, 1L); //JPQL 사용시 영속성 관리를 받게된다.

	em.detach(member); //영속성 컨텍스트에서 제거 

	member.setName("AAA"); //준영속 상태이므로 update 가 발생하지 않는다.
...
```



## 준영속 상태로 만드는법

* em.detach(entity) : 특정 엔디디만 준영속 상태로 전환
* em.clear() : 영속성 컨텍스트 완전 초기화

* em.close() : 영속성 컨텍스트 종료