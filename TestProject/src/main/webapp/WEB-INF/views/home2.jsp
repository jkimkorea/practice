<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Shop HomePage - Start Bootstrap Template</title>
	
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
 <script>
function openWindow(){
		var url= "/country";  
		var winWidth = 300;
	    var winHeight = 300;
	    var popupOption= "width="+winWidth+", height="+winHeight;    
		window.open(url,"",popupOption);
}
$(function(){

})
</script>
 <style>
.table1 {  
  border: 1px solid #ddd;
  text-align: left;
}

.table1,td1{
  border-collapse: collapse;
  width: 20%;
}

.table1, td1 {
  padding: 15px;
}
</style>
<script>
function openWindow(){
		var url= "/country";  
		var winWidth = 300;
	    var winHeight = 300;
	    var popupOption= "width="+winWidth+", height="+winHeight;    
		window.open(url,"",popupOption);
}
$(function(){
	
	
	$("#btn_delete_check").on("click",function(){
		var busi_num=$("input[name='busi_num']").val();
		alert(busi_num);
		$.ajax({
			url:'/custom/delete',
			type:'post',
			dataType:'text',
			data:{
				busi_num:busi_num
			},
			success:function(data){
				alert("삭제되었습니다.");
				location.href="/";
			}
		});
	});
	
});

</script>
</head>

