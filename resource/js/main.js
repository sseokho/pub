$(document).ready(function () {
    se1Box1_Swiper();
    se1Box2_Swiper();
    se4_Swiper();
    se3Board();
  });    
  
  function se1Box1_Swiper(){
      var autoPlayDelay = 3000;
      var options = {
          init: true,
          // Optional parameters
          loop: false,
        //   autoplay: {
        //       delay: autoPlayDelay
        //   },
  
          navigation: {
              nextEl: '.se1Box1 .swiper-button-next',
              prevEl: '.se1Box1 .swiper-button-prev',
          },
        };
  
      var mySwiper = new Swiper('.se1Box1 .mySwiper', options);
      var slidersCount = mySwiper.params.loop ? mySwiper.slides.length - 2 : mySwiper.slides.length;
      var widthParts = 100 / slidersCount;
  
      $('.swiper-counter .total').html(slidersCount);
      for(let i=0; i<slidersCount; i++){
          $('.swiper-progress-bar .progress-sections').append('<span></span>');
      }
  
      function initProgressBar(){
          let calcProgress = (slidersCount-1) * (autoPlayDelay + mySwiper.params.speed);
          calcProgress += autoPlayDelay;
          $('.swiper-progress-bar .progress').animate({
              width: '100%'
          }, calcProgress, 'linear');
      }
  
      initProgressBar();
      
      mySwiper.on('slideChange', function () {
          let progress = $('.swiper-progress-bar .progress');
          
          $('.swiper-counter .current').html(this.activeIndex + 1);
          
          if( 
              ( 
                  this.progress == -0 || (this.progress == 1 && this.params.loop) 
              ) && !progress.parent().is('.stopped')
          ){
              progress.css('width', '0');
              if(this.activeIndex == 0){
                  initProgressBar();
              }
          }
          
          if(progress.parent().is('.stopped')){		   
              progress.animate({
                  'width': Math.round(widthParts * (this.activeIndex + 1)) + '%'
              }, this.params.speed, 'linear');
          }
      });
      
      mySwiper.on('touchMove', function () {
          $('.swiper-progress-bar .progress').stop().parent().addClass('stopped');
      });
}  
  

function se1Box2_Swiper(){
	var se1Box2Swiper = new Swiper(".se1Box2 .mySwiper", {
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false
		// },
		pagination: {
			el: ".se1Box2 .swiper-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: ".se1Box2 .swiper-button-next",
			prevEl: ".se1Box2 .swiper-button-prev",
		},
	});
  }
  
  function se4_Swiper(){
    var se4Swiper = new Swiper(".se4Box .mySwiper", {
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false
      // },
      spaceBetween: 30,
      slidesPerView: 2,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: ".se4Box .swiper-button-next",
        prevEl: ".se4Box .swiper-button-prev",
      },
    });
  }
  
  
  
  function se3Board(){
    var $notice = $('.tab_wrap');
    var $noticeTab = $notice.find('h4');
    var $noticeCont = $notice.find('.tab_cont');
  
    $noticeTab.on('click focusin', function(e) {  
        e.preventDefault();
        var tabID = this.id.split("_")[1];
        console.log('tabID',tabID);
        var $nListID = $('#list_' + tabID);
        if ($nListID.css("display") == "none") {
            $noticeTab.removeClass('on');
            $noticeCont.css('display','none');
        }
        $(this).addClass("on");
        $nListID.css('display','block');
    });
  }
  