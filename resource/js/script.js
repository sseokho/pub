$(function(){
    time();
	ready();


});





function time() {

    

    $('table tbody td:nth-child(4)').addClass("call");
	

	$("button").click(function(event) {
 
        var i = $(this).index();  
        console.log(i);  // 0번째
 
        // good
        var j = $("button").index(this);  // 존재하는 모든 버튼을 기준으로 index
        console.log(j);
        
    });
 


	$(".call").each(function() {
		var idx = $(".call").index(this);
		
		var text = $(".call").eq(idx).text();
		var findString = "20";

		console.log(idx);


		if(text.indexOf(findString) != 0) { /*존재하면 */
			$(".pic").eq(idx).hide();
		}
		
	
	});


	var telValue = $(".ced").val();
	if ( telValue.match("dd")) {
		alert('-을 제거해주세요.');
		return false;
	}



	// var content = $(".prostatus .bn-list-common table tbody td").text()
	
	// // 글자수 세기
	// if(call == '-'){
	// 	alert("존재함")
	// }else{
	// 	alert("존재하지 않음")
	// }
	
}

function ready(){
	
}