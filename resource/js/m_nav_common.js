/* *******************************************************
 * filename : common.js
 * description : 전체적으로 사용되는 JS
 * Update : 2022-08-04
******************************************************** */

var laptopWidth = 1366;
var tabletWidth = 1280; // 헤더가 변경되는 시점
var mobileWidth = 800;
startOffset = isMobile() ? "100%" : "70%";
gsap.registerPlugin(ScrollToPlugin);

// default
checkOsBrowser();	
mouseCheck();
translateSkipNav();
triggerScrollObject();
topFixedHeader();
setTopButton();
if ( detectBrowser() === "ie") {
	popupUpdateBrowser();
	convertToEdge();
}

// add
Splitting();
setSplitting();
// if ( !$.exists('#fullpage') ){ smoothScroll(); }
if ( $.exists(".footer-sitemap-list-con") ) { cloneFooterSitemap(); }
if ( $.exists('.footer-partner-list') ) { rollingFooterPartnerList(); }

$(window).on("load",function  () {
	// toAnchorParameter("anchor");	/* 주소~?anchor=content  */
});

$(window).on("resize",function  () {
	checkOsBrowser();
});

/* ************************
* Func : 브라우저 체크 및 기기체크
* isMobile() 필요
************************ */
function checkOsBrowser () {
	if ( isMobile() ) {
		$("html").removeClass("is-pc").addClass("is-mobile").addClass(detectOS()+"-os");
	}else {
		$("html").removeClass("is-mobile").addClass("is-pc").addClass(detectBrowser()+"-browser");
	}
}

/* ************************
* Func : 스킵네비게이션 영문번역
************************ */
function translateSkipNav () {
	if ( $("html").attr("lang") != "ko" ) {
		$(".cm-accessibility a").text("Skip to content");
	}
}

/* ************************
* Func : 웹접근성 키보드이용시
************************ */
function mouseCheck () {
	if ( !isMobile() ) { 
		$("body").mousemove(function(event) { 
			$(this).addClass("mouse");
		});
		$("body").on("keydown touchstart",function(event) { 
			$(this).removeClass("mouse");
		});
	}
}

/* ************************
* Func : 스크롤시 Trigger Class
* Waypoint.js, isMobile () 필요
************************ */
function triggerScrollObject () {
	$("[data-scroll]").each(function() {
		var $scrollElem = $(this);
		var scrollElemOffset = $(this).data("scroll-offset") ? $(this).data("scroll-offset") : startOffset;
		$scrollElem.waypoint(function(direction) {
			if ( direction === "down" ) {
				$scrollElem.addClass('animated');
			}else if ( direction === "up") {
				//$scrollElem.removeClass('animated');
			}
		},
		{
			triggerOnce: false,
			offset: scrollElemOffset
		});
	});
}

/* ************************
* Func : 드롭메뉴 공통
* getWindowWidth () 필요
************************ */
$(".cm-drop-menu-box-JS").each(function  () {
	var $dropBox = $(this);
	var $dropOpenBtn = $(this).find(".cm-drop-open-btn-JS");
	var $dropList = $(this).find(".cm-drop-list-JS");
	var eventState = $dropBox.data("drop-event");
	
	if ( eventState === "click" ) {
		$dropOpenBtn.click(function  () {
			$dropList.slideToggle(500);
			$dropBox.toggleClass("open");
			$dropBox.on("mouseleave", function  () {
				dropClose ();
			});
			return false;
		});
		$("body").click(function  () {
			dropClose();
		});
	}else if ( eventState === "hover" ) {
		$dropBox.hover(function  () {
			$dropList.slideDown(500);
			$dropBox.addClass("open");
		},function  () {
			dropClose ();
		});
	}
	function dropClose () {
		if ( $dropBox.data("drop-width") ) {
			if ( getWindowWidth () < $dropBox.data("drop-width")+1 ) {
				$dropList.slideUp(500);
				$dropBox.removeClass("open");
			}
		}else {
			$dropList.slideUp(500);
			$dropBox.removeClass("open");
		}
	}
	$(window).resize(function  () {
		if ( getWindowWidth () > $dropBox.data("drop-width") ) {
			$dropList.removeAttr("style");
		}else {
			$dropList.hide();
		}
	});
});

