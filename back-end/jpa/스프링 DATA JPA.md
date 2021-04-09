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

* JpaRepository  구조를 보면 아래와 같다.

  ![image-20210409230148397](http://www.jimbae.com:59005/image/269)

#### JpaRepository

* Spring Data JPA 에서 쓰이는 일부 메서드가 잇다.
* 주요메서드
  * getOne(ID) : 엔티티를 프록시로 조회한다.

#### PagingAndSortingRepository

* spring-data-commons 에 포함된다.
* 페이징 처리는 대부분 동일하기 때문에 공통[common] 에 포함된다. [전환이 쉽다]

#### CrudRepository

* 기본적인 CRUD 기능들이 들어있는 Interface
* 주요메서드
  * save(S) : 엔티티 저장 및 병합 기능
  * delete(T) : 엔티티 하나 삭제
  * findById(ID) : 엔티티 하나를 조회한다

#### Repository

* Marker interface 라고 한다.