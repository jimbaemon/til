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



## CSS 선택자

#### 선택자 종류

```
//1. 태그 선택자 HTML 태그에 존재하는 선택자를 사용해야함
p {
	color : red;
}
//적용 예시
<p> </p>

//2. 클래스 선택자 class 에 포함된 선택자
.center{
	color : blue;
}
//적용 예시
<p class="center"> </p>
<div class="center"> </div>

//3. 아이디 선택자
#center{
	color : green;
}
//적용 예시

//4. 태그와 함께 쓰는 선택자
p.center{
	color : yellow;
}
//적용 예시
<p class="center"> </p>
```

