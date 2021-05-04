# JUnit5 태깅과 필터링

## Tag

* 특정 테스트를 태깅으로 그룹화 하여 해당 그룹만 테스트를 실행
* Run Properties 에서 Tag 를 지정해주면 해당 Tag 의 테스트만 실행된다.

```java
@Test
@DisplayName("태그 그룹1")
@Tag("group1")
void create_group1_1(){
    System.out.println("group1");
}

@Test
@DisplayName("태그 그룹2")
@Tag("group2")
void create_group2_1(){
    System.out.println("group2");
}
```

* 빌드시 테스트에서 특정 tag 만 실행하는법(Maven)
* profile 은 -p 옵션이후 값을 주면 된다.

```xml
<profiles>
    <profile>
        <id>default</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <build>
            <plugins>
                <plugin>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <groups>group1</groups> <!--태그명-->
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
    <profile>
        <id>ci</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <build>
            <plugins>
                <plugin>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <groups>grou1 | group2</groups> <!--태그명-->
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>    
</profiles>
```



## 커스텀 태그

* 태그를 직접 생성할수도 있다.

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Test
@Tag("group1")
public @interface Group1Test {
}
```

* 위와 같이 신규로 만든 태그를 사용하여 그룹화도 가능하다.

```java
@Test
@DisplayName("태그 그룹1")
@Group1Test
void create_group1_1(){
    System.out.println("group1");
}
```

