# SPRING DATA JPA 페이징과 정렬

> Spring Data Jpa 에서는 페이징 처리를 위해 Pageable 클래스를 제공해 준다.
> 해당 클래스의 기능을 살펴보자



**예시)** 

```java
@GetMapping("/members")
public Page<Member> list(Pageable pageable){
   return memberRepository.findAll(pageable);
}
```



* `JpaRepository` 는 `PagingAndSortingRepository` 클래스를 상속받고 `PagingAndSortingRepository`  에서는 findAll 메소드에  Pageable 을 지원해주는것을 확인 가능하다. (목록을 찾을때 Paging 과 Sorting 을 제공해 준다는 의미이다.)

```java
@NoRepositoryBean
public interface JpaRepository<T, ID> extends PagingAndSortingRepository<T, ID>, QueryByExampleExecutor<T> {
 ...   
}

@NoRepositoryBean
public interface PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID> {

	Iterable<T> findAll(Sort sort);

	Page<T> findAll(Pageable pageable);
}

```



## Pageable 클래스가 제공해 주는 기능들

> 목록 조회시 사용 가능한 기능들 정리.

* page
  * 조회하고자 하는 page 숫자를 지정한다. index 는 0 부터 시작한다.
    * ex) page=0 : 1페이지 조회
* size
  * 조회하고자 하는 목록의 갯수를 지정한다. [기본 : 20]
    * ex) size=3 : 3개씩 조회
* sort 
  * 목록 정렬이 가능하다. 여러건도 줄수 있다.
    * ex) sort=id,desc : id 를 기준으로 역순으로 정렬
    * ex) sort=id,desc&username,asc : id 를 기준으로 역순으로 정렬 후 username 순서대로 정렬



## Pageable 기본값 변경법

> properties 혹은 yml

```yaml
data:
	web:
		pageable:
			default-page-size: 10 #기본 사이즈 변경
			max-page-size: 2000
```



## Annotation 을 이용하여 설정값 변경하기

> 아래와 같이 Pageble Parameter 앞에 @PageableDefault Annotation 을 활요해서 설정 해줄수도 있다.

```java
@GetMapping("/members")
public Page<Member> list(@PageableDefault(size=5, sort = "username") Pageable pageable){
    return memberRepository.findAll(pageable);
}
```



## PageAll 이 반환해주는 Page\<Entity> DTO 로 변경하기

* MemberDTO 에서 MemberEntity 를 받아서 초기화 해주는 생성자 추가

  ```java
  @Data
  public class MemberDTO {
  	...
  	public MemberDTO(Member member){
  		this.id = member.getId();
  		this.username = member.getUsername();
  	}
  }
  ```

* 생성자를 이용해서 returnType 을 DTO 로 변경

  ```java
  @GetMapping("/members")
  public Page<MemberDTO> list(@PageableDefault(size=5, sort = "username") Pageable pageable){
      return memberRepository.findAll(pageable).map(MemberDTO::new);
  }
  ```

  