# SPRING DATA JPA 반환타입 지원

* Spring Data JPA 는 다양한 형태의 반환형을 지원한다. [참조 링크](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repository-query-return-types)

  ```java
  List<Member> findListByUsername(String username); //컬렉션
  Member findMemberByUsername(String username); //단건
  Optional<Member> findOptionalByUsername(String username); //단건 Optional
  ```

  > 3가지 다 결과가 정상적으로 조회된다.
  > 단, 단건 조회의 경우 null safe 하지 않으므로 Optional 사용을 권장한다.

