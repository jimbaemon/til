# SPRING DATA JPA Auditing

> Auditing 이란?
>
> * 데이터베이스 작업을 모니터링 하고, 기록을 수집 하는 기능.



## 적용방법

* 시작부에 `@EnableJpaAuditing` 추가

  ```java
  @EnableJpaAuditing
  @SpringBootApplication
  public class DatajpaApplication {
  	public static void main(String[] args) {SpringApplication.run(DatajpaApplication.class, args);}
  }
  ```

  

* Auditing을 위한 Entity 추가

### 등록일 수정일 추적

* 시작일용 변수 생성 및 `@CreatedDate` 어노테이션 추가

* 수정일용 변수 생성 및 `@LastModifiedDate` 어노테이션 추가

  ```java
  @EntityListeners(AuditingEntityListener.class)
  @MappedSuperclass
  @Getter
  public class BaseEntity {
  
  	@CreatedDate
  	@Column(updatable = false)
  	private LocalDateTime createdDate;
  
  	@LastModifiedDate
  	private LocalDateTime lastModifiedDate;
      
  }
  ```



### 등록자 수정자 추적

* 위에서 추가해준 BaseEntity 에 등록자 `@CreatedBy`, 수정자 `@LastModifiedBy` 변수 추가

  ```java
  public class BaseEntity {
  	...
  	@CreatedBy
  	@Column(updatable = false)
  	private String createdBy;
  
  	@LastModifiedBy
  	private String lastModifiedBy;
      
      ...
  }
  ```

* 시작부에 계정정보를 추적해 줄수 있는 Provider 추가

  ```java
  @EnableJpaAuditing
  @SpringBootApplication
  public class DatajpaApplication {
      ...
  	@Bean
  	public AuditorAware<String> auditorProvider(){
          //지금은 랜덤 UUID 이지만 실제로는 security 를 이용한 로그인 사용자 ID 를 넣어주면 된다.
  		return () -> Optional.of(UUID.randomUUID().toString());
  	}        
   	...       
  }
  ```

* BaseEntity 를 다른 엔티티에서 상속해주면 정상적으로 데이터 입력, 수정시 등록일, 수정일, 등록자, 수정자 가 갱신된다.