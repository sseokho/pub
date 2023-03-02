$(document).ready(function () {
    se1Box1_Swiper();
    se1Box2_Swiper();

});    


function se1Box1_Swiper(){
    $('.hg_btn').hover(function() {
        $(this).addClass("aa")
      }, function(){
        $(this).removeClass("aa")
      });
 
}  
function se1Box2_Swiper(){
    var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
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