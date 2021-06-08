# JUnit 5 Mockito ArgumentCaptor 인자 검사 도구 

> [참조 링크](https://www.baeldung.com/mockito-argumentcaptor)

`ArgumentCaptor` 은 메소드에서 사용되는 인자의 값을 가져올수 있는 도구이다. 외부에서 특정 메소드에 접근하기 힘들때 이용하기 좋다.



# 사용법

```java
public class EmailService {

    private DeliveryPlatform platform;

    public EmailService(DeliveryPlatform platform) {
        this.platform = platform;
    }

    public void send(String to, String subject, String body, boolean html) {
        Format format = Format.TEXT_ONLY;
        if (html) {
            format = Format.HTML;
        }
        Email email = new Email(to, subject, body);
        email.setFormat(format);
        platform.deliver(email);
    }

    ...
}
```

`EmailService` 에서 `send` 함수로 이메일을 보낼경우 ReturnValue 가 없기때문에 어떠한 형태로 `Email` 클래스가 생성되었는지 확인하기 힘들다. `ArgumentCaptor` 가 `email` 인자를 확인하기 쉽게 만들어 준다.



## 테스트 환경 만들기

### 1. 테스트 클래스 생성

```java
@RunWith(MockitoJUnitRunner.class)
public class EmailServiceUnitTest {

    @Mock
    DeliveryPlatform platform;

    @InjectMocks
    EmailService emailService;
  
    ...
}
```

`@Mock` 을 이용해서 구지 구현해줄 필요 없는 `DeliveryPlatform` 을 Mocking 해준다.



### 2. @Captor 을 이용해서 인자 `ArgumentCature` 생성

```java
@Captor
ArgumentCaptor<Email> emailCaptor;
```



### 3. 인자값 가져오기

`Mockito.verify` 를 이용해서 사용되는 인자값 `Email` 클래스를 저장한다.

```java
Mockito.verify(platform).deliver(emailCaptor.cature);
```

저장된 인자값을 불러온다.

```java
Email emailCaptorValue = emailCaptor.getValue();
```



### 4. 가져온 인자값 검증하기

```java
@Test
public void whenDoesSupportHtml_expectHTMLEmailFormat() {
    String to = "info@baeldung.com";
    String subject = "Using ArgumentCaptor";
    String body = "Hey, let'use ArgumentCaptor";

    emailService.send(to, subject, body, true);

    Mockito.verify(platform).deliver(emailCaptor.capture());
    Email value = emailCaptor.getValue();
    assertEquals(Format.HTML, value.getFormat());
}
```

