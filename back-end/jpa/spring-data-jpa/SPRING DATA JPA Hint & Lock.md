# SPRING DATA JPA Hint & Lock

## JPA Hint

* 영속성 컨텍스트는 기본적으로 `변경감지` 위하여 데이터의 원본[`스냅샷`]을 가지고 있어야 한다.

* 이러한 특징은 자원 낭비로 이어진다.  이를 방지하기 위해 JPA 는 `@QueryHint` 를 제공한다.

  ```java
  @QueryHints(value = @QueryHint( name = "org.hibernate.readOnly", value = "true"))
  Member findReadOnlyByUsername(String username);
  ```

* 위와 같이 `org.hibernate.readonly` 옵션을 주게되면, 스냅샷을 만들지 않아 자원 낭비를 방지할수 있다.

* **대신 변경감지를 지원하지 않는다. 이점이 크지도 않다...**





## JPA Lock

> [락의 개념 링크](https://sabarada.tistory.com/121)

* JPA 에서 제공하는 Lock 은 아래와 같다.

  ```java
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  List<Member> findLockByUsername(String username);
  ```

  

