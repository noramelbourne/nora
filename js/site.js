$(document).ready(function () {

    function isIOS() {
        return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
    }

    var isMenuShowing = false;
    var isToggled = false;
    var isToggleFinished = false;
    var menuHeight = 60;

    var scrollPivot = null;
    var scrollDistanceUp = 0;
    var scrollDistanceDown = 0;

    var mainScrollPosition;

    $(window).scroll(function () {
        if (isToggled && isIOS())
            $(window).scrollTop(0);
    });

    var toggleBooking = function (isVoucher) {
        //$('.main-content').toggleClass('toggled');
        var height = $(window).innerHeight();
        var toggleOffset = $('.main-content').scrollTop() > 300 ? (height - menuHeight) : height;
        if (window.innerWidth < 568) toggleOffset += 60;

        if (isIOS())
            $(window).scrollTop(mainScrollPosition);


        if (isToggled) {
            $('.booking-content').removeClass('toggled').velocity({ translateY: 0 }, 500, "swing", function () {
                //$('.booking-content').fadeOut();
                //$('.booking-content').animate({ opacity: 0 });
                $('#booking_frame').hide();
                $('#voucher_frame').hide();
                isToggleFinished = false;
            });
            $('.menu-bar').removeClass('toggled');
            $('html, body').css({ overflow: 'scroll' });
            $('.menu-bar .book-button').html('Book a table');
            $('.menu-bar .voucher-button').show();
            $('.menu-bar .menu-logo').show();
        } else {
            if (isIOS()) {
                mainScrollPosition = $(window).scrollTop();
                $(window).scrollTop(0);
            }
            $('.booking-content').show();
            isVoucher ? $('#voucher_frame').show() : $('#booking_frame').show();
            isVoucher ? $('.booking-text').hide() : $('.booking-text').show();
            $('.booking-content').addClass('toggled').velocity({ translateY: toggleOffset }, 500, "swing");
            $('.menu-bar').addClass('toggled');
            isVoucher ? $('.menu-bar .book-button').html('Close voucher') : $('.menu-bar .book-button').html('Close booking');
            $('.menu-bar .voucher-button').hide();
            $('.menu-bar .menu-logo').hide();
            $('.booking-content').scrollTop(0);
            $('html, body').css({ overflow: 'hidden' });

        }

        isToggled = !isToggled;
        if (isToggled) isToggleFinished = true;

    }

    $('.book-button').click(function () {
        toggleBooking(false);
    });

    $('.voucher-button').click(function () {
        toggleBooking(true);
    });

    var showMenu = function () {

        if (!isMenuShowing) {
            $('.menu-bar').animate({ transform: 'translateY(0)' })

            isMenuShowing = true;
        }

    };

    var hideMenu = function () {

        if (isMenuShowing) {
            $('.menu-bar').animate({ marginTop: 'translateY(' + -menuHeight + 'px)' })

            isMenuShowing = false;
        }

    }

    var percentageToOpacity = function (percentage, offset) {
        var distance = (percentage * 100);

        if (distance >= (50 - offset) && distance <= (50 + offset))
            return 1;

        if (distance > 50)
            distance = 100 - distance;

        return ((distance / (50 - offset)))

    }


    $('.hero-copy:not(.no-animate)').jScrollability(
        function ($el) { return $el.closest('section').offset().top; },
        function ($el) { return $el.closest('section').offset().top + $el.closest('section').height() * 2; },
        function ($el, pcnt) {
            if (isToggleFinished) return false;
            $el.css({
                'opacity': percentageToOpacity(pcnt, 10),
                'transform': 'translateX(' + ((percentageToOpacity(pcnt, 5) * 20) - 20) + 'px)'
            });
        }
    )

    $('.hero-book:not(.no-animate)').jScrollability(
        function ($el) { return $el.closest('section').offset().top; },
        function ($el) { return $el.closest('section').offset().top + $el.closest('section').height() * 2; },
        function ($el, pcnt) {
            if (isToggleFinished) return false;
            //if (window.innerWidth < 568) return false;
            $el.css({
                'opacity': percentageToOpacity(pcnt, 10),
            });
        }
    )


    $('.background-cover').jScrollability(
        function ($el) { return $el.parent().offset().top; },
        function ($el) { return $el.parent().offset().top + $el.parent().height() * 2; },
        function ($el, pcnt) {
            //if (window.innerWidth < 568) return false;
            if (isToggleFinished) return false;
            $el.css({
                'opacity': 1.2 - percentageToOpacity(pcnt, 10)
            });
        }
    )


    var headroom = new Headroom(
        document.querySelectorAll('.menu-bar')[0]
    );


    headroom.init();


});