<body>

  <!-- Page Content -->
  <div class="container">

    <div class="row">

      <div class="col-lg-5">
			 <span class="counter pull-right"></span>
			 <h3>[실기TEST]거래처 관리</h3>
			 <div style="box-sizing: content-box; width: 300px; height: 50px; padding: 30px;  border: 1px solid black;">
			 <form class="form1" action="/custom/search" method="get">
			 	사업자 번호 <input type="text" id="busi_num" name="busi_num"><br>
			 	거래처명<input type="text" id="custom" name="custom">
			 	<button type="submit" id="btn_search"  class="btn btn-info" >조회</button>
			 </form>
			 </div>
			 <span></span>
			<div class="container">
			  <br>          
			  <table class="table table-bordered" style="border: 1px solid black; width:420px; hight:200px;">
			    <thead>
			      <tr>
			        <th>사업자 번호</th>
			        <th>거래처명</th>
			      </tr>
			    </thead>
			    <c:forEach items="${list}" var="list">
			    <tbody>
			      <tr>
			        <td><a href="/custom/search_by_busi_num?busi_num=${list.busi_num}">${list.busi_num}</a></td>
			        <td>${list.custom}</td>
			      </tr>
			    </tbody>
			  </c:forEach>
			  </table>
			</div>
      </div>
      <!-- /.col-lg-3 -->

      <div class="col-lg-7">
				
		<form action="/custom/update" method="post">		
			<div class="btn-container" style="display: inline-block; float: right; margin:20px 10px 5px 5px;">
					<button type = "submit" id="btn_update"  class="btn btn-info" >저장</button>
					<button id="btn_delete_check"  class="btn btn-info" >삭제</button>
					<a href="/">home</a>
			</div>	
			<div class="container" style="width: 800px; padding: 10% 5%;">
			    <table board="5">
			        <tr>
			            <td style="width:100px">
			                <label for="busi_num">사업자번호</label>
			            </td>  
			            <td>
			                <input type="text" id="busi_num" name="busi_num" value="${vo.busi_num}">
			            </td> 
			            <td style="width:100px">
			                <label for="short">약칭</label>
			            </td>  
			            <td>
			                <input type="text" id="short_" name="short_"value="${vo.short_}">
			            </td>         
			        </tr>
			        <tr>
			            <td>
			                <label for="custom">거래처명</label> 
			            </td>
			             <td>
			                <input type="text" id="custom" name="custom"value="${vo.custom}">
			            </td> 
			        </tr>
			        <tr>
			           <td>
							<label for="ceo">대표자</label> 
			            </td>
			            <td>
			                <input type="text" id="ceo" name="ceo" value="${vo.ceo}">
			            </td> 
			             <td>
							<label for="charge_person">담당자</label> 
			            </td>
			            <td>
			                <input type="text" id="charge_person" name="charge_person" value="${vo.charge_person}">
			            </td> 
			        </tr>
			        <tr>
			            <td>
			                <label for="busi_condition">업태</label>
			            </td>
			            <td>
			                <input type="text" id="busi_condition" name="busi_condition" value="${vo.busi_condition}">
			            </td>
			              <td>
			                <label for="item">종목</label>
			            </td>
			            <td>
			                <input type="text" id="item" name="item" value="${vo.item}">
			            </td>
			        </tr>
			        <tr>
			            <td>
			                <label for="sample2_postcode">우편번호</label>
			            </td>
			               <td>
			        		<input type="text" id="sample2_postcode" name="post_num" class="form-control" value="${vo.post_num}"
									style="max-width: 150px; width:calc(100% - 128px); margin-right: 5px; display: inline-block;" placeholder="우편번호" readonly>
			                <input type="button" onclick="sample2_execDaumPostcode()" id="btn_postCode" class="btn btn-default" style="background-color:gray" value="검색"><br>
			             </td>
			        </tr>
				    <tr>
						<td>
			                <label for="sample2_address">주소1</label>
			            </td>
			            <td>
							<input type="text" id="sample2_address" name="addr1" class="form-control" 
									placeholder="주소" style="max-width: 830px; margin:3px 0px;" readonly value="${vo.addr1}">
							
							<input type="hidden" id="sample2_extraAddress" class="form-control">
			            </td>
			        </tr>
			        <tr>
			            <td>
			                <label for="sample2_detailAddress">주소2</label>
			            </td>
			            <td>
			            	<input type="text" id="sample2_detailAddress" name="addr2" class="form-control" 
									value="${vo.addr2}" style="max-width: 830px;">
			            </td>
			        </tr>
			        <tr>
			            <td>
			                <label for="tel">전화번호</label>
			            </td>
			            <td>
			                <input type="text" id="tel" name="tel" value="${vo.tel}">
			            </td> 
			             <td>
			                <label for="fax">펙스번호</label>
			            </td>
			            <td>
			                <input type="text" id="fax" name="fax" value="${vo.fax}">
			            </td> 
			        </tr>
			        <tr>
			            <td>
			                <label for="homepage">홈페이지</label>
			            </td>
			            <td>
			                <input type="text" id="homepage" name="homepage" value="${vo.homepage}">
			            </td> 
			        </tr>
			        <tr>
			            <td>
			                <label  for="">법인여부</label>
			            </td>
			            <td>
			               <label class="radio-inline"><input class="radio" type="radio" name="co_yn" value="c" <c:out value="${vo.co_yn == 'c'?'checked':'' }"/>>법인</label>
			               <label class="radio-inline"><input class="radio" type="radio" name="co_yn" value="p" <c:out value="${vo.co_yn == 'p'?'checked':'' }"/>>개인</label>
			            </td> 
			            <td>
			                <label  for="">해외여부</label>
			            </td>
			            <td>
			               <label class="radio-inline"><input class="radio" type="radio" name="foreign_yn" value="d"<c:out value="${vo.foreign_yn == 'd'?'checked':'' }"/>>국내</label>
			               <label class="radio-inline"><input class="radio" type="radio" name="foreign_yn" value="f"<c:out value="${vo.foreign_yn == 'f'?'checked':'' }"/>>해외</label>
			            </td> 
			        </tr>
			        <tr>
			            <td>
			                <label  for="">과세구분</label>
			            </td>
			            <td>
			                 <select id="tax_yn" name="tax_yn">
			                    <option value="o"<c:out value="${vo.tax_yn == 'o'?'selected':''}"/>>과세/면세</option>
			                    <option value="y"<c:out value="${vo.tax_yn == 'y'?'selected':''}"/>>과세</option>
			                    <option value="n"<c:out value="${vo.tax_yn == 'n'?'selected':''}"/>>면세</option>
			                </select>
			            </td>
			            <td>
			                <label  for="">국가</label>
			            </td>
			            <td>
			            <div id="div1">
			                <input type="text" id="country_eng" name="country_eng" value="${vo.country_eng}">
			                <input type="text" id="country_kor" name="country_kor" value="${vo.country_kor}">
			            </div>
			               <button id="btn-edit" class="btn btn-warning btn-xs" onclick="openWindow()">
			               <span class="glyphicon glyphicon-pencil">검색</span>
			               </button>
			            </td> 
			        </tr>
			         <tr>
			            <td>
			                <label for="">특수관계자</label>
			            </td>
			            <td>
			               <input type="checkbox" id="special_relation_y" name="special_relation" value="y"<c:out value="${vo.special_relation == 'y'?'checked':'' }"/>/>
			            </td> 
			            <td>
			                <label for="">거래중지</label>
			            </td>
			            <td>
			               <input type="checkbox" id="trade_stop_y" name="trade_stop" value="y"<c:out value="${vo.trade_stop == 'y'?'checked':'' }"/>/>
			            </td> 
			        </tr>
			        <tr>
			            <td>
			                <label for="birth">계약기간</label>
			            </td>
			            <td>
			             	<input type="date" id="contract_period_s" name="contract_s" value="${date_s}">-
							<input type="date" id="contract_period_e" name="contract_e" value="${date_e}">
			            </td>
			        </tr>
			        <tr>
			            <td>
			                <label for="email">등록정보</label>
			            </td>
			            <td>
			                <input type="text" id="regi_info_man" name="regi_info_man" required size="8" value="${vo.regi_info_man}">
			                <fmt:formatDate value="${vo.regi_info_date}" pattern="yyyy-MM-dd HH:mm:ss"/>
			            </td>
			              <td>
			                <label for="email">변경정보</label>
			            </td>
			            <td>
			                ${vo.modi_info_man} :
			               <fmt:formatDate value="${vo.modi_info_date}" pattern="yyyy-MM-dd HH:mm:ss"/>
			            </td>
			        </tr>
			   	   
			    </table>
		   </div>
			    <table class="table table-bordered" style="border: 1px solid black; width:420px; hight:200px;">
			    <thead>
			      <tr>
			        <th>사무소</th>
			        <th>은행</th>
			        <th>계좌번호</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr>
			        <td><input type="text" id="factory" name="factory" value="${vo.factory}"></td>
			        <td><input type="text" id="trade_bank" name="trade_bank" value="${vo.trade_bank}"></td>
			        <td><input type="text" id="account_num" name="account_num" value="${vo.account_num}"></td>
			      </tr>
			    </tbody>
			  </table>
		</form>
			  </div>
			</div>
			<br><br><br><br>
				
				<!-- iOS에서는 position:fixed 버그가 있음, 적용하는 사이트에 맞게 position:absolute 등을 이용하여 top,left값 조정 필요 -->
				<div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
				<img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
				
				</div>
				<%-- 우편번호API 동작코드 --%>
				<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
				<script type="text/javascript" src="/js/member/postCode.js"></script>
      </div>
     
    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->

</body>

