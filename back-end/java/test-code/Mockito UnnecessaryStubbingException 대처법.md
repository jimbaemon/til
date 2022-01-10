# Mockito UnnecessaryStubbingException 대처법

* Mockito 에서는 불필요한 Stubbing의 경우 에러를 발생함, 아래와 같이 `@MockitoSettings(strictness = Strictness.LENIENT)` 어노테이션으로 해결 가능

  ```java
  @MockitoSettings(strictness = Strictness.LENIENT)
  class StudyServiceTest {
  	...
  }
  ```

