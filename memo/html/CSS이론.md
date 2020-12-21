# CSS 이론

> CSS (Cascading Style Sheets)
> HTML 문서 내에 HTML 태그를 선택해서 디자인하고 배치하는 역활

* 내부 CSS <head>...</head> 사이에서 '<style>...</style>' 로 페이지 내부에 구현
* 외부 CSS <head>...</head> 사이에서 <link> 태그로 가져오는 형태



## CSS 기본문법

```
body {
	color : navy;
}
h1 {
	color : red;
}
```



* `body` 는 `SELECTOR`

* `color` 는 `Property`
* `navy` 는 `VALUE`

* `;` 이후 새로운 `Property` 와 `VALUE` 가 나온다.
* 부모요소 `body` 를 `h1` 위쪽으로 넣어주는게 일반적이다. ( 상관은 없지만 직관성 문제 )

