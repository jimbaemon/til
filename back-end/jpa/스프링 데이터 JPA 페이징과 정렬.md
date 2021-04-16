# 스프링 데이터 JPA 페이징과 정렬

## Page

* 스프링은 `org.springframework.data.domain.Page`를 이용하여 RDBMS 든 NoSQL 이든 동일하게 페이징을 사용할수 있게 인터페이스가 존재한다.

* 사용법

  * 인터페이스 생성

  ```java
  public interface MemberRepository extends JpaRepository<Member, Long> {	
  	Page<Member> findByAge(int age, Pageable pageable);
  }
  ```

  * 사용시

  ```java
  PageRequest pageRequest = PageRequest.of(0, 3, Sort.by(Sort.Direction.DESC, "username")); //page, size, sort 순
  
  Page<Member> page = memberRepository.findByAge(age, pageRequest);
  ```

* Left outer join 의 경우 totalCount 를 가져오는데 join 을 추가해줄 필요가 없다. 하지만 JPA 는 자동으로 left outer join  을 처리하기 때문에 `conutQuery`를  t사용하여 분리해주는 방법이 있다.

  ```java
  @Query(value = "select m from Member m left join m.team t", countQuery = "select count(m.username) from Member m")
  Page<Member> page = memberRepository.findByAge(age, pageRequest);
  ```

* Page 를 이용하여 엔티티 에서 Dto 객체로 바로 전환하는법

  ```java
  Page<MemberDTO> toMap = page.map(m -> new MemberDTO(m.getId(), m.getUsername(), null));
  ```

  