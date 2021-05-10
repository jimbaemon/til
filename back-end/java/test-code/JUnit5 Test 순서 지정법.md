# JUnit5 Test 순서 지정법

`@TestMethodOrder(MethodOrderer.OrderAnnotaiton.class)` 지정후 `@Order` 어노테이션으로 순번을 지정해주면 테스트가 순서대로 진행된다.

하지만 기본적으로 테스트 간의 의존성이 없도록 단위테스트를 작성하는것이 옳바르다



```java
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestInstanceTest {

	int value = 1;

	@Test
	@Order(1)
	void valueTest1(){
		System.out.println("value1 = " + value++);
	}

	@Test
	@Order(3)
	void valueTest2(){
		System.out.println("value2 = " + value++);
	}

	@Test
	@Order(2)
	void valueTest3(){
		System.out.println("value3 = " + value++);
	}
}
```

