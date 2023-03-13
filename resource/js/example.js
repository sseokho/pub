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
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });
}


function zoom(){
 
  $(window).scroll(function(){

    
    


    var scroll = $(window).scrollTop();
        
        if (scroll >= 210) {
            
         


        } else {
          var 높이 = $(window).scrollTop();
          console.log(높이);
        
          var y =  5/100 * 높이 + 0/100;
          $('.mySwiper').eq(0).css('position', 'relative');
          $('.mySwiper').eq(0).css('top', y);
          


          var z = (1/1000) * 높이 + 300/300;
          $('.mySwiper').eq(0).css('transform', `scale( ${z} )`);
    

          

        }


  });







}