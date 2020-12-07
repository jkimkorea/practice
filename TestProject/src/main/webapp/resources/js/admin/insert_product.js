$(function(){
    var form=$("#registerForm");
   
	 $("#btn_submit").click(function(){
		
        var result=confirm("상품을 등록하시겠습니까?");

        if(result){
            var mainCategory = $("#mainCategory");
            var subCategory = $("#subCategory");
            var prd_name = $("#prd_name");
            var prd_price = $("#prd_price");
            var prd_company = $("#prd_company");
            var prd_discount = $("#prd_discount");
            var ckeditor = CKEDITOR.instances['prd_detail'];
            var file1 = $("#file1");
            var prd_amount  = $("#prd_stock");
            var prd_buy = $("#prd_buy");
            var fileSize = file1.size;
            var fileFormat = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
            var maxSize = 5*1024*1024;

             //유효성 검사
            if(mainCategory.val()==null||mainCategory.val()=="default"){
                alert("1차 카테고리를 선택해주세요.");
                mainCategory.focus();
                return;
            }else if(subCategory.val()==null||subCategory.val()=="default"){
                alert("2차 카테고리를 선택해주세요.");
                subCategory.focus();
                return;
            }else if(prd_name.val()==null||prd_name.val()==""){
                alert("상품명을 입력해주세요.");
                prd_name.focus();
                return;
            } else if(prd_price.val()==null||prd_price.val()==""){
                alert("상품가격을 입력해주세요.");
                prd_price.focus();
                return;
            }else if(prd_company.val()==null||prd_company.val()==""){
                alert("제조사를 입력해주세요.");
                prd_company.focus();
                return;
            }else if(prd_discount.val()==null||prd_discount.val()==""){
                alert("할인율을 입력해주세요.");
                prd_discount.focus();
                return;
            }else if(ckeditor.getData()==null||ckeditor.getData()==""){
                alert("상품 상세를 입력해주세요.");
                ckeditor.focus();
                return;
            }else if(file1.val()==null||file1.val()==""){
                alert("이미지 파일을 추가해주세요.");
                file1.focus();
                return;
            }else if(!file1.val().match(fileFormat)){
                alert("이미지 파일만 업로드 가능합니다.");
                file1.focus();
                return;
            }else if(fileSize>maxSize){
                alert("파일 사이즈는 5MB까지만 가능합니다.");
                prd_amount.focus();
                return;
            }else if(prd_amount.val()==null||prd_amount.val()==""){
                alert("상품 수량을 입력해주세요.");
                prd_amount.focus();
                return;
            }else{
                form.submit();
            }
        }
    });
});