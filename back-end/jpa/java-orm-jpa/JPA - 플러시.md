# JPA - 플러시 

* 영속성 컨텍스트의 변경 내용을 데이터베이스에 반영



## 플러시 발생시

* 변경 감지 발생
* 수정된 엔티티 쓰기 지연 SQL 저장소에 등록
* 쓰기 지연 SQL 저장소의 쿼리를 DB 에 전송



## 플러시 발생시기

* em.flush() - 직접 호출

  ```java
  ...
      EntityManager em = emf.createEntityManager();
  
  	try{
          tx.begin;
          Member member = new member();
          member.setName("name");
  
          em.persist(member);
  
          em.flush();
  
          tx.commit;
      }Catch(Exception e){
          tx.rollback();
      }finally{
          em.close;
      }
  ...
  ```

  

* 트랜잭션 커밋 
* JPQL 쿼리 실행시
  * JPQL 쿼리 실행시 DB에 직접 접근하기 때문에, 1차캐시에 저장된 항목들은 조회, 수정 등이 불가능 하기때문에 플러시를 자동 실행해 준뒤 JPQL 을 실행해 준다.
  * em.setFlushMode(FlushModeType.COMMIT) 으로 실행시 flush를 안하도록 막을수도 있다.
    * FluishModeType.AUTO : 커밋이나 쿼리 실행시 플러시 (default)
    * FluishModeType.COMMIT : 커밋할 때만 플러시



## 플러시는

* 영속성 컨텍스트를 비우지는 않는다.
* 영속성 컨텍스트의 변경내용을 DB에 동기화 한다.
* 트랜잭션이라는 작업 단위가 중요하다.

