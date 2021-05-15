# Mock 객체 Stubbing

> Stubbing 이란 목객체의 행동을 조정하는것



## Mock 객체 반환 경우

* 일반적 객체의 경우 `Null` 을 반환한다. (`Optional` 을 `Optional`) 
* Primitive 타입은 기본 Primitive 반환한다. `int = 0`
* 콜렉션은 비어있는 콜렉션
* Void 메소드는 아무런 일도 발생하지 않는다.



## Stubbing 하는법

> 자세한 내용은 공식문서를 참조하자
> [Mockito Doc](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html#2)
> [Mathcer Doc](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html#3)
> [Void Throw](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html#5)
> [Stubbing Consecutive Call](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html#10)



## when

* 특정 함수 실행시 Mock Stubbing

```java
Mockito.when(memberService.findById(any()))
```

> memberService.findById(매개변수) 실행시 

### .thenReturn

* when 실행시 특정 값 반환

```java
Mockito.when(memberService.findById(any())).thenRetuen(반환값)
```

### .thenThrow

* Exception 반환

```java
Mockito.when(memberService.findById(any())).thenThrow(IllegalArgumentException.class)

### Consecutive Call

* 여러차례 호출의 경우 순서대로 결과가 나온다.

```java
Mockito.when(memberService.findById(any()))
    .thenReturn("1")
    .thenReturn("2")
    .thenReturn("3");

System.out.println(memberService.findById(1L)); //1
System.out.println(memberService.findById(1L)); //2
System.out.println(memberService.findById(1L)); //3
```





## doThrow

* 예외 반환

```java
Mockito.doThrow(IllegalArgumentException.class)
```

### .when

* 예외를 반환한 경우 입력 

```
 doThrow(new RuntimeException()).when(mockedList).clear();
```

