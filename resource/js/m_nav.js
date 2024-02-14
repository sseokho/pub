$(".menu__button, .menu-panel-overlay").click( function() {
    $(".menu__button, .menu-panel-overlay, .menu-panel").toggleClass("is--active");
    /* dg-hd-mo-menu-panel-overlay 활성화 체크 */
    if ($(".dg-hd-mo-menu-panel-overlay").hasClass("is--active")) {
      $(".dg-hd-mo-menu-panel-overlay").slideUp();
    } else {
      $(".dg-hd-mo-menu-panel-overlay").slideDown();
    }
  });

  ( function( $ ) {
	$('.cate ul').hide();
	$('.cate .menu').click(function() {
	  if($(this).hasClass('active')){
		 $(this).next().slideUp(300);
		 $(this).removeClass('active');
	  }else{
		$('.accordion').find('.active').next().slideUp(300);
		$('.accordion').find('.active').removeClass('active');
		$(this).next().slideDown(300);
		$(this).addClass('active');
	  }     
	 
	 });
  })( jQuery );
