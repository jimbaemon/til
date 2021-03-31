# Gradle build 시 jdk 버전 설정 방법



## gradle.properties 를 이용한 방법

```properties
org.gradle.java.home=[JAVA_HOME경로]
```



## buid.gradle 을 이용한 방법

```properties
compileJava.options.fork = true
compileJava.options.forkOptions.executable = [JAVA_HOME경로]
```



## CLI 를 이용한 방법

```bash
$gradlew build -Dorg.gradle.java.home=[JAVA_HOME경로]
```

