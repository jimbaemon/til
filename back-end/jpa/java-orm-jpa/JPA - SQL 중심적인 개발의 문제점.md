# JPA 소개

## SQL 중심적인 개발의 문제점

* 지금 시대는 **객체**를 **RDB**에 관리 한다. 
* 객체의 데이터를 저장하는 다양한 방법이 있지만, 현실적인 대안은 RDB이다.

* 애플리케이션은 객체지향을 추구하지만 정작 개발은 모두 SQL을 통해 이루어 지는 **SQL 중심적인 개발**이 진행되는 경우가 많다.

### 지루한 반복 작업의 연속

* 객체와 RDB의 차이점 때문에 개발자는 객체를 RDB에 맞춰서 SQL 을 작성해 주어야 하고 또 RDB 에서 객체로 데이터 전환을 위해, Mapper 를 작성해 주어야 한다. 

### 패러다임의 불일치

* 객체와 관계형 데이터베이스는 많은 차이가 있다.
  * RDB는 데이터를 잘 정규화 해서 보관을 하는것이 목적
  * 객체지향 프로그래밍은 **추상화, 캡슐화, 정보은닉, 상속, 다형성** 등을 이용하여 개발을 진행하는것이 목적
  * 객체의 상속관계를 RDB로 표현하기 어렵다.
  * 객체는 다른 객체를 참조 하지만, RDB는 Key 를 통해 다른 테이블을 참조한다.
  * 데이터 타입과, 식별 방법이 다르다.

* 예시로 아래와 같은 상속 구조를 가진 객체를 데이터로 정규화된 DB에 저장하기 위해서는 
  * 객체를 테이블에 맞춰서 분해한후
  * Item 을 저장하는 쿼리로 저장하고
  * Album 테이블에 쿼리로 저장해야 하는 매우 복잡한 상황이 된다.

  ```java
  public class Item{
      private Long id;
      private String name;
      private String price;
  }
  
  public class Album extends Item{
  	private String artist;
  }

* 객체에서 컬렉션으로 저장할때는 아래와 같이 하면 된다.

  ```java
  list.add(album);
  ```

  * 조회도 아주 쉽다.

  ```java
  Album album = list.get(albumId);
  
  //다형성을 이용해 부모를 바로 꺼내올수도 있다.
  Item item = list.get(albumId);
  ```

* 결론적으로 **객체답게 모델링 할수록** 매핑 작업만 늘어나게 되고, 결국엔 SQL 에 맞춰서 설계 개발을 진행하게 된다.



## JPA 소개

* Java Persistence API
* 자바 진영의 **ORM** 기술 표준

**ORM 이란**

* Open Relational mapping (객체 관계 매핑)
* 객체는 객체대로 설계, RDB 는 RDB 대로 설계



* JPA 는 Java 와 DB 사이에서 SQL 을 생성해 주는 역활.
* Jpa 는 Entity를 분석하여 JDBC API 를 사용하여 SQL 을 생성.

### JPA 를 사용해야 하는 이유?

#### 생산성

* 저장 : jpa.persist(member);
* 조회 : jpa.find(memberId);
* 수정 : member.setName("변경") -> 자동 수정
* 삭제 : jpa.remove(member);

#### 유지보수

* 기존 : 필드 추가시 모든 SQL 수정 필요
* JPA : 변수하나 추가하면 끝 

#### 패러다임 불일치 해결

* JPA와 상속

  * 하위테이블이 존재할시 기존 SQL 2개 생성을 해야 하는 상황을, JPA 는 알아서 SQL 을 생성해준다.

* JPA와 연관관계, 객체 그래프 탐색

  * 연관관계 저장시

    ```java
    member.setTeam(team);
    jpa.persist(member); //member 에 저장된 Team 도 같이 저장된다.
    ```

  * 객체 그래프 탐색시

    ```java
    jpa.find(Member.class, member);
    Team team = member.getTeam(); //member 조회시 team 도 같이 조회된다.
    ```

#### 성능향상

* 1차 캐시와 동일성 보장
  * 같은 트랜잭션 안에서는 같은 엔티티를 반환 - 추가 조회가 필요 없다.
* 트랜잭션을 이용한 쓰기 지연
  * 트랜잭션 단위로 모아서 insert, update 등을 한번에 벌크
* 지연로딩
  * 필요할 시점에 연관객체를 조회



