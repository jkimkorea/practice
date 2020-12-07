$(function(){
	//주문 내역 확인 클릭시
	$('#btn_orderList').click(function(){
		location.href="/order/orderList";
	});
	//쇼핑 계속하기 클릭시
	$('#btn_main').click(function(){
		location.href="/";
	});
});