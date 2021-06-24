var PageTransitions = (function () {

    var $main = $('#ruang-halaman'),
        $pages = $main.children('div.halaman'),
        $iterate = $('#tombolMulaiSekarang'),
        animcursor = 1,
        pagesCount = $pages.length,
        saatini = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        support = Modernizr.cssanimations;



    function init() {

        $pages.each(function () {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(saatini).addClass('halaman-saatini');

        var audio = document.getElementById("audio");

        $iterate.on('click', function () {
            $('#tombolMulaiSekarang').hide();
            audio.play();

            setInterval(function () {
                $("#tombolMulaiSekarang").click();
            }, 7000);

            if (isAnimating) {
                return false;
            }
            if (animcursor > 67) {
                animcursor = 1;
            }
            nextPage(animcursor);
            ++animcursor;
        });

    }



    function nextPage(options) {
        var animation = (options.animation) ? options.animation : options;

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq(saatini);

        if (options.showPage) {
            if (options.showPage < pagesCount - 1) {
                saatini = options.showPage;
            } else {
                saatini = 0;
            }
        } else {
            if (saatini < pagesCount - 1) {
                ++saatini;
            } else {
                saatini = 0;
            }
        }

        var $nextPage = $pages.eq(saatini).addClass('halaman-saatini'),
            outClass = '',
            inClass = '';

        switch (animation) {

            case 1:
                outClass = 'halaman-rotateFoldRight';
                inClass = 'halaman-moveFromLeftFade halaman-delay200';
                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml15 .word',
                        scale: [14, 1],
                        opacity: [0, 1],
                        easing: "easeOutCirc",
                        duration: 2000,
                        delay: (el, i) => 1000 * i
                    });
                break;
            case 2:
                outClass = 'halaman-rotateFoldTop';
                inClass = 'halaman-moveFromBottomFade';
                var textWrapper = document.querySelector('.ml16');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml16 .letter',
                        translateY: [-100, 0],
                        easing: "easeOutExpo",
                        duration: 1500,
                        delay: (el, i) => 70 * i
                    });
                break;
            case 3:
                outClass = 'halaman-rotateFoldLeft';
                inClass = 'halaman-moveFromRightFade';
                var textWrapper = document.querySelector('.ml11 .letters');
                textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml11 .line',
                        scaleY: [0, 1],
                        opacity: [0.5, 1],
                        easing: "easeOutExpo",
                        duration: 1000
                    })
                    .add({
                        targets: '.ml11 .line',
                        translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
                        easing: "easeOutExpo",
                        duration: 1000,
                        delay: 1200
                    }).add({
                        targets: '.ml11 .letter',
                        opacity: [0, 1],
                        easing: "easeOutExpo",
                        duration: 600,
                        offset: '-=775',
                        delay: (el, i) => 34 * (i + 1)
                    }).add({
                        targets: '.ml11',
                        opacity: 1,
                        duration: 1000,
                        easing: "easeOutExpo",
                        delay: 1000
                    });
                break;
            case 4:
                outClass = 'halaman-rotateFoldBottom';
                inClass = 'halaman-moveFromTopFade';
                var textWrapper = document.querySelector('.ml9 .letters');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml9 .letter',
                        scale: [0, 1],
                        duration: 1500,
                        elasticity: 800,
                        delay: (el, i) => 70 * (i + 1)
                    }).add({
                        targets: '.ml9',
                        opacity: 1,
                        duration: 1000,
                        easing: "easeOutExpo",
                        delay: 1400
                    });
                break;
            case 5:
                outClass = 'halaman-rotateRoomLeftOut halaman-ontop';
                inClass = 'halaman-rotateRoomLeftIn';
                var textWrapper = document.querySelector('.ml2');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml2 .letter',
                        scale: [4, 1],
                        opacity: [0, 1],
                        translateZ: 0,
                        easing: "easeOutExpo",
                        duration: 1200,
                        delay: (el, i) => 70 * i
                    });
                break;
            case 6:
                outClass = 'halaman-rotateRoomTopOut halaman-ontop';
                inClass = 'halaman-rotateRoomTopIn';
                var ml4 = {};
                ml4.opacityIn = [0, 1];
                ml4.scaleIn = [0.2, 1];
                ml4.scaleOut = 3;
                ml4.durationIn = 700;
                ml4.durationOut = 500;
                ml4.delay = 1100;

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml4 .letters-1',
                        opacity: ml4.opacityIn,
                        scale: ml4.scaleIn,
                        duration: ml4.durationIn
                    }).add({
                        targets: '.ml4 .letters-1',
                        opacity: 0,
                        scale: ml4.scaleOut,
                        duration: ml4.durationOut,
                        easing: "easeInExpo",
                        delay: ml4.delay
                    }).add({
                        targets: '.ml4 .letters-2',
                        opacity: ml4.opacityIn,
                        scale: ml4.scaleIn,
                        duration: ml4.durationIn
                    }).add({
                        targets: '.ml4 .letters-2',
                        opacity: 0,
                        scale: ml4.scaleOut,
                        duration: ml4.durationOut,
                        easing: "easeInExpo",
                        delay: ml4.delay
                    }).add({
                        targets: '.ml4 .letters-3',
                        opacity: ml4.opacityIn,
                        scale: ml4.scaleIn,
                        duration: ml4.durationIn
                    }).add({
                        targets: '.ml4 .letters-3',
                        opacity: 0,
                        scale: ml4.scaleOut,
                        duration: ml4.durationOut,
                        easing: "easeInExpo",
                        delay: ml4.delay
                    }).add({
                        targets: '.ml4',
                        opacity: 1,
                        duration: 500,
                        delay: 500
                    });
                break;
            case 7:
                outClass = 'halaman-rotateRoomRightOut halaman-ontop';
                inClass = 'halaman-rotateRoomRightIn';
                var textWrapper = document.querySelector('.ml12');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml12 .letter',
                        translateX: [40, 0],
                        translateZ: 0,
                        opacity: [0, 1],
                        easing: "easeOutExpo",
                        duration: 1200,
                        delay: (el, i) => 500 + 30 * i
                    }).add({
                        targets: '.ml12 .letter',
                        opacity: [1, 1],
                        easing: "easeInExpo",
                        duration: 1100,
                        delay: (el, i) => 100 + 30 * i
                    });
                break;
            case 8:
                outClass = 'halaman-rotateRoomBottomOut halaman-ontop';
                inClass = 'halaman-rotateRoomBottomIn';
                var textWrapper = document.querySelector('.ml14 .letters');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml14 .line',
                        scaleX: [0, 1],
                        opacity: [0.5, 1],
                        easing: "easeInOutExpo",
                        duration: 900
                    }).add({
                        targets: '.ml14 .letter',
                        opacity: [0, 1],
                        translateX: [40, 0],
                        translateZ: 0,
                        scaleX: [0.3, 1],
                        easing: "easeOutExpo",
                        duration: 800,
                        offset: '-=600',
                        delay: (el, i) => 150 + 25 * i
                    }).add({
                        targets: '.ml14',
                        opacity: 1,
                        duration: 1000,
                        easing: "easeOutExpo",
                        delay: 1000
                    });
                break;
            case 9:
                outClass = 'halaman-rotateCarouselBottomOut halaman-ontop';
                inClass = 'halaman-rotateCarouselBottomIn';
                var textWrapper = document.querySelector('.ml7 .letters');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml7 .letter',
                        translateY: ["1.1em", 0],
                        translateX: ["0.55em", 0],
                        translateZ: 0,
                        rotateZ: [180, 0],
                        duration: 900,
                        easing: "easeOutExpo",
                        delay: (el, i) => 80 * i
                    }).add({
                        targets: '.ml7',
                        opacity: 1,
                        duration: 1000,
                        easing: "easeOutExpo",
                        delay: 1000
                    });
                break;
            case 10:
                outClass = 'halaman-rotateCarouselTopOut halaman-ontop';
                inClass = 'halaman-rotateCarouselTopIn';
                $("#gambar").fadeIn(3000);

                var textWrapper = document.querySelector('.ml13');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

                anime.timeline({
                        loop: false
                    })
                    .add({
                        targets: '.ml13 .letter',
                        translateY: [100, 0],
                        translateZ: 0,
                        opacity: [0, 1],
                        easing: "easeOutExpo",
                        duration: 1400,
                        delay: (el, i) => 300 + 30 * i
                    });

                break;

        }

        $currPage.addClass(outClass).on(animEndEventName, function () {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function () {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' halaman-saatini');
    }

    init();

    return {
        init: init,
        nextPage: nextPage,
    };

})();

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
        loop: false
    })
    .add({
        targets: '.ml1 .letter',
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 70 * (i + 1)
    }).add({
        targets: '.ml1 .line',
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 1500,
        offset: '-=875',
        delay: (el, i, l) => 80 * (l - i)
    });