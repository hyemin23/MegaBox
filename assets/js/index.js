


$(document).ready(function () {

    alert("지예은 사랑해");
    //즉시실행함수 실행
    //트레일러 영상 플레이어
    /* YouTube iframe API: https://developers.google.com/youtube/player_parameters */
    (function handleTrailer() {
        //객체를 이용한 설정
        // 셀럭터 캐시
        var $selector = {
            body: $("body"),
            overlay: $("#blackout"),
            modal: $("#trailerModal"),
            showButton: $("#showTrailer"),
            hideButton: $("#hideTrailer"),
        };

        // 플레이어
        var player = {
            obj: null, // 플레이어 오브젝트
            query: {
                theme: "dark",
                color: "white",
                controls: 1,
                autoplay: 1,
                enablejsapi: 1,
                modestbranding: 0, // YouTube 로고 감춤
                rel: 0,  // 관련 동영상 표시
                showinfo: 0, // 제목, 업로더 감춤
                iv_load_policy: 3 // 특수효과 감춤
            },
            visible: false
        };

        // 보이기, 숨기기 버튼 활성화
        $selector.showButton.on("click", showPlayer);
        $selector.hideButton.on("click", hidePlayer);

        //YouTube API를 이용해 iframe을 생성
        function setPlayer(id) {
            player.obj = new YT.Player("trailer", {
                width: 480,
                height: 282,
                videoId: id,
                playerVars: player.query
            });

            // 처음 플레이어 크기 설정
            resizePlayer();

            // 리사이즈 화면 회전시 플레이어 크기 다시 설정
            $(window).on("resize orientationchange", function () {
                resizePlayer();
            });
        }


        //크기 설정
        function resizePlayer() {
            var viewport = {}, frame = {}, modal = {};
            //현재 화면의 넓이,높이 구해옴

            viewport.width = $(window).width();
            viewport.height = $(window).height();

            //프레임에 넓이,비율 설정
            frame.width = viewport.width;
            frame.height = frame.width / 1.6;  //16:10비율로 설정

            //모달을 띄우려면 top값과 width 값이 필요
            // 화면 전체 height값에서 프레임의 height값만 뺌
            modal.top = ((viewport.height - frame.height) / 2) + "px";
            modal.left = "0px";

            // console.log("viewport height :" + viewport.height);
            // console.log("frame.height : " + frame.height);
            // console.log("modal top : " + modal.top);


            $selector.modal.css(modal);

            player.obj.setSize(frame.width, frame.height);
        }


        // iframe 보이기
        function showPlayer() {
            //player가 있으면 null이 아니면
            if (!player.obj) {
                //매개변수는 html의 data 속성값을 설정해준 값을 의미
                setPlayer($selector.showButton.data("youtube"));
            }

            $selector.body.addClass("modal_on");
            $selector.overlay.show();
            player.visible = true;
        };

        // iframe 감추기
        function hidePlayer() {
            player.obj.stopVideo();
            $selector.overlay.hide();
            $selector.body.removeClass("modal_on");
            player.visible = false;
        };

    })();



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
    function aClickEvent(e) {
        e.preventDefault();

        //여기서의 타겟은 클릭당한 주체.
        //즉 li를 클릭하므로 target = li
        var target = $(this);


        //인접한 형제들 중 모든 active 요소 제거
        //target.next() => li의 다음 요소 즉, 클릭당한 주체의 다음 요소인 ul을 의미. 그 부모의 li에 active 추가 후 형제 li 중에 active가 붙은 놈들 제거 후 밑에있는 ul들까지 찾은 후 안보이게 작업
        target.next().show().parent("li").addClass("active").siblings("li").removeClass("active").find("ul").hide();

    };

    menu.find("ul>li>a").click(aClickEvent).focus(aClickEvent);

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

});