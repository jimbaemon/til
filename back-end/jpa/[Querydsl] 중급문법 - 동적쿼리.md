# [Querydsl] 중급문법 - 동적쿼리

---

# 동적쿼리란?

> 동적으로 쿼리문을 생성, 수정 변경 하는 것을 동적 쿼리라고 한다.

예시)

```
[Mybatis]
<if test='param = "test"'>
	param = #{param}
</if>
```

---



# Querydsl 에서 동적쿼리 사용법.

---

> Querydsl 에서 동적쿼리를 사용하는 방법은
>
> 1. booleanBuilder 를 이용하는방법
> 2. Where 다중 파라미터를 사용하는 방법이 있다.



## 1. BooleanBuilder

---

> BooleanBuilder 는 Querydsl 라이브러리에서 제공해주는 동적 쿼리 생성용 클래스이다. 사용방법은 다음과 같다.
>
> 1. BooleanBuilder 초기화
> 2. 조건절 생성
> 3. 조건에 맞다면 builder 에 조건 추가
> 4. queryFactory 를 통해 생성한 where 절에  builder 삽입

예시)

```
QMember qMember = QMember.member;
Integer paramAge = null;

//1. BooleanBuilder 초기화
BooleanBuilder builder = new BooleanBuilder();

//2. 조건절 생성
if(paramAge == null){
    //3. builder 에 조건절 추가
    builder.and(qMember.age.eq(10));
}

Member member = queryFactory
                    .selectFrom(qMember)
                    .where(builder) //4. queryFactory 조건절에 builder 추가
                    .fetchFirst();

System.out.println("member = " + member);
```



조건이 맞을때의 JPQL 쿼리문

```
select
        member1 
from
        Member member1 
where
        member1.age = ?1 
```



조건이 틀릴때의 JPQL 쿼리문

```
select
        member1 
from
        Member member1 
```



> BooleanBuilder 이용시 동적쿼리 사용에는 문제가 없으나 if ... 문을 이용하기 때문에 코드의 가독성 및 재사용이 힘들다.
> 이럴때는 두번쨰 방법인 Where 다중 파라미터를 사용해주면 좋다.



## 2. Where 다중 파라미터

---

> BooleanBuilder 와 같이 동적 쿼리를 생성할때 사용. 함수로 생성하기 때문에 코드가 깔끔해지고 재사용, 합성등 장점이 있다.
> 사용법은 다음과 같다.
>
> 1. 조건을 동적으로 확인할 BooleanExpression 반환 다중 파라미터 생성
> 2. 조건 절에서 다중 파라미터 호출

예시)

```
/**
* 이름이 null 이면 전체 검색 아니면 해당 이름 검색
**/
@Test
public void whereMultiParams(){
    String findName = "이름";

    List<Member> findMembers = queryFactory
            .selectFrom(member)
            .where(usernameEq(findName)) //2. 조건 절에서 다중 파라미터 호출
            .fetch();

    System.out.println("findMembers = " + findMembers);
}

//1. 조건을 동적으로 확인할 BooleanExpression 반환 다중 파라미터 생성.
private BooleanExpression usernameEq(String findName){
    return findName == null?null:member.username.eq(findName);
}
```

> 다중 파라미터 사용시 Null 이 반환되더라도, Querydsl 에서 조건절에 Null 이 들어가면 무시 되므로 문제는 없다. 

```
/**
* 결과가 Null 로 반환되면 querydsl 이 jpql 생성시 무시한다.
*/
...
String findName = null;
...
.where(usernameEq(findName)) //2. 조건 절에서 다중 파라미터 호출

//결과 쿼리
select 
	member1
from Member member1
```

> 다중 파라미터는 자바의 함수이므로 지속적으로 사용이 가능하다.



#### 다중 파라미터 합치기

> 다중 파라미터를 여러개 주려면 신규 함수를 추가한뒤 조건절에서 이어 붙이면 된다.

```
@Test
public void whereUsernameAndAge(){
    String findName = "이름";
    Integer findAge = 10;

    List<Member> findMembers = queryFactory
            .selectFrom(member)
            .where(usernameEq(findName), ageEq(findAge)) // 찾을 조건을 이어 붙이면 된다
            .fetch();

    System.out.println("findMembers = " + findMembers);
}

//기존 함수 재사용
private BooleanExpression usernameEq(String findName){
    return findName == null?null:member.username.eq(findName);
}

//나이를 찾는 함수 신규함수  추가
private BooleanExpression ageEq(Integer findAge){
    return findAge == null?member.age.eq(10):member.age.eq(findAge);
}
```



> 위에서 다중 파라미터는 자바의 함수이므로 재사용 가능하다고 했다. 그와 같이 다중 파라미터는 자바의 특징을 가지므로 아래와 같이 합치는것도 가능하다.

```
@Test
public void whereUsernameAndAge(){
...
    List<Member> findMembers = queryFactory
            .selectFrom(member)
            .where(allEq(findName, findAge)) // 두 다중 파라미터 합치기
            .fetch();
...
}

//기존 함수 재사용
private BooleanExpression usernameEq(String findName)
...

//나이를 찾는 함수 추가
private BooleanExpression ageEq(Integer findAge){
...

//위의 두 함수를 합치는 함수
private BooleanExpression allEq(String findName, Integer findAge){
    return usernameEq(findName).and(ageEq(findAge));
}
```

