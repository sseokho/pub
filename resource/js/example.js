$(document).ready(function () {
    click_event1();
    se1Box2_Swiper();
    zoom();

    let ne = document.querySelector(".owl-dot");
    ne.onclick = function(){
      alert("fff");
    }
});    


function  click_event1(){
  $(".wonder").addClass('close')
  $('.hg_btn').click(function () {

    $(".wonder").toggleClass('open');
    $('.hg_btn').toggleClass('click');

      if ($(".wonder").hasClass("open")) {

          $(".wonder").removeClass('close')
          $(".wonder").addClass('open')


      } else if (!$(".wonder").hasClass("open")) {

          $(".wonder").addClass('close')
          $(".wonder").addclass('open')
      }


    });


    $('.close .hg_btn').hover(function() {
      $(".close .hg_btn").addClass("is-active")
    }, function(){
      $(".close .hg_btn").removeClass("is-active")
    });


    

    
} 

function se1Box2_Swiper(){
    
}


function zoom(){
 /*
  $(window).scroll(function(){

    
    


    var scroll = $(window).scrollTop();
        
        if (scroll >= 375) {
            
          console.log("도착")


        } else {
          
          var 높이 = $(window).scrollTop();
          console.log(높이);
        
         


          var z = (1 / 1700) * 높이 + 100/100;
          $('.mySwiper').eq(0).css('transform', `scale( ${z} )`);

          

        }


  });

*/
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 200, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

  });

  AOS.refresh();
  setTimeout("AOS.refresh()", 1000);
  console.log("132");


  /* 높이 계산 */
  var Cheight = $(window).height();
  var Mheight = Cheight - $('#header').height();
  $('.height').css({'height':Cheight+'px'});
    $('.Mheight').css({'height':Mheight+'px'});

  $( window ).resize(function() {
    Cheight = $(window).height();
        Mheight = Cheight - $('#header').height();
    $('.height').css({'height':Cheight+'px'});
        $('.Mheight').css({'height':Mheight+'px'});
    AOS.refresh();
    setTimeout("AOS.refresh()", 1000);
  });


  window.addEventListener('scroll', function(e) {
  var scTop = $(window).scrollTop();
  if(scTop > 50) {
    $("#header").addClass("on");
    $("#asidearrow").addClass("on");
    } else {
        $("#header").removeClass("on");
        $("#asidearrow").removeClass("on");
    }
    calHero(scTop);
    cc_comment01(scTop);
    cc_comment02(scTop);
    cc_comment03(scTop);
  });


  function calHero(scTop){
    var scTop = $(window).scrollTop();
    var ratio = 1 + scTop * 0.001;
    var transY = scTop * 0.05;
    if(ratio > 1.2)
        ratio = 1.2;
    
    if(transY > 10)
        transY = 10;
    $('.cm_hero .owl-stage-outer').css({'transform':'translateY('+transY+'%) scale('+ratio+')'});
  }


  function cc_comment01(scTop) {
		if($('.cm_service .cmsc_01').length != 0){
			var value01 = 20;
			
			var value02 = value01 * 2;

			var offset = $('.cms_crosstext').offset().top - Cheight;
			var calvalue =  scTop - offset;
			var ratio = value01 - calvalue / Cheight  * value02 ;
			if(ratio >= value02)
				ratio = value02;
            if ($(window).width() <= 540) {
                ratio = ratio *0.5;
            }
			$('.cm_service .cmsc_01').css({transform: 'translate('+ratio+'%,0px)'});
		}

        
	}

	function cc_comment02(scTop) {
		if($('.cm_service .cmsc_02').length != 0){
			var value01 = 20;
			
			var value02 = value01 * 2;

			var offset = $('.cms_crosstext').offset().top - Cheight;
			var calvalue =  scTop - offset;
			var ratio = value01 - calvalue / Cheight  * value02 ;
			if(ratio >= value02)
				ratio = value02;
				ratio = -ratio;
            if ($(window).width() <= 540) {
                ratio = ratio *0.5;
            }
			$('.cm_service .cmsc_02').css({transform: 'translate('+ratio+'%,0px)'});
		}
	}

  /* cc_comment03 인터렉션 */
	function cc_comment03(scTop) {
		if($('.cm_brand').length != 0){
			var offset = $('.cm_brand').offset().top - Cheight*0.3;
			var calvalue =  scTop - offset;
			var ratio = 40 - calvalue / Cheight  * 80 ;
			if(ratio >= 80)
				ratio = 80;
            $('.cm_brand .cmb_slider .brands_bigtitle').css({transform: 'translate(0px,'+ratio+'%) rotate(-90deg)'});
		}
	}

}