/* ************************
* Func : 탭 메뉴 공통 사용
* getWindowWidth () 필요
************************ */
$(".cm-tab-container-JS").each(function  () {
	var $cmTabList = $(this).find(".cm-tab-list-JS");
	var $cmTabListli = $cmTabList.find("li");
	var $cmConWrapper = $(this).children(".cm-tab-content-wrapper-JS");
	var $cmContent = $cmConWrapper.children();
	
	
	// 탭 영역 숨기고 selected 클래스가 있는 영역만 보이게
	var $selectCon = $cmTabList.find("li.selected").find("a").attr("href");
	var selectTxt = $cmTabList.find("li.selected").find("em").text();
	$cmContent.hide();
	$($selectCon).show();

	$cmTabListli.children("a").click(function  () {
		if ( !$(this).parent().hasClass("selected")) {
			var visibleCon = $(this).attr("href");
			$cmTabListli.removeClass("selected");
			$(this).parent("li").addClass("selected");
			$cmContent.hide();
			$(visibleCon).fadeIn();
		}
		return false;
	});

	// 모바일 버튼이 있을때 추가
	var $cmTabMobileBtn = $(this).find(".cm-tab-select-btn-JS");
	if ($.exists($cmTabMobileBtn)) {
		$cmTabMobileBtn.find("span").text(selectTxt);
		// Mobile Btn Click
		$cmTabMobileBtn.click(function  () {
			$(this).toggleClass("open").siblings().slideToggle();
			return false;
		});

		// Mobile List Click
		$cmTabListli.children("a").click(function  () {
			$cmTabMobileBtn.find("span").text($(this).find("em").text());
			tabListClose();
		});
		$("body").click(function  () {
			tabListClose();
		});
		function tabListClose () {
			if ( getWindowWidth () < 801 ) {
				$cmTabMobileBtn.removeClass("open").siblings().slideUp();
			}
		}
		$(window).resize(function  () {
			if ( getWindowWidth () > 800 ) {
				$cmTabMobileBtn.siblings().removeAttr("style");
			}else {
				$cmTabMobileBtn.siblings().hide()//.css("display","none");
			}
		});
	}
});

/* ************************
* Func : 단어 Splitting Plugin 
* Splitting.js 필요
************************ */	
function setSplitting () {
	// Splitting Char Set Delay
	var $splittingTxt = $(".cm-word-split-JS");
	$($splittingTxt).each(function  () {
		splittingTextDelay($(this),$(this).data("speed"),$(this).data("speed-delay"));
	});

	// Splitting word 번역기능 비활성화
	$(".splitting .char").attr("translate","no");
}

/* ************************
* Func : 상단 :: 모바일버전에서 헤더 FIXED
* getWindowWidth (), objectFixed() 필요
************************ */	
function topFixedHeader () {
	checkWidth = getWindowWidth();
	$(window).on("scroll", function  () {
		toggleFixedClass();
	});
	$(window).on("resize", function  () {
		checkWidth = getWindowWidth();
		toggleFixedClass();
	});
}
function toggleFixedClass () {
	if ( checkWidth < (tabletWidth-1) ) {
		objectFixed($("#header"), 0, "top-fixed");
	}else {
		$("#header").removeClass("top-fixed");
	}
}

/* ************************
* Func : 상단 :: 검색 toggle
************************ */	
$(".header-search-box").each(function  () {
	var $searchBox = $(this);
	var $openBtn = $(this).find(".header-search-open-btn");
	var $closeBtn = $(this).find(".header-search-close-btn");
	
	$openBtn.click(function  () {
		$searchBox.addClass("open");
	});
	$closeBtn.click(function  () {
		$searchBox.removeClass("open");
	});
});


/* ************************
* Func : 상단 :: 사이트맵 toggle
************************ */
/* -------- 대메뉴복사 후 사이트맵 삽입 -------- */
$(".sitemap-wrapper-style").append("<ul></ul>");

for(var i=0; i < gnbLength; i++){
	var gnbText = $gnbItem.eq(i).children("a").text();
	var gnb2depList = $gnbItem.eq(i).find(".gnb-2dep > ul").html() ? $gnbItem.eq(i).find(".gnb-2dep > ul").html() :	'';
	$(".sitemap-wrapper-style > ul").append('<li><span class="num">0'+(i+1)+'</span><h2>'+gnbText+'</h2><ul class="sitemap-2dep">'+gnb2depList+'</ul></li>');
}

