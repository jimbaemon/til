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



## 쿼리 메소드 기능

* Spring Data JPA 는 interface 기반이라, JPARepository 를 통해 새로운 메소드를 생성하려면 모든 메소드를 구현해 주어야 한다.

  ![image-20210411211121201](http://www.jimbae.com:59005/image/270)

* 스프링 데이터 JPA 는 이러한 문제를 해결하기 위해 아래와 같은 방법을 제공한다.



### 메소드 이름으로 쿼리 생성

* 이름과 나이로 특정 멤버를 찾는 쿼리를 생성해 보자

  * 전통방식

    ```java
    public List<Member> findByUsernameAndAgeGreaterThen(String username, int age){
        return em.createQuery("select m from Member m where m.username = :username and m.age > :age")
            .setParameter("username", username)
            .setParameter("age", age)
            .getResultList();
    }
    ```

  * Spring DATA JPA 방식

    ```java
    public interface MemberRepository extends JpaRepository<Member, Long> {
    
    	List<Member> findByUsernameAndAgeGreaterThan(String username, int age); //갸꿀
    
    }
    ```

    > https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation 참조
    >
    > 두개 넘어가면 너무 귀찮아진다......................

