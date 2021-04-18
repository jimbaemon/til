# 벌크성 수정쿼리

```java
@Modifying(clearAutomatically = true)
@Query("update Member m set m.age = m.age+1 where m.age >= :age")
int bulkAgePlus(@Param("age") int age);
```

* `@Modifying` : executeUpdate 기능



* bulk연산 후에는 디비의 반영된 값이 영속성 컨텍스트에도 반영되게끔 entity 매니저를 `clear` 해줘야 한다.
* 혹은 Modifying 옵션에서 @Modifying(clearAutomatically = true) 을 해주면 된다.