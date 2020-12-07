/**
 * 
 */
var replyPage = 1;
$(function(){
	//add to cart클릭시
	$('#btn_addCart').click(function(){
		var prd_no=$('#prd_no').val();
		var cart_amount=$('#ord_amount').val();
		
		$.ajax({
			url:'/cart/addToCart',
			type:'post',
			dataType:'text',
			data:{
				prd_no:prd_no,
				cart_amount:cart_amount
			},
			success:function(data){
				if(data == "SUCCESS")
					var result = confirm("장바구니에 추가되었습니다.\n지금 확인 하시겠습니까?");
					if(result){
						location.href="/cart/cartList";
					}else{
						location.href="/member/loginPage";
					}
			}
		});
		
	});
	//별점 선택시
	$('#star_grade a').on('click',function(){
		$(this).parent().children('a').removeClass('on');
		$(this).addClass('on').prevAll('a').addClass('on');
		return false;
	});
	//상품 후기 쓰기 클릭시
	$('#btn_write_review').on('click',function(){
		var rev_score = 0;
		var rev_cont=$('#reviewContent').val();
		var prd_no=$('#prd_no').val();
		
		$('#star_grade a').each(function(i,e){
			if($(this).attr('class')=='on'){
			rev_score += 1;
			}
		});
		if(rev_score==0){
			alert("별점을 선택해주세요.");
			return;
		}else if(rev_cont==""||rev_cont==null){
			alert("리뷰를 적어주세요.")
			return;
		}
		
		$.ajax({
			url:'/review/write',
			type:'post',
			dataType:'text',
			data:{
				rev_score:rev_score,
				rev_cont:rev_cont,
				prd_no:prd_no
				},
			success:function(data){
				if(data == "SUCCESS"){
					$('#star_grade a').parent().children('a').removeClass('on');
					$('#reviewContent').val('');
					alert("리뷰가 작성되었습니다.");
					replyPage = 1;
					getPage('/review/'+prd_no+'/1');
				}else if(data == "FAIL"){
					alert("로그인이 필요한 작업입니다.");
					location.href="/member/loginPage";
				}
			}
		});
	});
	//리뷰 보기 클릭시
	$('#repliesDiv').on('click',function(){
		var prd_no = $('#prd_no').val();
		
		if($('.timeline li').length > 2){
			$('.replyLi').remove();
			$('.noReview').hide();
			$('.pagination li').remove();
			return;
		}
		getPage('/review/'+prd_no+'/1');
	});
	//리뷰 페이지 이동
	$('.pagination').on('click','li a',function(event){
		var prd_no = $('#prd_no').val();
		event.preventDefault();
		reviewPage = $(this).attr('href');
		getPage('/review/'+prd_no+'/'+reviewPage);
	});
	//EDIT 클릭시
	$('.timeline').on('click','.replyLi',function(event){
		var reply = $(this);
		var rev_no = $(this).attr('data-rev_no');
		var score = $(this).find('.rev_score').text();
		
		$('#star_grade_modal a').each(function(index,item){
			if(index < score){
				$(item).addClass('on');
			}else{
				$(item).removeClass('on');
			}
		});
		$('#replytext').val(reply.find('#rev_cont').text());
		$('.modal-body').attr('data-rev_no',rev_no);
	});	
	//modal창에서 별점 클릭시
	$('#star_grade_modal a').click(function(){
		$(this).parent().children('a').removeClass('on');
		$(this).addClass('on').prevAll('a').addClass('on');
		return false;
	});
	//modal창에서 modify클릭시
	$('#btn_modal_modify ').on('click',function(){
		var rev_no= $('.modal-body').attr('data-rev_no');
		var rev_cont= $('#replytext').val();
		var prd_no= $('#prd_no').val();
		var rev_score = 0;
		$('#star_grade_modal a').each(function(i,e){
			if($(this).attr('class')=='on'){
			rev_score += 1;
			}
		});
		$.ajax({
			url:'/review/modify',
			type:'post',
			dataType:'text',
			data:{
				rev_no:rev_no,
				rev_cont:rev_cont,
				rev_score:rev_score
			},
			success:function(data){
				alert("수정 되었습니다.");
				getPage('/review/'+prd_no+'/'+replyPage);
			}
		});
	});
	//QnA글쓰기 클릭시 
	$("#btn_write_qna").click(function(){
		printBoard($("#writeQna_location"),$("#qnaTemplate"));
	});
	//QnA글쓰기 확인 클릭시
	$("div#writeQna_location").on("click","#btn_writeQnaOk",function(){
		var title = $("input[name='title']").val();
		var comment = $("textarea[name='comment']").val();
		var prd_no = $("input[name='prd_no']").val();
		var cg_code=null;

		$.ajax({
			url:'/qna/qnaAdd',
			type:'post',
			dataType:'text',
			data:{
				qna_title:title,
				qna_content:comment,
				prd_no:prd_no
			},
			success:function(data){
				if(data=="ok"){location.href="/product/readProduct?prd_no="+prd_no+"&cg_code="+cg_code;
				}else if(data =="null"){
					alert("로그인이 필요한 작업입니다.");
					location.href="/member/loginPage";
				}
			}
		});		
	});
	
});
//QnA글쓰기 클릭시 작동함수
var printBoard = function(target,qnaTemplate){
	var templateObj = Handlebars.compile(qnaTemplate.html());
	target.append(templateObj);
}
//리뷰 보여주는 템플릿 적용함수 생성
var printReview = function(data,target,templateObj){	
	var template=Handlebars.compile(templateObj.html());
	var html=template(data);
	$('.replyLi').remove();
	$('#noReview').hide();
	target.after(html);
};
//리뷰가 없을때 적용함수 생성
var printNoReview = function(){
	$('.replyLi').remove();
	$('#noReview').show();
};
//리뷰 페이징용 함수 생성
var printPaging = function(pageMaker,target){
	var str = "";
	if(pageMaker.prev){
		str +="<li><a class='page-link' href='"+(pageMaker.startPage -1)+"'> << </a></li>'";
	}
	for(var i = pageMaker.startPage, e = pageMaker.endPage; i <= e ; i++){
		var strClass = pageMaker.cri.page == i? 'class=active' : '';
		str += "<li class='page-item' " + strClass + "><a class='page-link' href='"+ i + "'>" + i + "</a></li>";
	}
	if(pageMaker.next){
		str +="<li><a class='page-link' href='" +(pageMaker.endPage +1) + "'> >> </a></li>";
	}
	target.html(str);
};
//리뷰 뿌려주는 작업함수 생성
function getPage(reviewInfo){
	$.getJSON(reviewInfo,function(data){
		
		if(data.list.length >0){
			
			printReview(data.list,$("#repliesDiv"),$("#template"))
			printPaging(data.pageMaker,$(".pagination"));
			
			$('#modifyModal').modal('hide');
			$('#replycntSmall').html("["+data.pageMaker.totalCount+"]");
		}else{
			printNoReview();
			$("#replycntSmall").html("[ 0 ]");
		}
	});
	};
//리뷰 삭제 클릭시
var deleteReview = function(rev_no,prd_no){
	var result= confirm("이 리뷰를 삭제하시겠습니까?");
	if(result){
		$.ajax({
			url:'/review/'+rev_no+'/'+prd_no,
			type:'delete',
			dataType:'text',
			data:{
				  rev_no:rev_no,
				  prd_no:prd_no
				 },
			success:function(data){
				alert("해당 상품 리뷰가 삭제되었습니다.");
				var prd_no= $('#prd_no').val();
				getPage('/review/'+prd_no+'/'+replyPage);
			}
		});
	}else{}
};

