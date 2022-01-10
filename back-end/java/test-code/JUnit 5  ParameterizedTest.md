#  JUnit 5 : ParameterizedTest

다양한 변수를 사용해서 테스트를 할수 있는 `@ParameterizedTest`

## @ValueSource

`@ValueSource` 어노테이션을 이용하면 변수값들 하나하나에 대한 테스트가 가능하다.

```
@ParameterizedTest
@ValueSource(ints = { 1, 3, 10, 100 })
void sut_correctly_prints_correct_message_in_single_player_game(int answer) {
    var sut = new AppModel(new PositiveIntegerGeneratorStub(answer));
    sut.processInput("1");
    sut.flushOutput();
    int guess = answer;
    sut.processInput(Integer.toString(guess));

    String actual = sut.flushOutput();

    assertThat(actual).startsWith("Correct! ");
}
```



## @CsvSource

묶음 단위로 여러 변수를 동시에 사용 가능하다.

```
@ParameterizedTest
@CsvSource({ "50, 60", "80, 81" })
void sut_correctly_prints_too_high_message_in_single_player_game(int answer, int guess) {
    var sut = new AppModel(new PositiveIntegerGeneratorStub(answer));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput(Integer.toString(guess));

    String actual = sut.flushOutput();

    assertThat(actual).isEqualTo("Your guess is too high." + NEW_LINE + "Enter your guess: ");
}
```

단 사용하려면 `junit-jupiter-params` 라이브러리를 추가해 주어야 한다.

```
testImplementation 'org.junit.jupiter:junit-jupiter-params:5.6.0'
```