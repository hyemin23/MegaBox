


$(document).ready(function () {


    //스와이퍼 사용
    //첫 번째 인자 :swiper container
    //두 번째 인자 : swiper options
    //배너 이미지 슬라이드
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });

    //영화차트 이미지 슬라이드
    //만약 탭메뉴별로 차트가 독립적으로 움직이게 하고 싶으면 
    //contaner2 부분을 다른 숫자로 바꾼 후 스크립트도 따로 만들어서 똑같이 제어해주면 됨.
    var swiper = new Swiper('.swiper-container2', {
        slidesPerView: 4,
        spaceBetween: 24,
        mousewheel: {
            invert: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        autoplay: {
            delay: 6000,
        },
        //앞에 숫자는 반응형 화면 width 값을 의미
        //slidesPerVies는 보여질 수
        breakpoints: {
            500: {
                slidesPerView: 1.4,
                spaceBetween: 24
            },

            600: {
                slidesPerView: 1.4,
                spaceBetween: 24
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        }


    });


    /*화살표함수로 사용하면 안됨 이유는 화살표 함수는 일반함수와 달리 자신이 호출되면서 생성된 실행 콘텍스튼에서 thisBinding 정보를 생성하지 않기 때문
    쉽게말해 호출되더라도, "누가" 자신을 호출하는지에 대한 정보를 생성하지 않기 때문이다. 그래서 화살표함수 내부에서 this 가 참조된다면,
    선언된 실행컨텍스트가 참조하는 상위 객체를 참조하기 때문에 여기서는 document가 참조 될 것이다.
    */
    // movBtn.click((e) => {

    //     e.preventDefault();
    //     var target = $(this);

    //     console.log(target); //document


    //     var index = target.index();

    //     movBtn.removeClass("active");
    //     target.addClass("active");
    // });

    //영화차트 탭 메뉴
    var movBtn = $(".movie_title > ul > li");
    var movCont = $(".movie_chart > div");
    movCont.hide().eq(0).show();



    movBtn.click(function (e) {
        e.preventDefault();
        var target = $(this);

        //console.log(target);     // <li>
        var index = target.index();

        movBtn.removeClass("active");
        target.addClass("active");
        movCont.css("display", "none");
        movCont.eq(index).show();
    });

    //공지사항 탭메뉴
    let menu = $(".notice");

    //컨텐츠 내용 숨김
    menu.find("ul > li >ul ").hide();
    menu.find("ul > li.active > ul").show();


    //active된 애들만 활성화
    menu.click(function (e) {
        e.preventDefault();

        var target = $(this);

        // $(this).removeClass("active");

        //인접한 요소중에서 active를 갖고 있으면 제거
        target.find('ul>li').removeClass("active");
        $(this).addClass("active");
    });


});