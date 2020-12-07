$(document).ready(function() {
	
	var form = $("#editForm");
	
	// 상품 수정 버튼 클릭 시 
	$("#btn_submit").on("click", function(){
		var result = confirm("수정된 정보를 저장하시겠습니까?");
		
		if(result){
			var mainCategory = $("#mainCategory option:selected");
			var subCategory = $("#subCategory option:selected");
			var prd_name = $("#prd_name");
			var prd_company = $("#prd_company");
			var prd_price = $("#prd_price");
			var prd_discount = $("#prd_discount");
			var ckeditor = CKEDITOR.instances['prd_detail'];
			var prd_detail = $("#prd_detail");
			var prd_stock = $("#prd_stock");
			var pdt_buy = $("#pdt_buy");
			
			
			if(mainCategory.val()==null || mainCategory.val()=="default"){
				alert("1차 카테고리를 선택해주세요.");
				mainCategory.focus();
				return;
				
			} else if(subCategory.val()==null || subCategory.val()=="default"){
				alert("2차 카테고리를 선택해주세요.");
				subCategory.focus();
				return;
				
			} else if(prd_name.val()==null || prd_name.val()==""){
				alert("상품명을 입력해주세요.");
				prd_name.focus();
				return;
				
			} else if(prd_company.val()==null || prd_company.val()==""){
				alert("제조사를 입력해주세요.");
				prd_company.focus();
				return;
				
			}else if(prd_price.val()==null || prd_price.val()==""){
				alert("상품 가격을 입력해주세요.");
				prd_price.focus();
				return;
				
			}else if(prd_discount.val()==null || prd_discount.val()==""){
				alert("할인 가격을 입력해주세요.");
				prd_discount.focus();
				return;
				
			}else if(ckeditor.getData()==null || ckeditor.getData()==""){
				alert("상품 상세 내용을 입력해주세요.");
				ckeditor.focus();	
				return;
				
			}else if(prd_stock.val()==null || prd_stock.val()==""){
				alert("상품 수량을 입력해주세요.");
				prd_stock.focus();
				return;
				
			}else {
				form.submit();
			}
		} else {}
		
	});
	
});

