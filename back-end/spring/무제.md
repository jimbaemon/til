# @JsonUnwrapper 

![image-20220110133938718](https://img.jimbae.com/images/4fe007d1-cc0e-41d2-b44f-ea5daaa1e65b/image-20220110133938718.png)

```
@JsonUnwrapped
private GetExpectedPerformanceResponse expectedPerformance;

public static class GetExpectedPerformanceResponse {
  @Schema(description = "예상 PER")
  private float per;
  @Schema(description = "예상 연간 수익률")
  private float annualReturn;
  @Column(name = "예상 연간 조정 수익률")
  private float annualAdjustedReturn;
}
```

![image-20220110134245755](https://img.jimbae.com/images/84cdd26a-4f47-4372-9400-2f02246dd326/image-20220110134245755.png)