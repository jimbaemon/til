# Mockito : Mock 객체를 만드는 방법

## Mockito.mock() 메소드로 만드는 방법

```java
MemberService memberService = Mockito.mock(MemberService.class);
StudyRepository studyRepository = Mockito.mock(StudyRepository.class);
```



## @Mock 어노테이션으로 만드는 방법

> JUnit 5 extension 으로 MockitoExtension을 사용해야 한다.

### 필드

```java
@ExtendWith(MockitoExtension.class)
class StudyServiceTest {
 	@Mock
	MemberService memberService;
	@Mock
	StudyRepository studyRepository;
    ...
}
```

### 메소드 매개변수

```java
@ExtendWith(MockitoExtension.class)
class StudyServiceTest {
    
    @Test
    void createStudyService(@Mock MemberService memberService, @Mock StudyRepository studyRepository){
        ...
    }

}
```

