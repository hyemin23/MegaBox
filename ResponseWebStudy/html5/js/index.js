$(document).ready(function () {



    //sns 공유하기
    $(".facebook").click(function (e) {
        e.preventDefault();
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.title), 'facebooksharedialog', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=300, width=600');
    });
    $(".twitter").click(function (e) {
        e.preventDefault();
        window.open('https://twitter.com/intent/tweet?text=[%EA%B3%B5%EC%9C%A0]%20' + encodeURIComponent(document.URL) + '%20-%20' + encodeURIComponent(document.title), 'twittersharedialog', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=300, width=600');
    });

    //이미지 슬라이더 
    $(".slider").slick({
        dots: true
        , autoplay: true
        , autoplaySpeed: 3000
        , arrows: true
        , responsive: [
            {
                breakpoint: 768
                , settings: {
                    autoplay: false
                }
            }
        ]
    });

    //라이트갤러리
    $(".lightbox").lightGallery({
        autoplay: true
        , pause: 3000
        , progressBar: true
    });


    //접기 or 펼치기
    $(".btn").click((e) => {
        e.preventDefault();
        $(".nav").slideToggle();

        //토글 될 때 마다 해당 class에 open class명 추가
        $(".btn").toggleClass("open");

        //만약 .btn에 open이 포함되어있으면
        if ($(".btn").hasClass("open")) {
            $(".btn").find("i").attr("class", "fas fa-caret-up");
        } else {
            $(".btn").find("i").attr("class", "fas fa-caret-down");
        }
    });

    //리사이즈 설정
    $(window).resize(() => {
        var wWidth = $(window).width();
        if (wWidth > 600) {
            $(".nav").removeAttr("style");
        }
    });
});