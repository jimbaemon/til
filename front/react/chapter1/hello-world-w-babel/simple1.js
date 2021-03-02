function LikeButton(){
    const [liked, setLiked] = React.useState(false); //useState : 컴포넌트에 상태값을 추가할때 사용하는 함수
    const text = liked ? '좋아요 취소' : '좋아요';
    //리액트에서 가장 작은 요소는 리액트 요소... 뭔개소리지..
    return React.createElement(
        'button', //문자열로 입력하면 html 에 해당하는 태그가 생성된다
        {onClick: () => setLiked(!liked)},
        text,
    );

}
const domContainer = document.getElementById('root');
ReactDOM.render(
    React.createElement(
        'div', 
        null,
        React.createElement(LikeButton), 
        React.createElement(LikeButton), 
        React.createElement(LikeButton), 
    ),
    domContainer,
);
    