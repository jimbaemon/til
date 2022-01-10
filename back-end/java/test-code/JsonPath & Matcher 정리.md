# JsonPath & Matcher 정리

> 더 나은 테스트케이스 작성을 위하여 JsonPath 와 Matcher 사용법을 파악한 내용을 정리한다.



## JsonPath











## Matchers

### containsInRelativeOrder(E... items)

> Creates a matcher for Iterables that matches when a single pass over the examined Iterable yields a series of items, that contains items logically equal to the corresponding item in the specified items, in the same relative order For example:
> assertThat(Arrays.asList("a", "b", "c", "d", "e"), containsInRelativeOrder("b", "d"))

* 리스트안에 입력한 항목이 모두 존재하면 성공, 아니면 실패

  ```java
  assertThat(Arrays.asList("a", "b", "c", "d", "e"), containsInRelativeOrder("b", "d")) // SUCCESS
  assertThat(Arrays.asList("a", "b", "c", "d", "e"), containsInRelativeOrder("b", "d", "f")) //FAIL
  ```

  



### containsInAnyOrder

> Creates an order agnostic matcher for Iterables that matches when a single pass over the examined Iterable yields a series of items, each satisfying one matcher anywhere in the specified collection of matchers. For a positive match, the examined iterable must be of the same length as the specified collection of matchers.
> N.B. each matcher in the specified collection will only be used once during a given examination, so be careful when specifying matchers that may be satisfied by more than one entry in an examined iterable.

* 리스트안에 항목중 한개라도 입력한 항목에 포함시 성공

```java
assertThat(Arrays.asList("foo", "bar"), containsInAnyOrder(Arrays.asList(equalTo("bar"), equalTo("foo")))) // SUCCESS
assertThat(Arrays.asList("foo", "bar", "too"), containsInAnyOrder(Arrays.asList(equalTo("bar"), equalTo("foo")))) //FAIL
```



### hasSize(int size)

>Creates a matcher for java.util.Collections that matches when the size() method returns a value equal to the specified size. For example:
>assertThat(Arrays.asList("foo", "bar"), hasSize(2))

* Collection 객체의 사이즈와 동일할시 성공

```java
assertThat(Arrays.asList("foo", "bar"), hasSize(2)))) //성공 
```

