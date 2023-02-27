$(document).ready(function () {
    nav();
    mMenu();
    subDepth2();
    footer_Swiper();
});    
function nav(){
  $('.navigation .gnb ul li').mouseover(function () {
    $(this).children().addClass('active');
    $('.navigation .gnb .show').css('opacity','1');
    $('.navigation .gnb ul li .depth2').css('display','block');
  });
  $('.navigation .gnb ul li').mouseleave(function () {
    $(this).children().removeClass('active');
    $('.navigation .gnb .show').css('opacity','0');
    $('.navigation .gnb ul li .depth2').css('display','none');
  });
}

function mMenu(){
  $('#toggle').click(function() {
    $('body').toggleClass('fixed');
    $('.topBlue').toggleClass('active');
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  var menu = $('.overlay-menu ul li a');
  menu.click(function() {
    $('.depth2').slideUp();
    if($(this).next().is(':hidden')){
      $(this).parent().find(".depth2").slideDown();
    }  
  });

}  

function subDepth2(){
    $('.category > li').setMenu();
  }
  
  $.fn.setMenu = function () {
    var depth1LI = $('> a', this);
    var depth2UL = $('> ul', this);
    
    var menu = $('.depth:first-child', this);
    menu.addClass('active');
    
    if ($('>ul', menu).length > 0) {
      $('>ul', menu).slideDown("fast");
      menu = $('>ul>li:first', li);
      menu.addClass('active');
      if ($('>ul', menu).length > 0) {
        $('>ul', menu).slideDown("fast");
        menu = $('>ul>li:first', li);
        menu.addClass('active');
      } else {
      }
    } else {
    }
    $('a', this).click(function () {
      var depth = $(this).parent();
      var sibling = depth.siblings();
    
      sibling.removeClass('active');
      $('ul', sibling).slideUp("fast");
      depth.toggleClass('active');
    
      var ul = $('>ul', depth);
      if (ul.length > 0) {
        ul.slideToggle("fast", function () {
        });
        return false;
      } else if ($(this).attr('target') != '_blank') {
      }
    });
  }


function footer_Swiper(){
    var bannerSwiper = new Swiper(".banner_zone .mySwiper", {
        loop:true,
        slidesPerView: 5,
        spaceBetween: 10,
        autoplay: {
            delay: 1000,
        },
        navigation: {
          nextEl: ".footerbtn .swiper-button-next",
          prevEl: ".footerbtn .swiper-button-prev",
        },
        breakpoints: {
           640: {
             slidesPerView: 2,
             spaceBetween: 10,
           },
           1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
           1400: {
             slidesPerView: 4,
             spaceBetween: 10,
           },
        },	
  });

  $('.footerbtn .swiper-button-pause').click(function(){
		if($(this).hasClass('off')){
			$(this).removeClass('off');
			bannerSwiper.autoplay.start();
		}else{
			$(this).addClass('off');
			bannerSwiper.autoplay.stop();
		}
	});


  //resize: 브라우저 창 너비의 변경된 값을 width 변수에 저장
  $(window).resize(function () {
    var width = $(window).width();
    if (width<=720) {
      $(".table-wrap").mouseover(function(){
        $(this).addClass("scroll");
      });
      $(".table-wrap").scroll(function(){
        $(this).addClass("scroll");
      });
      // $(".table__inner").mouseout(function(){
      // 	$(this).removeClass("scroll");
      // });
    } 
    
  });

  $(window).trigger("resize"); //강제로 호출하는 함수
}





// 아이폰 모바일 viewport 수정

// function doOnOrientationChange() {  
//   var viewportmeta = document.querySelector('meta[name="viewport"]');
//   switch(window.orientation) 
//   {  
//     case -90:
//     case 90:
//       alert('landscape'); // Just for debug obviously
//       viewportmeta.content = 'initial-scale=0.6';
//       break; 
//     default:
//       alert('portrait'); // Just for debug obviously
//       viewportmeta.content = 'initial-scale=0.8';
//       break; 
//   }
// }

// // Only bind the event on iPhone and iPad so we do not try and do this on any other device.
// if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
//   window.addEventListener('orientationchange', doOnOrientationChange);
//   // Initial execution if needed
//   doOnOrientationChange();
// }

