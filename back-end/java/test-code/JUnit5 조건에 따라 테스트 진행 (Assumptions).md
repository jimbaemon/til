# JUnit5: 조건에 따라 테스트 진행

## Assumptions

### assumeTrue(boolean assumption)

* 특정조건이 참일때만 테스트 실행

```java
@Test
void create1(){
    String test_env = System.getenv("TEST_ENV");
    System.out.println(test_env);
    assumeTrue("LOCAL".equalsIgnoreCase(test_env));

    System.out.println("create1");
}
```

> TEST_ENV 환경변수가 LOCAL 일떄만 해당 테스트 실행



### assumingThat(BooleanSupplier assumptionSupplier)

* 특정 조건이 참일때 Supplier 실행

```java
	@Test
	void create1(){
		assumingThat("LOCAL".equalsIgnoreCase(test_env), () -> {
			System.out.println("create1");
		});

		assumingThat("TEST".equalsIgnoreCase(test_env), () -> {
			System.out.println("create2");
		});
	}
```

> TEST_ENV 환경변수가 LOCAL 일때 create1 출력 TEST 일때 create2 출력



## Annotation 방식

### @EnabledOnOs

* 특정 OS 에서만 실행

```java
	@Test
	@EnabledOnOs(OS.WINDOWS)
	void create1(){
		...
	}

	@Test
	@EnabledOnOs({OS.MAC, OS.LINUX})
	void create2(){
		...
    }
```

> create1 함수는 윈도우에서 create2 함수는 mac, linux 에서 실행



### @EnabledOnJre

* 특정 java version 에서 실행

```java
	@Test
	@EnabledOnJre({JRE.JAVA_8, JRE.JAVA_9})
	void create1(){
		...
	}
```



### @EnabledIfEnvironmentVariable(name = "환경변수명", matches = "regex")

* 조건식에 만족하면 실행

	@Test
	@EnabledIfEnvironmentVariable(name = "TEST_ENV", matches = "local")
	void create1(){
		...
	}