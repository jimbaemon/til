# JUnit 5 테스트 인스턴스

* JUnit 5 테스트는 테스트별로 인스턴스가 다르다. 가벼운 실험을 통해 알아보자.



```java
public class TestInstanceTest {

	int value = 1;
	@Test
	void valueTest1(){
		System.out.println("value1 = " + value++);
	}

	@Test
	void valueTest2(){
		System.out.println("value2 = " + value++);
	}

	@Test
	void valueTest3(){
		System.out.println("value3 = " + value++);
	}
}
```



같은 변수 `value` 를 공유하는 3가지 테스트 케이스가 있다. 각각 테스트가 끝날때마다 `value` 변수를 1씩 증가시켜 준다.

결과는 어떻게 나올까?



![image-20210509231649569](C:\Users\jimfo\AppData\Roaming\Typora\typora-user-images\image-20210509231649569.png)



예상과 달리 모두 1로 동일하게 나온다. 그 이유는 각 테스트별로 다른 인스턴스를 사용하기 때문이다.



```java
public class TestInstanceTest {

	int value = 1;

	@Test
	void valueTest1(){
		System.out.println("value1 = " + value++);
		System.out.println(this);
	}

	@Test
	void valueTest2(){
		System.out.println("value2 = " + value++);
		System.out.println(this);
	}

	@Test
	void valueTest3(){
		System.out.println("value3 = " + value++);
		System.out.println(this);
	}
}
```

위와 같이 각각의 테스트의 인스턴스를 출력해 보겠다.



![image-20210509231618480](C:\Users\jimfo\AppData\Roaming\Typora\typora-user-images\image-20210509231618480.png)



결과를 보면 알수 있듯이 각각 테스트 별로 인스턴스가 다르다.

그 이유는 테스트 간의 의존성을 없애기 위해서 이다. 



테스트 단위별 인스턴스 생성이 아닌 클래스 단위 인스턴스를 생성하는것도 가능하다.

```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TestInstanceTest {
    ...
}
```

위와 같이 `class` 위에 `@TestInstance(TestInstance.Lifecycle.PER_CLASS)` 어노테이션을 추가해주면 클래스 단위로 인스턴스를 생성해주고,

변수 또한 공유되는것을 볼수 있다.



![image-20210509231558656](C:\Users\jimfo\AppData\Roaming\Typora\typora-user-images\image-20210509231558656.png)



인스턴스를 `@TestInstance(TestInstance.Lifecycle.PER_CLASS)` 로 설정해 주었다면 `@BeforeAll` 이나 `@AfterAll` 어노테이션을 static 으로 사용하지 않아도 된다.

