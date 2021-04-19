# SPRING DATA JPA, @EntityGraph 이용해 fetch Join 하기

* JPA 에서는 N+1 를 막기 위해 fetch join 을 사용한다.

  ```java
  @Query("select m from Member m left join fetch m.team")
  List<Member> findMemberFetchJoin();
  ```



* Spring Data Jpa 는 매번 쿼리문을 작성하지 않게끔 @EntityGraph 를 지원한다.

* 사용법은 아래와 같다

* `@EntityGraph(attributePaths ={"[조인할 테이블]"})`

  ```java
  @Override
  @EntityGraph(attributePaths = {"team"})
  List<Member> findAll();
  
  @EntityGraph(attributePaths = {"team"})
  @Query
  List<Member> findMemberEntityGraph();
  
  @EntityGraph(attributePaths  = ("team"))
  List<Member> findEntityGraphByUsername(@Param("username") String username);
  ```

  



