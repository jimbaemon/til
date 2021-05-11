#  JUnit 5 : 확장 모델

JUnit 5의 확장 모델은 Extension 단 하나 이다.



## 확장팩(Extension) 등록 방법

* 선언적인 등록 `@ExtendWith`
* 아래와 같이 클래스 상단에 어노테이션을 사용하면 된다.

```java
@ExtendWith(FindGroup1TestExtension.class)
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class StudyTest {
    ...
}
```



* 프로그래밍 등록 `@RegisterExtension`
* `@RegisterExtension` 생성자로 직접 생성해서 사용 가능, 수정 가능

```java
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class StudyTest {

	@RegisterExtension
	static FindGroup1TestExtension findGroup1TestExtension = new FindGroup1TestExtension(1000L);
    ...
}
```



* ServiceLoader 를 사용 (거의 사용 안함)



## 확장팩(Extension) 사용처

* 테스트 실행 조건
* 테스트 인스턴스 팩토리
* 테스트 인스턴스 후-처리기
* 테스트 매개변수 리졸버
* 테스트 라이프사이클 콜백
* 예외처리