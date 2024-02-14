/* *******************************************************
 * filename : layer_popup.js
 * description : 모달레이어를 띄울때 사용되는 ajax JS
 * date : 2022-03-14
******************************************************** */


// Modal Open
$(document).on("click",".cm-modal-open-btn",function  () {
	ajaxLoad($(this).attr("href"));
	return false;
});

 /* ************************
  * Modal 영역 생성
  ************************ */
function addModalLayer () {
	var modalHtml = '';
    modalHtml += '<article class="modal-fixed-pop-wrapper">';
    modalHtml += '<div class="modal-loading"><span class="loading"></span></div>';
    modalHtml += '<div class="modal-fixed-pop-inner">';
    modalHtml += '<div class="modal-inner-box">';
    modalHtml += '<div class="modal-inner-content">';
    modalHtml += '</div>';
    modalHtml += '</div>';
    modalHtml += '</div>';
    modalHtml += '</div>';
    modalHtml += '</article>';

    $('body').append(modalHtml);
}

 /* ************************
  * Ajax Load
  * @param strUrl : 모달레이어팝업 주소
  ************************ */
// Ajax Load
function ajaxLoad(strUrl){
	addModalLayer();
	var $modalWrap = $(".modal-fixed-pop-wrapper");
	$modalWrap.fadeIn();
	htmlScrollControl (true);
	$.ajax({
		type: "POST",
		url: strUrl,
		data: "",
		success: function(resultText){
			$modalWrap.find(".modal-inner-content").html(resultText).find(".modal-close-btn").focus();
			$(document).keydown(function(event) {
				if ( event.keyCode == 27 || event.which == 27 ) {
					if ( $modalWrap.css("display") == "block" ) {
						ajaxUnLoad();
					}
				}
			});
		},
		error: function() {
			if ( $("html").attr("lang") == "ko" ) {
				alert("호출에 실패하였습니다.");
			}else {
				alert("Please try again.");
			}

			$(".modal-fixed-pop-wrapper").hide();
			htmlScrollControl (false);
		},
		beforeSend:function(){ 
			$('.modal-loading').show(); 
		},
		complete:function(){ 
			$('.modal-loading').hide();
		}
	});
}
// 변경전 함수명(오류를 막기위해 사용)
function layerLoad (strUrl) {
	ajaxLoad(strUrl);
}

 /* ************************
  * Ajax UnLoad
  * Modal Layer Popup Close
  * 닫기버튼, 취소버튼 등에 onclick="ajaxUnLoad();"
  ************************ */
function ajaxUnLoad () {
	htmlScrollControl (false);
	$(".modal-fixed-pop-wrapper").fadeOut(10, function  () {
		$(this).remove();
	});
}