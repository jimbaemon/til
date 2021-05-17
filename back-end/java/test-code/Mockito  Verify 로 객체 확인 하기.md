# Mockito : Verify 로 객체 확인 하기

## 함수가 호출 되었는지 확인

- [Verifying exact number of invocations](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html#exact_verification)

* Mockito Verify 를 이용하면 객체내의 함수가 몇번 실행되는지 확인이 가능하다.

```java
public class MemberService{
    public void createMember(Long id){
        notify(id);
    }
    
    public void notify(Long id){
        ...
    }

    public void test(Long id){
        ...
    }
}
```

> 위 서비스의 notify 함수가 몇번 실행됬는지 확인하는 Verify 추가

```java
@ExtendWith(MockitoExtension.class)
class MemberServiceTest{
    @Test
    void callNotifyMethodTest(@Mock MemberService memberService){
        ...
        Mockito.when(memberService.createmember(1L));
        
        Mockito.verify(memberService, Mockito.times(1)).notify(any());
        
        Mockito.verify(memberService, Mockito.never()).test(any());
    }
}
```

* memberService.createmember 를 실행하면서 notify 함수가 1회 동작했고, test 함수는 동작 안했으므로 둘다 true 이다.



## 특정 동작 이후로 추가 동작이 발생하면 안되도록 verify

[Finding redundant invocations](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html#finding_redundant_invocations)

```java
public class MemberService{
    public void createMember(Long id){
        notify(id);
        test(id)
    }
    
    public void notify(Long id){
        ...
    }

    public void test(Long id){
        ...
    }
}
```

> 위 서비스에서 notify 이후로 추가 동작이 발생하는지 verify

```java
@ExtendWith(MockitoExtension.class)
class MemberServiceTest{
    @Test
    void noMoreInteraction(@Mock MemberService memberService){
        ...
        Mockito.when(memberService.createmember(1L));
        
        Mockito.verify(memberService, Mockito.times(1)).notify(any());
        Mockito.verifyNoMoreInteractions(memberSerivce);
    }
}
```

* MemberService 에서 notify 호출 이후에도 test 가 발생하므로 `verifyNoMoreInteractions` 테스트는 실패한다.
* 성공을 원할시 test 메소드 호출하는 구간으로 `createMember` 메소드에서 제거하면 된다.

