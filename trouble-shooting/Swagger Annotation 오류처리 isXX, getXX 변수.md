# Swagger Annotation 오류처리 isXX, getXX 변수

## getter 특징

* is 나 get 으로 시작하는 getter 메서드를 자동 생성시 앞에 동사가 사라진다.

```java
1. private boolean isTest; // isTest()

2. private boolean test; // isTest()

3. private Boolean isTest; // getIsTest()
 
```



## 문제점

* Swagger Annotation 나 Validator 등 getter 메소드를 이용하는 라이브러리에서 위의 변수는 정상적으로 작동하지 않는 문제가 있다.



## 해결방안

* isXX 나 getXX 로 시작하는 변수명 사용 자제.
* primitive 변수 -> Wrapper Class 로 변경하면 정상 작동
  * Null에 대한 처리는 따로 진행해야 한다.