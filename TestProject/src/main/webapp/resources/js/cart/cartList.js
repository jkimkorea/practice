/**
 * 
 */
$(function(){
	
	//결제 금액 갱신
	updatePrice();
	//전체 선택 클릭시
	$('#checkAll').on('click',function(){
		$('.check').prop('checked',this.checked);
		updatePrice();
	});
	//체크박스중 선택안된 체크박스 존제시
	$('.check').on('click',function(){
		$('#checkAll').prop('checked',false);
		updatePrice();
	});
	//삭제버튼 클릭시
	$('#deleteCart').click(function(){
		var cart_code=$('#cart_code').val();
		var result=confirm("이 상품을 삭제하겠습니까?");
		if(result){
			
			$.ajax({
				url:'/cart/deleteCart',
				type:'post',
				dataType:'text',
				data:{
					cart_code:cart_code
				},
				success:function(data){
					location.href="/cart/cartList";
				}
			});
		}else{}
	});
	//선택상품 삭제버튼 클릭시
	$('#btn_delete_check').on('click',function(){
		if($('input[name="check"]:checked').length == 0){
			alert("삭제할 상품을 선택해주세요.");
			return;
		}
		var result=confirm("선택한 상품을 삭제하시겠습니까?");
		if(result){
			var checkArr=[];
			
			$('input[name="check"]:checked').each(function(){
				var cart_code = $(this).val();
				alert(cart_code);
				checkArr.push(cart_code);
			});
			$.ajax({
				url:'/cart/deleteChecked',
				type:'post',
				dataType:'text',
				data:{
					  checkArr:checkArr
					 },
				success:function(data){
					location.href='/cart/cartList';
				}
			});
		}else{}
	});
	//상품 주문 수량 변경시
	$('input[type="number"]').on('change',function(){
			cart_amount = $(this).val();
			cart_code = $(this).parent().parent().find('input[name="cart_code"]').val();
			
			$.ajax({
				url:'/cart/changeAmount',
				type:'post',
				dataType:'text',
				data:{
					cart_amount:cart_amount,
					cart_code:cart_code},
				success:function(data){
					
				}
			});
			updatePrice();
	});
	
});
//상품 가격,할인가,최종가격
var updatePrice= function(){
	
	var totalPrice = 0;
	var totalDiscount = 0;
	var subTotal = 0;
	
	$("input[name='check']:checked").each(function(i){
	var cart_code = $(this).val();
	var prd_price= $("input[name='price_"+cart_code+"']").val();
	var cart_amount=$("input[name='cart_amount_"+cart_code+"']").val();

	totalPrice += parseInt(prd_price)*cart_amount;
	totalDiscount += parseInt($("input[name='discount_"+cart_code+"']").val())*cart_amount;
	
	});
	subTotal = parseInt(totalPrice - totalDiscount);
	
	$('#totalPrice').html(numberFormat(totalPrice)+"원");
	$('#totalDiscount').html(numberFormat(totalDiscount)+"원");
	$('#subTotal').html(numberFormat(subTotal)+"원");
	
}
//숫자 콤마 설정
function numberFormat(inputNumber){
	return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");

}