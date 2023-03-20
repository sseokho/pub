$(document).ready(function () {
    click_event1();
    se1Box2_Swiper();
    zoom();

   
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

  window.addEventListener('scroll', function(e) {
  var scTop = $(window).scrollTop();
  calHero(scTop);

  });


  function calHero(scTop){
    var scTop = $(window).scrollTop();
    var ratio = 1 + scTop * 0.001;
    var transY = scTop * 0.05;
    if(ratio > 1.2)
        ratio = 1.2;
    
    if(transY > 10)
        transY = 10;
    $('.owl-stage-outer').css({'transform':'translateY('+transY+'%) scale('+ratio+')'});
  }



}


