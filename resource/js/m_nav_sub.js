/* *******************************************************
 * filename : sub.js
 * description : �쒕툕而⑦뀗痢좎뿉留� �ъ슜�섎뒗 JS
 * date : 2022-08-04
******************************************************** */


$(document).ready(function  () {
	/* ************************
	* Func : �쒕툕 Visual Active �대옒�� 遺숈씠湲�
	* addClassName () �꾩슂
	************************ */
	setTimeout(function  () {
		addClassName($("#visual"), "active");
	},200);

	/* ************************
	* Func : 紐⑤떖�앹뾽 �뚮윭洹몄씤 �ъ슜
	* MagnificPopup.js �꾩슂
	************************ */
	if ($.exists(".popup-gallery")) {
		magnificPopup($(".popup-gallery"));
	}

	/* ************************
	* Func : �쇱젙 媛�濡쒖궗�댁쫰 �꾨옒遺��� scroll �ъ슜�섍린
	* mCustomScrollbar.js, customScrollX() �꾩슂
	************************ */
	/* �쒕툕 Scrollbar object  */
	$(".custom-scrollbar-wrapper").each(function  () {
		$(this).prepend("<div class='custom-scrollbar-cover'><div class='scroll-cover-txt'><i class='xi-touch'></i></div></div>");
		var $scrollObject = $(this).find(".scroll-object-box");
		if ($.exists($scrollObject)) {
			customScrollX($scrollObject);
		}
		$(this).on("touchmove click",function  () {
			$(this).find(".custom-scrollbar-cover").fadeOut(200);
		});
	});

	/* ************************
	* Func : �쒕툕 �곷떒 硫붾돱 FIXED
	* getWindowWidth(), checkOffset(), toFit() �꾩슂
	************************ */
	if ($.exists(".fixed-sub-menu")) {
		var $fixedSubMenu = $(".fixed-sub-menu");
		var topMenuStart =  checkOffset($fixedSubMenu);
		$(window).resize(function  () {
			if ( getWindowWidth() > tabletWidth ) {
				topMenuStart =  checkOffset($fixedSubMenu);
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		});
		window.addEventListener('scroll', toFit(function  () {
			if ( getWindowWidth() > tabletWidth ) {
				objectFixed($fixedSubMenu, topMenuStart, "top-fixed");
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		}, {
		}),{ passive: true })
	}

	/* ************************
	* Func : 而⑦뀗痢� 硫붾돱 FIXED 諛� �대┃�� �대떦�곸뿭 �대룞
	* getScrollTop(), getWindowWidth(), checkOffset(), toFit(), checkFixedHeight(), moveScrollTop() �꾩슂
	************************ */
	if ($.exists(".cm-fixed-tab-container-JS")) {
		var $fixedMoveTab = $(".cm-fixed-tab-list-JS");		// fixed�섎뒗 硫붾돱 �대옒��
		var $moveTabItem = $fixedMoveTab.find("li");
		var menuCount= $moveTabItem.length;
		var nav = [];
		
		$(window).on('load', function  () {
			checkStartOffset();
			nav = checkTopOffset();
		});
		$(window).on('resize', function  () {
			checkStartOffset();
			nav = checkTopOffset();
		}); 		
		
		// ��씠 遺숆린 �쒖옉�섎뒗 吏��� 泥댄겕
		function checkStartOffset () {
			var fixedStartPoint =  $(".cm-fixed-tab-container-JS").offset().top - checkFixedHeight();	
			return fixedStartPoint;
		}		

		// �대떦�섎뒗 媛곴컖�� �곸뿭 �곷떒媛� 痢≪젙
		function checkTopOffset () {
			var arr = [];
			for(var i=0;i < menuCount;i++){
				arr[i]=$($moveTabItem.eq(i).children("a").attr("href")).offset().top;
			}
			return arr;
		}
		
		// �ㅽ겕濡� 0�쇰븣 �곷떒fixed�섎뒗 �믪씠媛� 泥댄겕
		function checkFixedObjectHeight () {
			var fixedObjectTotalHeight = 0;
			for (var i=0; i<$(".top-fixed-object").length; i++) {
				var fixedObjectTotalHeight = fixedObjectTotalHeight + $(".top-fixed-object").eq(i).outerHeight();
			}
			return fixedObjectTotalHeight;
		}

		// �ㅽ겕濡� event 
		/*window.addEventListener('scroll', toFit(function  () {
			// 硫붾돱fixed
			// objectFixed($fixedMoveTab, checkStartOffset(), "top-fixed");

			if ( getScrollTop() >  checkStartOffset() ) {
				$fixedMoveTab.addClass("top-fixed");
			}else if ( getScrollTop() <  (checkStartOffset() + $fixedMoveTab.height()) ) {
				$fixedMoveTab.removeClass("top-fixed");
			}

			$moveTabItem.each(function  (idx) {
				var eachOffset = nav[idx] -  checkFixedHeight();
				var minusOffset = $(window).height() / 6;	// �ㅽ겕濡ㅼ떆 selected 遺숇뒗 吏��먯쓣 議곌툑 �� 鍮좊Ⅴ寃� �섍린�꾪빐 異붽�
				
				if( (getScrollTop() + minusOffset) >= eachOffset ){
					$moveTabItem.removeClass('selected');
					$moveTabItem.eq(idx).addClass('selected');
					// 紐⑤컮�� �쒕∼硫붾돱�쇰븣
					if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
						$fixedMoveTab.find(".cm-drop-open-btn-JS > span").text($moveTabItem.eq(idx).find("em").text());
					}
				};
			});
			}, {
		}),{ passive: true })*/
		window.addEventListener('scroll', toFit(function  () {
			// 硫붾돱fixed
			// objectFixed($fixedMoveTab, checkStartOffset(), "top-fixed");

			if ( getScrollTop() >  checkStartOffset() ) {
				if (!($fixedMoveTab.hasClass("overview-move-tab"))) {
					$fixedMoveTab.addClass("top-fixed");
				}
			}else if ( getScrollTop() <  (checkStartOffset() + $fixedMoveTab.height()) ) {
				if (!($fixedMoveTab.hasClass("overview-move-tab"))) {
					$fixedMoveTab.removeClass("top-fixed");
				}
			}

			$moveTabItem.each(function  (idx) {
				var eachOffset = nav[idx] -  checkFixedHeight();
				if( getScrollTop() >= eachOffset ){
					$moveTabItem.removeClass('selected');
					$moveTabItem.eq(idx).addClass('selected');
					// 紐⑤컮�� �쒕∼硫붾돱�쇰븣
					if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
						$fixedMoveTab.find(".cm-drop-open-btn-JS > span").text($moveTabItem.eq(idx).find("em").text());
					}
				};
			});
			}, {
		}),{ passive: true })
		
		// �대┃ event 
		/*$moveTabItem.find("a").click(function  () {
			var goDivOffset = $($(this).attr("href")).offset().top - checkFixedHeight() +1;	// �대룞�댁빞�� 吏���
			if ( getScrollTop()  < checkStartOffset()) {
				if ( getScrollTop() == 0 ) {
					var goDiv = goDivOffset - checkFixedObjectHeight();
				}else {
					var goDiv = goDivOffset - $fixedMoveTab.height();
				}
			}else {
				var goDiv = goDivOffset;
			}
			setTimeout(function  () {
				moveScrollTop(goDiv);
			});

			// 紐⑤컮�� �쒕∼硫붾돱�쇰븣
			if ($.exists($(this).parents(".cm-drop-menu-box-JS")) ) {
				if ( getWindowWidth () < $fixedMoveTab.data("drop-width")+1 ) {
					$fixedMoveTab.find("ul").slideUp();
				}
			}
			 
			return false;
		});*/
		$moveTabItem.find("a").click(function  () {
			var goDivOffset = $($(this).attr("href")).offset().top - checkFixedHeight() +1;	// �대룞�댁빞�� 吏���
			if ( getScrollTop()  < checkStartOffset()) {
				if ( getScrollTop() == 0 ) {
					var goDiv = goDivOffset - checkFixedObjectHeight();
				}else {
					if (!($fixedMoveTab.hasClass("overview-move-tab"))) {
						var goDiv = goDivOffset - $fixedMoveTab.height();
					}else {
						var goDiv = goDivOffset;
					}
				}
			}else {
				var goDiv = goDivOffset;
			}
			setTimeout(function  () {
				moveScrollTop(goDiv);
			});

			// 紐⑤컮�� �쒕∼硫붾돱�쇰븣
			if ($.exists($(this).parents(".cm-drop-menu-box-JS")) ) {
				if ( getWindowWidth () < $fixedMoveTab.data("drop-width")+1 ) {
					$fixedMoveTab.find("ul").slideUp();
				}
			}
			 
			return false;
		});
	}

	/* ************************
	* Func : �먮뵒�곌���
	************************ */
	if ($.exists(".editor")) {
		/* �뚯씠釉� �ㅽ겕濡ㅻ꽔湲� */ 
		$(".editor table").each(function  () {
			$(this).wrap("<div class='editor-table-box'></div>");
		});
		
		/* iframe �쒓렇 媛먯떥湲� */ 
		$(".editor *:not('.editor-iframe-box') iframe").each(function  () {
			var iframeSrc = $(this).attr("src");
			var findStr = "https://www.youtube.com/embed"; 

			if (iframeSrc.indexOf(findStr) != -1) {
			  $(this).wrap("<div class='editor-iframe-box'></div>");
			}
		});
	}

	/* diagram */
	magnificPopup ('.diagram-img-box');

	/* �듯빀 �ъ슜�� �섍꼍吏��� */
	/*$(".experience-page .sub-tab-con").each(function  () {
		$slickarrow = $(this).find('.arrow-list');
		$(this).find(".slide-box").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			dots:true,
			speed:1000,
			autoplay: true,
			autoplaySpeed:10000,
			infinite:true,
			pauseOnHover:false,
			appendArrows: $slickarrow,
			prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Prev" tabindex="0" role="button"><i class="xi-long-arrow-left"></i></button>',
			nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="xi-long-arrow-right"></i></button>',
		});
	});*/
	/* �� �щ┃ 由ъ뀑 */
	/*$(".tab-list li a").click(function(){
		$('.slide-box').slick('setPosition');
		return false;
	});*/

	

	/* slide new */
	/*var slide = $('.slide-container');
	var slide2 = $('.inner-slider');

	slide.slick({
		slidesToShow:1,
		dots:true,
		arrows:false,
		autoplay:true,
		autoplaySpeed:10000,
	});

	slide2.slick({
		slidesToShow:1,
		fade:true,
		arrows:false,
		autoplay:true,
		autoplaySpeed:1500,
	});

	�� �щ┃ 由ъ뀑 
	$(".tab-list li a").click(function(){
		$('.slide-container').slick('setPosition');
		return false;
	}); */
	/* �듯빀 �ъ슜�� �섍꼍吏��� */
	$(".experience-page .sub-tab-con").each(function  () {
		$(this).find(".experience-img-slide.only-img").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			dots:false,
			speed: 800,
			autoplay: true,
			autoplaySpeed: 3000,
			infinite:true,
			pauseOnHover:false,
		});
	});
	$(".experience-page .sub-tab-con").each(function  () {
		$(this).find(".experience-img-slide.gif-img").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			dots: true,
			speed: 800,
			autoplay: true,
			autoplaySpeed: 5000,
			infinite:true,
			pauseOnHover:false,
		});
	});
	$(".experience-img-slide.gif-img").each(function  () {
		$(this).find(".experience-gif-slide").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			dots: false,
			speed: 800,
			autoplay: true,
			autoplaySpeed: 500,
			infinite: false,
			pauseOnHover:false,
		});
	});
	
	/* �� �щ┃ 由ъ뀑 */
	$(".tab-list li a").click(function(){
		$('.experience-img-slide.only-img').slick('setPosition');
		$('.experience-img-slide.gif-img').slick('setPosition');
		$('.experience-gif-slide').slick('setPosition');
		return false;
	});
});