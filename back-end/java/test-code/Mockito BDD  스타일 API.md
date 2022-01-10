# Mockito BDD  스타일 API

> [BDDMockito Doc](https://javadoc.io/static/org.mockito/mockito-core/3.2.0/org/mockito/BDDMockito.html)

* `BDD` 란 어플리케이션이 어떻게 "행동" 해야 하는지에 대한 공통된 이해를 구성하는 방법으로써, TDD 에서 창안했다.



## 행동에 대한 스펙

* TITLE : 행동의 이름
* Narrative : 행동에 대한 설명
  * As a : 역활 
  * I want : 원하는 점
  * So that : 원하는 것을 취하는 방법
* Acceptance criteria : 인수 테스트
  * Given : 어떤 상황이 주어 졌을때
  * When : 무엇인가를 하면
  * Then : 이러할 것이다



## BDDMockito

### GIVEN

* Mockito 의 `when() ` 함수는  `Acceptance Criteria`	와 오해의 소지가 있으므로 `BDDMockito.given()` 으로 전환이 가능하다.

```java
BDDMockito.give(memberService.findById(1L)).willReturn(Optional.of(member));
```

> memberService.findById 를 1L 매개변수로 호출시, Optional.of(member) 를 반환



### THEN

* 마찬가지로 Mockito 의 `Verify()` 함수는 `BDDMockito.then` 으로 전환이 가능하다.

```java
BDDMockito.then(memberService).should(Mockito.times(1)).test(study);
```

> memberService 의 test 함수는 study 매개변수를 가진채로 1회 실행될 것이다.