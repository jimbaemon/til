# JUnit5 기본 어노테이션 

## @Test

* JUnit 으로 테스트 하는 모든 함수 위에 @Test 어노테이션을 사용한다.
* 테스트에 이용되는 Method는 꼭 public 일 필요 없다.

```java
class StudyTest {
	@Test
	void create(){
		...
	}
}
```



## @BeforeAll, @AfterAll

* 모든 테스트들이 시작 전, 후 딱 한번만 실행되도록 함. 
* 반드시 static 을 사용해야 하고, private 으로 생성하면 안된다.
* return type 은 반드시 void 로 해야한다.

```java
...
	@BeforeAll
	static void beforeAll(){
		System.out.println("before all");
	}

	@AfterAll
	static void afterAll(){
		System.out.println("after all");
	}
...
```



## @BeforeEach, @AfterEach

* 각각 테스트가 실행되기 전, 후에 한번씩 실행되도록 함.

```java
...
	@BeforeEach
	void beforeEach(){
		System.out.println("before each");
	}

	@AfterEach
	void afterEach(){
		System.out.println("after each");
	}
...
```



## @Disabled

* 테스트를 잠시 비활성화 하는 기능을 함

```java
...
	@Test
	@Disabled
	void create1(){
		System.out.println("create1");
	}
...
```

