# 스프링 DATA JPA

## 초기설정

* SpringBoot 미사용시, 설정 파일에 `@EnableJpaRepositories` 를 추가해 주어야 한다.

  ```java
  @Configuration
  @EnableJpaRepositories(basePackage = "[베이스 패키지 경로]")
  public class Config{
    
  }
  ```

* SpringBoot 사용시 `@SpringBootApplication` 이 자동 인식 지원해줌

* 타 패키지 사용시, `@EnableJpaRepositories` 로 지정해 주어야 정상 작동



## Spring Data JPA 사용하기

* 기존에 사용하던 Repository 에 `JpaRepository` 인터페이스를 extend 해주면 된다.

  ```java
  public class TeamRepository extends JpaRepository<Team, Long>{
      ...
  }
  ```

  



## JpaRepository 살펴보기

