# JPA 1:N 관계에서 단방향 매핑을 지양해야 하는 이유.

## 1:N

주문과 주문된 상품들을 저장하는 테이블 있다고 하자.
객체로 풀자면 아래와 같을 것이다.

**OrderItem**

```java
...
@Entity
public class OrderItem{
    @Id
    private UUID id;
    private String name;
    private int amount;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
    ...
}
...
```

**Order**

```java
...
@Entity
public class Order{
    @Id
    private UUID id;
    ...
    @OneToMany
    @JoinColumn
    private List<OrderItems> orderItems = new ArrayList<>();
    ...
}
```

주문에서 주문된 아이템을 참조하는 경우는 많겠지만, 주문된 아이템이 어느 주문에 포함되는지 검색하는일은 거의 발생하지 않을것이고  위와 같이 Order 에서만 참조하는 다대일 `단방향` 관계를 맺으면 좋을것 같아 보인다.



하지만 실제로 사용해보면 insert 마다 update 가 발생함을 알수 있다.

```
이미지 캡처
```



이 문제는 데이터 베이스는 다 쪽에서 `키`를 가질수 밖에 없기 때문에 OrderItems 에 있는 `FK` 를 참조 해야 하기 때문이다.



결론은 `1:N` 단방향은 실무에서는 사용하지 말아야 하고, 양방향 관계를 맺어주는게 좋다.