/* -------- 사이트맵 스타일 03, 04, 05 -------- */
var $openSitemapBtn = $(".cm-sitemap-open-btn");
var $closeSitemapBtn = $(".cm-sitemap-close-btn");
var $cmSitemapWrapper = $(".cm-sitemap-wrapper");
var sitemapOpenState = false;
// Split
if ($.exists('#siteMapCon02') || $.exists('#siteMapCon03')) {
	var sitemap_item_tit = document.querySelectorAll(".sitemap-wrapper-style > ul > li > h2");
	var sitemap_item = document.querySelectorAll(".sitemap-wrapper-style > ul > li span");
	Splitting({ target: sitemap_item_tit });
	Splitting({ target: sitemap_item });
}

// Sitemap OPEN
$openSitemapBtn.click(function  () {
	if ( !sitemapOpenState ) {
		htmlScrollControl (true);
		$cmSitemapWrapper.addClass("open");
		sitemapOpenState = true;
	}
	return false;
});
// Sitemap CLOSE
$closeSitemapBtn.click(function  () {
	close_cm_sitemap();
});
$(document).keydown(function(event) {
	if ( event.keyCode == 27 || event.which == 27 ) {
		close_cm_sitemap();
	}
});

function close_cm_sitemap () {
	if ( sitemapOpenState ) {
		if ( $cmSitemapWrapper.is("#siteMapCon02") ) { // Sitemap 02 Close
			$cmSitemapWrapper.removeClass("open");
			setTimeout(function  () {
				htmlScrollControl (false);
				sitemapOpenState = false;
			},1000);
		}else {
			gsap.to($cmSitemapWrapper, 0.3, {opacity:0, ease: Sine.easeOut, onComplete : function  () {
				$cmSitemapWrapper.removeClass("open");
				$cmSitemapWrapper.removeAttr("style");
				htmlScrollControl (false);
				sitemapOpenState = false;
			}})
		}
	}
}

/* ************************
* Func : 하단 :: top버튼
* moveScrollTop (), objectFixed() 필요
************************ */
function setTopButton () {
	$(".to-top-btn").each(function  () {
		// top버튼 나오게 (필요한 경우에만 넣으세요)
		if ( $(this).length > 0 ) {
			$(window).scroll(function  () {
				objectFixed($(".to-top-btn"), 0, "bottom-fixed");
			});
		}
		// top버튼 클릭
		$(this).on("click",function  () {
			if ($.exists('#fullpage')) {
				$.fn.fullpage.moveTo(1);
			}else {
				$("html, body").animate({scrollTop:0}, 300 ,"easeInOutExpo",function  () {
					$(".logo > a").focus();
				});
			}
			return false;
		});
	});
}

/* ************************
* Func : 하단 :: 파트너사 리스트
************************ */
function rollingFooterPartnerList () {
	$('.footer-partner-list').slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		dots:false,
		autoplay: true,
		speed:500,
		infinite:true,
		autoplaySpeed: 3000,
		easing: 'easeInOutQuint',
		pauseOnHover:false,
		prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Prev" tabindex="0" role="button"><i class="xi-angle-left-min"></i></button>',
		nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="xi-angle-right-min"></i></button>',
		responsive: [
					{
					  breakpoint: 1367,
					  settings: {
						slidesToShow: 5
					  }
					},
					{
					  breakpoint: 1025,
					  settings: {
						slidesToShow: 3
					  }
					}
				  ]
	});
}

/* ************************
* Func : 하단 :: 푸터 사이트맵 삽입(대메뉴복사)
************************ */
function cloneFooterSitemap () {
	$(".footer-sitemap-list-con").append("<ul></ul>");
	
	for(var i=0; i < gnbLength; i++){
		var $gnb1depItem = $gnbItem.eq(i).children("a");
		var $gnb2depList = $gnbItem.eq(i).find(".gnb-2dep > ul").html() ? $gnbItem.eq(i).find(".gnb-2dep > ul").html() :	'<a href="'+$gnb1depItem.attr("href")+'">'+$gnb1depItem.text()+'</a>';
		$(".footer-sitemap-list-con > ul").append('<li><h3>'+$gnb1depItem.text()+'</h3><ul class="sitemap-2dep">'+$gnb2depList+'</ul></li>');
	}
}

