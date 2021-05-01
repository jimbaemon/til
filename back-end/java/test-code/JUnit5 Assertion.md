# JUnit5: Assertion

* 모든값 뒤에는 `String` 형태로 메시지를 추가할수 있다.

## assertEquals(expected, actual)

* 실제 값이 기대한 값과 같은지 확인



## assertNotNull(actual)

* 값이 null 이 아닌지 확인



## assertTrue(boolean)

* 다음 조건이 참(true)인지 확인



## assertAll(excutables)

* 모든 확인 구문 확인
* JUnit 특징상 한건이라도 실패시 테스트가 정지되는데 assertAll 로 묶어두고 실행하면 동시에 실패된 내역 확인이 가능하다.



## assertThrows(expectedType, excutable)

* 예외발생 확인



## assertTimeout(duration, excutable)

* 특정 시간 안에 실행이 완료되는지 확인



## assertTimeoutPreemptively(duration, excutable)

* 위와 같은데 지정한 시간이 넘어가면 바로 실패처리
* ThreadLocal 사용시 예상치 못한 오류 발생하므로 사용에 주의 필요