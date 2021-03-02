# SPA 와 베스트 셀링..

## 베스트셀링에서 발생한 문제점

* ~~사실 이사이트 자체가 문제다...~~

* **뒤로가기**

  * 상세보기후 뒤로가기시 기존에 보던 내용이 아닌 초기 목록부터 다시 보여짐.

    ![화면전환후 뒤로가기시 목록이 유지 안됨](http://www.jimbae.com:59005/image/60)

  

  * 정렬방법 변경후 뒤로가기시 기존 정렬 방법이 아닌 페이지 자체가 이동 된다.

    ![정렬방법 변경시](http://www.jimbae.com:59005/image/61)



### 발생 차이점

* 1번의  경우 페이지가 실제로 이동된다 ! 페이지는 원래대로 돌아오되, 기존의 리스트를 출력해 주어야 한다!
* 2번의 경우 페이지가 이동되지 않는다. 페이지는 그대로 있되, 선택했던 항목으로 돌아와야 한다.



## 관련 지식 조사 시작

## SPA (Si<sup>~~bal~~</sup>ngle Page Application)

> 단일 페이지 어플리케이션, 페이지를 이동하지 않고 Ajax 를 이용해 페이지 내의 특정 부분만 변경하는 방법

![2018-08-01-SPA-step1](http://www.jimbae.com:59005/image/59)

* 장점
  * 페이지 리로드가 필요하지 않으므로, 화면 전환이 빠르다.
  * 화면의 필요한 부분만 받아서 렌더링 하므로 효율성 증대
* 단점
  * **구현이 복잡하다.**
  * 검색엔진 색인이 안된다.



참조)

* https://www.cjlogistics.com/ko/tool/parcel/tracking  / 381638460342
* https://www.pinterest.co.kr/



## SPA 방식에서 뒤로가기의 도움을 주는 state

* SPA 방식에서는 AJAX 를 통해 페이지를 로드 하기 때문에 URL 이 변경되지 않고, URL 이 변경되지 않았기 때문에 다른페이지 이동후 뒤로가기시 원 상태를 확인하는 것이 불가능 하다.
* 이러한 방식을 해결하기 위해 링크 방식, 태그 방식등이 존재한다. [https://blog.outsider.ne.kr/1276 참조]
* 이러한 문제를 해결하기 위해 history.pushState()와 history.replaceState()가 나왔다! 



### history.pushState(); history.replaceState();

> [https://developer.mozilla.org/ko/docs/Web/API/History/pushState]
> [https://developer.mozilla.org/ko/docs/Web/API/History/replaceState]

* 모질라 사이트를 보면 설명은 아래와 같다.



* **pushState**

![image-20210122175404131](http://www.jimbae.com:59005/image/70)



* **replaceState**

![image-20210122154747929](http://www.jimbae.com:59005/image/63)



![EfQ_Yv4VoAA5FgX](http://www.jimbae.com:59005/image/65)



* 쉽게 말해서 `pushState` 는 뒤로가기를 하나 "추가"해 주는 것이고,
* `replaceState` 는 현재의 뒤로가기 정보를 변경해 준다는 것이다..



## pushState() 의 보조 도구 popState

> [https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event]

![image-20210122155923026](http://www.jimbae.com:59005/image/69)



### 1차 로직 정리

* **Main**
  * [진입] 
    * history.stat = nulll;
    * state X
    * popState X
  * [View 클릭시]
    * history.stat = {"schStr",page","list",siteCode","ordBy","scrollHeight"}
    * replaceState
    * popState X
  * [정렬 변경]
    * history.stat = {"schStr", "ordBy", "siteCode"}
    * pushState
    * popState O
* **View** **[OrdBy, Id]**
  * [신규 진입]
    * history.stat = null;
    * stat X
    * popState X
  * [View 클릭시]
    * history.stat = {"page","list",siteCode","ordBy","scrollHeight","id"}
    * replaceState
    * popState X



## 백단 정리

> 시작전 서버에서 요청하는 방식대로 값이 오도록 수정 및 테스트를 진행한다.

* 요청 조건값
  * page: 요청 페이지 [def:0]
  * ordBy: 정렬 조건 [readnum, recommend, comment] [def:regdt]
  * id: 조회중인 게시글 (해당 게시글 이후 리스트 목록부터 조회)
  * *siteCode: 조회할 사이트 코드
  * schStr: 검색어
* 해당 변수에 대한 데이터가 정상적으로 나오는지 postman 을 통해 확인

![image-20210121144751418](http://www.jimbae.com:59005/image/62)





## 앞단 시작

boardJSON 이라는 데이터 전달 객체 생성

```
var boardJSON = new Object;
boardJSON.list = "";
boardJSON.schStr = "${boardSearchVO.schStr}";
boardJSON.page = 1;
boardJSON.siteCode = "${siteCode}";
boardJSON.ordBy = "${ufn:isNull(boardSearchVO.ordBy, 'regdt')}";
boardJSON.schType = "${empty boardSearchVO.schType?'post':boardSearchVO.schType}";
boardJSON.scrollHeight = 0; 
```

* list : 뒤로가기시 보여줄 list 를 지속적으로 저장할 변수
* schStr : 검색어
* page : 페이지
* siteCode : 사이트코드
* ordBy : 정렬 기준
* shcType : Mypage 에서 보여줄 타입
* scrollHeight : 기존에 보던 페이지의 높이 값