/* ************************
* Func : Custom Select 
************************ */
if ($.exists('.custom-select-box .custom-select')) {
	$(".custom-select-box .custom-select").each(function() {
		var classes = $(this).attr("class");
		var id = $(this).attr("id");
		var name = $(this).attr("name"); 
		var placeholder = $(this).attr("placeholder") ? $(this).attr("placeholder") : $(this).find("option:selected").text();
		var template = '<div class="' + classes + '">';
		template += '<span class="custom-select-trigger">' + placeholder + "</span>";
		template += '<ul class="custom-option-drop-list">';
		$(this).find("option").each(function() {
			var first_select = $(this).is(":selected") ? " selection" : "";
			template += '<li class="custom-option-item'+ first_select +'" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</li>";
		});
		template += "</ul></div>";
		$(this).wrap('<div class="custom-select-wrapper"></div>');
		$(this).hide();
		$(this).after(template);
	});
	$(".custom-option:first-of-type").hover(function() {
		$(this).parents(".custom-option-drop-list").addClass("option-hover");
	}, function() {
		$(this).parents(".custom-option-drop-list").removeClass("option-hover");
	});
	$(".custom-select-trigger").on("click", function(event) {
		$("html").one("click", function() {
			$(".custom-select").removeClass("opened");
			$(".custom-option-drop-list").slideUp();
		});
		$(this).parents(".custom-select").toggleClass("opened");
		$(this).siblings(".custom-option-drop-list").slideToggle();
		event.stopPropagation();
	});
	$(".custom-option-item").on("click", function() {
		$(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
		$(this).parents(".custom-option-drop-list").find(".custom-option-item").removeClass("selection");
		$(this).addClass("selection");
		$(this).parents(".custom-select").removeClass("opened");
		$(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
		// 이메일 선택할때 넣어주세요.
		/* if ($(this).data("value") != "a" && $(this).data("value") != "b") {
			$(".email2").attr("value", $(this).text()).prop("readonly", true);
		} else {
			$(".email2").attr("value", "").prop("readonly", false).focus();
		} */
	});
}

/* *********************** 헤더 서브 메뉴 Up & Down ************************ */
// 메뉴 
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0; //$('#header').outerHeight();

$(window).scroll(function(event){
	didScroll = true;
});

setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);

function hasScrolled() {
	var st = $(this).scrollTop();
	
	// Make sure they scroll more than delta
	if(Math.abs(lastScrollTop - st) <= delta)
		return;
	
	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight){
		// Scroll Down
		$('#header').addClass('hidden');
		if ($("#header").hasClass("up")) {	
			$('#header').removeClass('up');
		}

	} else {
		// Scroll Up
		if(st + $(window).height() < $(document).height()) {
			if (!($("#header").hasClass("up"))) {	
				$('#header').addClass('up').removeClass("hidden");
			}
			if (st < 10) {
				if ($("#header").hasClass("up")) {	
					$('#header').removeClass('up')
				}
			}
		}
	}
	
	lastScrollTop = st;
}

$(document).ready(function  () {
	$(".cm-inquiry-item").on("focus click keydown", function(event){
		if (!($(this).hasClass("on"))) {
			$(".cm-inquiry-item").removeClass("on").find(".input-box").hide();
			$(this).addClass("on");
			$(this).find(".input-box").show();
			$(this).find(".cm-inquiry-input").focus();
		}
	});

	$(".cm-inquiry-item").on("focusout", function  () {
		if ($(this).find(".cm-inquiry-input").val()) {
			var inputVal = $(this).find(".cm-inquiry-input").val();
			$(this).find(".change-txt").text(inputVal);
			$(this).addClass("value");
			$(this).find(".input-box").hide();
		}else {
			$(this).find(".txt").show();
			$(this).removeClass("value");
			$(this).find(".change-txt").empty().removeClass("value");
		}
	});

	$(".cm-inquiry-text").on("focus click" , function  () {
		$(this).addClass("on");
		$(this).find(".write-textarea").focus();
	});
	
	$(".cm-inquiry-text textarea").on("focusout" , function  () {
		$(this).parents("li").removeClass("on");
	});

	$("html").on("click", function(e){	
		if(!$(e.target).hasClass("input-trigger") && !$(e.target).hasClass("cm-inquiry-input")){	
			$(".cm-inquiry-item").removeClass("on");
			$(".cm-inquiry-item").find(".input-box").hide();
		}
	});
});