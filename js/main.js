/* html은 위에서 아래로 로드되기 때문에, index.html <head> 태그 안에 
<script src=""></script>
넣으면, 클래스를 찾는데 오류가 생긴다.
이를 해결하기위해서는
첫번째 방법
window.addEventListener('DOMContentLoaded', function(){
 문서가 로드될 때 까지 기다리라는 명령어
})

두번째 방법
</body> 태그 바로 위에 선언한다
*/


//자식(.sprite_heart_icon_outline)을 가져오기보다는 그 위에 감싸져있는 부모 속성을 가져오는게 효율적
const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const side_box = document.querySelector('.side_box');
heart.addEventListener('click', function(){
//    console.log('hit');
//  heart.classList.add('on');
    heart.classList.toggle('on');
}); // 이렇게 쓰면 안 좋은점 : 위의 첫번째 게시글만 작동, 게시글이 많아질 수록 버튼 이벤트를 하나씩 작성해줘야함

function resizeFunc()
{
    if(pageYOffset >= 10){
        let calcWidth = (window.innerWidth * 0.5) + 170;
        // console.log(window.innerWidth);//화면 좌우 값 사이즈 구할 수 있다.
        side_box.style.left = calcWidth+'px';
    }
}

function scrollFunc(){
    console.log(pageYOffset);
    if(pageYOffset >= 10){
        header.classList.add('on');
        side_box.classList.add('on');

        resizeFunc();
    }else{
        header.classList.remove('on');
        side_box.classList.remove('on');
        side_box.removeAttribute('style');
    }
}

window.addEventListener('scroll', scrollFunc);
//eventDelegation : 대상을 클릭하는게 아니라 부모를 클릭했을 때 위임(떠넘기는것)