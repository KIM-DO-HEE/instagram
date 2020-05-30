/* html은 위에서 아래로 로드되기 때문에, index.html <head> 태그 안에 
<script src=""></script>
넣으면, 클래스를 찾는데 오류가 생긴다.
이를 해결하기위해서는
첫번째 방법
 63번째 줄에 있음
두번째 방법
</body> 태그 바로 위에 선언한다
*/


//자식(.sprite_heart_icon_outline)을 가져오기보다는 그 위에 감싸져있는 부모 속성을 가져오는게 효율적
const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const side_box = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');

/*
heart.addEventListener('click', function () {
       console.log('hit');
     heart.classList.add('on');
    heart.classList.toggle('on');
}); // 이렇게 쓰면 안 좋은점 : 위의 첫번째 게시글만 작동, 게시글이 많아질 수록 버튼 이벤트를 하나씩 작성해줘야함
해결 방법 
eventDelegation : 대상을 클릭하는게 아니라 부모를 클릭했을 때 위임(떠넘기는것)
*/

function delegationFunc(e) { // e는 이벤트 객체
    let elem = e.target;

    console.log(e.target); // e는 클릭 이벤트 이므로, 클릭한 대상들이 뜬다 ex) <div class="heart_btn"></div>
    console.log(elem.getAttribute('data-name'));
    // while (!elem.getAttribute('data-name')) { //클릭했을 때, 클릭한 대상에 data-name이 없을 경우 
    //     elem = elem.parentNode;

    //     if (elem.nodeName === 'BODY') {
    //         elem = null;
    //         return;
    //     }
    // }

    if (elem.matches('[data-name="heartbeat"]')) {
        console.log("하트");
        
        $.ajax({
            type : 'GET',
            url : 'data/like.json', //통신할 수 있는 url, json 데이터 통해 받을거라서 json 적음
            data : 37,
            dataType : 'json',
            success : function(response){
                
                let likeCount = document.querySelector('#like-count-37');
                likeCount.innerHTML = '좋아요' + response.like_count +'개';
            },
            error : function(request,status,error){
                alert('로그인이 필요합니다');
                window.location.replace('https://www.naver.com');
            }

        })

    } else if (elem.matches('[data-name="bookmark"]')) {
        console.log("북마크 !");
        let pk = elem.getAttribute('name');
        $.ajax({
            type : 'GET',
            url : 'data/bookmark.json',
            data : {pk},
            dataType : 'json',
            success : function(response){
                let bookmarkCount = document.querySelector("#bookmark-count-37");
                bookmarkCount.innerHTML = '북마크' + response.bookmark_count + '개'
            }
        })

      
    } else if (elem.matches('[data-name="comment"]')) {
        // console.log("공유");

        let content = document.querySelector('#add-comment-post-37 > input[type=text]').value;

        console.log(content);

        if(content.length > 140){
            alert('댓글은 최대 140자 입력 가능합니다. 현재 글자수 :'+ content.length);
            return;
        }

        $.ajax({
           type : 'get',
           url : '/comment.html',
           data : {
               'pk' : 37,
               'content' : content,
           },
           dataType : 'html',
           success :function(data){
               document.querySelector('#comment-list-ajax-post-37').insertAdjacentHTML("afterbegin",data);
           },
           error : function(request,status,error){
               alert('문제가 발생했습니다');
           }
        });
        document.querySelector('#add-comment-post-37 > input[type=text]').value = '';

    } else if (elem.matches('[data-name="comment_delete"]')) {
        console.log("더보기");

        $.ajax({
            type : 'get',
            url : 'data/delete.json',
            data:{
                'pk': 37,
            },
            dataType : 'json',
            success:function(response){
                if(response.status){
                    let comt = document.querySelector('.comment-detail');
                    comt.remove();
                }
            },
            error : function(request,status,error){
                alert('문제가 발생했습니다');
            }
        })
    }else if(elem.matches('[data-name="follow"]')){
        $.ajax({
            type : 'get',
            url : 'data/follow.json',
            data:{
                'pk': 37,
            },
            'dataType' : 'json',
            success: function(response){
                if(response.status){
                    document.querySelector('input.follow').value = "팔로잉";
                }else{
                    document.querySelector('input.follow').value = "팔로워";
                }
            },error : function(request,status,error){
                alert('문제가 발생했습니다');
            }
        })
    }

    elem.classList.toggle('on');
}

// 스크롤을 할 때, 사이드 바 위치 조정( 브라우저 크기를 구해서 위치를 조정)
// 브라우저 창 크기가 줄어 들 때, 컨텐츠 박스 크기를 줄인다
function resizeFunc() {
    console.log('resize!');
    if (pageYOffset >= 10) {
        let calcWidth = (window.innerWidth * 0.5) + 170;
        // console.log(window.innerWidth);//화면 좌우 값 사이즈 구할 수 있다.
        side_box.style.left = calcWidth + 'px';
    }

    if (matchMedia('screen and (max-width : 800px').matches) {
        // variableWidth.style.width =  window.innerWidth - 20 + 'px';
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].style.width = window.innerWidth - 20 + 'px';
        }
    } else {
        //variableWidth.removeAttribute('style');
        for (let i = 0; i < variableWidth.length; i++) {

            if (window.innerWidth > 600) {
                variableWidth[i].removeAttribute('style');
            }
        }
    }
}

//스크롤을 했을 때, 헤더 및 사이드바 고정
function scrollFunc() {
    //pageYOffset은 첫화면은 스크롤을 안하기 때문에 스크롤을 하는 시점부터 높이 값이 측정되기 때문에 innerHeight 값을 통해 첫화면 높이를 구하여 더한다.
    let scrollHeigth = pageYOffset + window.innerHeight + 1;

    let documentHeight = document.body.scrollHeight;

    console.log('scrollHeigth :'+scrollHeigth);
    console.log('documentHeight :' + documentHeight);

    if (pageYOffset >= 10) {
        header.classList.add('on');

        if (side_box) { //다른 html에는 sidebox가 없을 수도 있으므로 조건 처리
            side_box.classList.add('on');
        }

        resizeFunc();
    } else {
        header.classList.remove('on');
        if (side_box) {
            side_box.classList.remove('on');
            side_box.removeAttribute('style');
        }

    }

    if(scrollHeigth >= documentHeight){
        //ajax 통신이 얼만큼 되고, 남아있는 페이지 수, 어느정도 도달하면 무한스크롤이 되면 안되는지 설정하기 위해 페이지 변수를 만듬
        let page = document.querySelector('#page').value;

        document.querySelector('#page').value = parseInt(page) + 1;

        callMorePostAjax(page);

        if(page > 5){
            return;
        }
    }
}

function callMorePostAjax(page){

    if(page > 5){
        return;
    }

    $.ajax({
        type : 'get',
        url : '/post.html',
        data:{
            'page' : page,
        },
        dataType : 'html',
        success: addMorePostAjax,
        error : function(request,status,error){
            alert('문제가 발생했습니다');
        }
    })
}


function addMorePostAjax(data){
    //html 뿌려주는 위치
    delegation.insertAdjacentHTML('beforeend', data);
}
setTimeout(function () {
    scrollTo(0, 0);
}, 100)

// window.addEventListener('DOMContentLoaded', function(){
//     문서가 로드될 때 까지 기다리라는 명령어
//    })  

if (delegation) { // //다른 html에는 contents_box가 없을 수도 있으므로 조건 처리
    delegation.addEventListener('click', delegationFunc);
}
window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);

