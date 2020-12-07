/**
 * 장바구니 -> 구매
 */
$(function(){
	//결제 금액 갱신
	updatePrice();
	//전부 체크 클릭시
	$('#checkAll').on('click',function(){
		$('.check').prop('checked',this.checked);
	});
	//체크박스 중 어느하나라도 선택 취소시
	$('.check').on('click',function(){
		$('#checkAll').prop('checked',false);
	});
	//선택 상품 삭제 클릭시
	$('#btn_delete_check').on('click',function(){
		var prd_no = $('input[name="check"]:checked').val();
		
		if(prd_no.length == 0){
			alert("삭제할 상품을 선택해 주세요.");
			return;
		}
		var result = confirm("선택한 상품을 삭제하시겠습니까?");
		if(result){
			$('input[name="check"]:checked').each(function(i){
				var prd_no = $(this).val();
				$('#productVO_'+prd_no).remove();
				updatePrice();
			});
			if($('#ordertbl > tbody tr').length == 0){
				$('#thead').append("<tr><td colspan= '7' style='padding:20px 0px;'><span>구매할 상품이 존재하지 않습니다.</span></td></tr>")
			}else{}
		}
	});
	//결제하기 버튼 클릭시
	$('#btn_submit').on('click',function(){
		if('#ordertbl > tbody tr'==0){
			alert("결제할 상품이 없습니다.\n상품을 골라주세요.");
			location.href='/';
			return;
		}else{
			$('#orderForm').submit();
		}
	});
});
//결제금액, 할인금액 
var updatePrice = function(){
	
	var totalPrice = 0;
	var totalDiscount = 0;
	var payPrice = 0;
	
	$('.productRow').each(function(index,item){
		var price = $(this).find('input[name="price"]').val();
		var discount = $(this).find('input[name="discount"]').val();
		var cart_amount = $(this).find('input[name="cart_amount"]').val();
		totalPrice += price * cart_amount;
		totalDiscount += discount * cart_amount;
		payPrice = totalPrice - totalDiscount;
	});
		
	$('#totalPrice').html(numberFormat(totalPrice)+"원");
	$('#totalDiscount').html(numberFormat(totalDiscount)+"원");
	$('#ord_total_price').html(numberFormat(payPrice)+"원");
	$('#ord_totalprice').val(payPrice);
};
//숫자 표현식
function numberFormat(inputNumber){
	return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}