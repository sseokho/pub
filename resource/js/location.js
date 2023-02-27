
$(function(){
	
	//breadcrumb
	$(".category>li>a").click(function(){
		$(this).next().slideToggle();
		$(this).toggleClass("active");
	});
})

