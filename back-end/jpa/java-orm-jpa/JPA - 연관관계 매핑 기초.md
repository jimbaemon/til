# JPA - 연관관계 매핑 기초

## 연관관계가 필요한 이유

* 테이블은 외래 키로 조인을 사용해서 연관된 테이블을 찾는다.
* 객체는 참조를 사용해서 연관된 객체를 찾는다.
* 이러한 간격으로 테이블 기반에 데이터 중심으로 모델링시 객체지향적 설계가 어렵다.



## 단방향 연관관계

* 주인쪽에 @JoinColumn 을 이용해서 매핑시 연관관계로 매핑이 가능하다.

```java
@ManyToOne
@JoinColumn(name = "team_id")
private Team team
```



## 양방향 연관관계와 연관관계의 주인

* 양쪽에 상호 참조 가능한 관계를 양방향 연관관계라고 한다.

* 테이블에서는 한쪽에 FK 만 가지고 있어도 양쪽에 관계가 생성되지만, 객체에는 양쪽에 모두 객체를 참조해야 한다.

  ```java
  @Entity
  public class Team{
      @OneToMany(mappedBy = "team")
      private List<Member> members = new ArrayList<>();
  }
  
  @Entity
  public class Member{
      @ManyToOne
      @JoinColumn()
      private Team team;
  }
  ```

* 객체는 대체로 단방향이 좋다.

* mappedBy 

  * 객체와 테이블간의 차이 때문에 필요하다.
  * 객체의 연관관계(2가지)
    * 회원 > 팀 연관관계 1개 (단방향)
    * 팀 > 회원 연관관계 1개 (단방향)
  * 테이블 연관관계(1가지)
    * 회원 < > 팀 연관관계 1개 (양방향)
  * 객체의 양방향 관계는 사실상 **서로 다른 단방향 관계 2개다.**
  * 테이블은 **외래키 하나로** 두 테이블의 양관관계를 관리할수 있다.
  * JPA 에서는 양방향 관계일시 키를 관리할 **주인**을 정해주어야 한다.
  * 주인이 아닌쪽은 mappedBy 를 관계를 생성한다.
  * mappedBy 쪽은 **조회만 가능**하고 **주인쪽에서만 등록, 수정이 가능**하다
  
* 양방향 관계일시 양쪽에 모두 값을 세팅해 주어야 한다. (1차 캐시 문제)

  ```java
  @Entity
  public class Team{
      @OneToMany(mappedBy = "team")
      private List<Member> members = new ArrayList<>();
      
      public void addMember(Member member){
          member.setTeam(this);
          members.add(member);
      }
  }
  
  @Entity
  public class Member{
      @ManyToOne
      @JoinColumn()
      private Team team;
      
      public void changeTeam(Team team){
          team.getMembers().add(this);
          this.team = team;
      }
  }
  ```



## 양방향 매핑 정리

* **단방향 매핑만으로도 이미 연관관계 매핑은 완료**
* 양방향 매핑은 반대 방향으로 조회 기능이 추가된 것 뿐
* JPQL 에서 역방향으로 탐색할 일이 많음
* 단방향 매핑을 잘 하고 양방향은 필요할 때 추가해도 됨
* **연관관계의 주인은 외래 키의 위치를 기준으로 정해야함.**

