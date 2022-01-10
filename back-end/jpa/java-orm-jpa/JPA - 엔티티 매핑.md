# JPA - 엔티티 매핑

## 객체와 테이블 매핑

### @Entity

* @Entity가 붙은 클래스는 JPA가 관리, 엔티티라 한다.
* JPA를 사용해서 테이블과 매핑할 클래스는 **@Entity** 가 필수다
* **주의**
  * **기본 생성자 필수** (파라미터가 없는 public 또는 protected 생성자), 프록시 패턴을 사용할때 필요
  * final 클래스, enum, interface, inner 클래스 사용X
  * 저장할 필드에 final 사용 X



### @Table

* 매핑할 테이블 지정용 어노테이션

* 속성

  * name : 매핑할 테이블 이름
  * catalog :  데이터베이스 catalog 매핑r
  * schema : 데이터베이스 schema 매핑
  * uniqueConstraints : DDL 생성시 유니크 제약 조건 생성qq




## 필드와 컬럼 매핑

### @Column

* Column  에 해당하는 변수에 사용
  * name : 컬럼명이 변수명과 다를경우 사용
  * insertable : 등록 가능 여부 (default : true)
  * updatable : 변경 가능 여부 (default : true)
  * nullable : NotNull 제약조건 (default : true)
  * unique : Unique Key 제약조건 (이름이 이상하게 나와서 미사용. @Table 속성 사용 추천)
  * columnDefinition : 컬럼정보 직접 제공 [ex. varchar(100) default 'Empty']
  * length : 문자열 길이 제약
  * precision, scale : BigDecimal Type 에 사용

  

### @Enumerated

* Enum Type 의 변수에 사용
* ORDINAL Type 사용 금지 



### @Temporal(TemporalType)

* 날짜 타입 매핑
* TemporalType 종류
  * DATE
  * TIME
  * TIMESTAMP
* **JAVA8 LocalDateTime 이 사용되면서 더이상 필요 없다.**



### @Lob

* 큰 컨텐츠에 사용 [CLOB, BLOB]



### @Transient

* DB 와 상관없는 변수에 사용



## 기본 키 매핑

### @Id

* 기본키 매핑
* 직접 할당할때 사용



### @GeneratedValue(strategy = GenerationType.전략)

* 자동 생성

* DB 최적화된 전략을 사용하는것이 좋다

* PK 값이 DB에 Insert 되야 생성되기 때문에, 초기 create 후 추가 작업을 진행하기를 원하면,  em.persist() 로 id 를 발급받아서 진행해야 한다.

* 전략 : 

  * `IDENTITY` : 

    * 기본키 생성을 데이터베이스에 위임 (Mysql Auto Increment)

      ```java
      @Entity
      
      public class member{
          @Id
          @GeneratedValue(strategy = GenerationType.IDENTITY)
          private Long id;
      }
      ```

      

  * `SEQUENCE` :

    * sequence 미 지정시 sequence 자동 생성

    * `@SequenceGenerator()`  어노테이션을 사용한다.

      * allocationSize 는 sequence next call 을 자주 하지 않도록 미리 가져올 시퀀스 갯수를 설정하는것

      ```java
      @Entity
      @SequenceGenerator(
      	name = "MEMBER_SEQ_GENERATOR",
          sequenceName = "MEMBER_SEQ",
          initialValue = 1, allocationSize = 1
      )
      public class member{
          @Id
          @GeneratedValue(strategy = GenerationType.SEQUENCE)
          private Long id;
      }
      ```

  * `TABLE` :

    * 키 생성 전용 테이블 생성

    * 장점 : 모든 데이터베이스에 적용 가능

    * 단점 : 성능

    * `@TableGenerator` 어노트에션을 사용한다.

      ```java
      @Entity
      @TableGenerator(
      	name = "MEMBER_SEQ_GENERATOR",
          table = "MY_SEQUENCES",
          pkColumnValue = "Member_SEQ", allocationSize = 1
      )
      public class member{
          @Id
          @GeneratedValue(strategy = GenerationType.TABLE, 
                          generator = "MEMBER_SEQ_GENERATOR")
          private Long id;
      }
      ```

      

## 연관관계 매핑

