# Message Queue

## 필요 이유

* https://youtu.be/BnS6343GTkY?t=1145 참조

  

## 개념

* 메시지 지향 미들웨어를 구현한 시스템 
* 프로세스, 프로그램 인스턴스가 메시지 교환시 큐를 사용함
* Advances Message Queing Protocol 을 이용하여 통신.



## 메시지 큐의 장점

* 비동기(Asynchronous) : Queue 에 넣기 때문에 나중에 처리 가능
* 비동조(Decoupling) : 애플리케이션과 분리할 수 있음.
* 탄력석(Resilience) : 일부가 실패 시 전체에 영향을 받지 않음.
* 과잉(redundancy) : 실패할 경우 재실행 가능
* 보증(Guarantees) : 작업이 처리된걸 확인할 수 있음
* 확장성(Scalable) : 다수의 프로세스들이 큐에 메시지를 보낼수 있음



## RebbitMQ

* AMQT 프로토콜을 구현해둔 프로그램
* 오픈소스로 상업용도로 사용가능



### SpringBoot RebbitMQ 구현 예제

#### Configuration

**application.yml 설정**

```yml
spring:
  rabbitmq:
    host: 접속할 서버 IP 주소
    port: 접속할 포트 (default: 5672)
    username: RabbitMQ 유저 아이디
    password: RabbitMQ 유저 비밀번호
    virtual-host: virtual host를 사용하는 경우 virtual host 이름
```



**build.gradle dependency 추가**

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-amqp'
    implementation 'com.fasterxml.jackson.core:jackson-databind'
}
```



**RabbitConfiguration.class**

```java
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfiguration {

    private static final String queueName = "spring-boot";

    private static final String topicExchangeName = "spring-boot-exchange";

    @Bean
    Queue queue() {
        return new Queue(queueName, false);
    }

    @Bean
    TopicExchange exchange() {
        return new TopicExchange(topicExchangeName);
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("foo.bar.#");
    }

    @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                  MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }

    @Bean
    MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}
```

- **Queue**

지정된 이름으로 Queue를 등록합니다. 서로 다른 이름으로 여러개의 Queue를 등록할 수도 있습니다.

- **Exchange**

Exchange를 설정합니다. 위 코드에서는 `TopicExchange`를 사용해 주어진 패턴과 일치하는 Queue에 메시지를 전달합니다. 설정할 수 있는 Exchange에는 `Direct`, `Fanout`, `Topic`, `Headers`가 있습니다.

- **Binding**

Exchange가 Queue에게 메시지를 전달하기 위한 룰입니다. 빈으로 등록한 Queue와 Exchange를 바인딩하면서 Exchange에서 사용될 패턴을 설정해 주었습니다.

- **RabbitTemplate**

RabbitTemplate는 Spring boot에서 자동으로 빈 등록을 해주지만 받은 메시지 처리를 위한  messageConverter를 설정하기 위해 오버라이딩합니다. (빈 등록에도 오버라이딩이라는 용어가 맞는지는 잘 모르겠네요.)



### Message Listener

```java
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class CustomMessageListener {

    @RabbitListener(queues = "spring-boot")
    public void receiveMessage(final Message message) {
        System.out.println(message);
    }

}
```

* `spring-boot` Queue 의 메시지 처리 