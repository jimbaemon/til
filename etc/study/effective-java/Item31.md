# 아이템31 한정적 와일드카드를 사용해 API 유연성을 높이라
앞장에서 배웠듯이 매개변수화 타입은 불공변이다. 즉 `List<Object>`와 `List<String>`는 상위타입 관계도 하위타입 관계도 아니다.

하지만 논리적으로 상위 타입과 하위타입이 지원가능해야 할 것 같은 경우도 있다.

```java
public void pushAll(Iterable<E> src) {
    for (E e : src)
        push(e);
}
```

```java
Stack<Number> numberStack = new Stack<>();
Iterable<Integer> integers = ...;
numberStack.pushAll(integers);
```
위와 같은경우는 논리적으로 잘 동작해야 할것 같지만 매개변수화 타입이 불공변이기 떄문에 에러가 발생한다.

---
위의 경우를 대비해 자바에서는 한정적 와일드 카드라는 특별한 매개변수화 타입을 지원한다. `Iterable<? extends E>` 해당 타입의 의미는 E의 Iterable 이 아니라 E의 하위 타입의 Iterable
이어야 한다는 의미라고 한다. (테스트 해보니 E를 사용해도 된다...)

위의 설명과 맞게 코드를 수정하면 아래와 같다.
```java
public void pushAll(Iterable<? extends E> src) {
    for (E e : src) {
        push(e);
    }
}
```

위와 같이 수정된 코드는 클라이언트에도 아무런 영향없이 하위타입을 지원하게 해준다.

---
