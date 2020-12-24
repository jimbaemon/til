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



#### 그룹 선택자

```
h1 {text-align:center; color:red;}
p {text-align:center; color:red;}
//위의 h1 과 p 는 css 내용이 똑같다 아래와 같이 그룹선택자(,)로 묶을수 있다
h1, p {
	text-align:center, color:red;
}
```



#### 하위 선택자

````
//p 태그 밑에 있는 span (`space` 로 구분) 
p span {
	text-align:center;
	color:red;
}
````



#### 전체 선택자

````
//말그대로 전체
* {
	font-size : 14px; 
	line-height : 24px;
}
````



#### 선택자 우선순위

1. !important Style

   ```
   p {
   	color : red !important;
   }
   ```

2. Inline Style

   ```
   <p style="color:gold;"
   ```

3. ID Selector Style

   ```
   #id {
   	color:blue;
   }
   ```

4. Class Selector Style

   ```
   .id {
   	color:yellow;
   }
   ```

5. Tag Selector Style 

   ```
   p {
   	color:green;
   }
   ```

   