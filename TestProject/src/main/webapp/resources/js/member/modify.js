$(function(){
	var form=$("#modifyForm");
	var isCheckEmail="true";
	
	//이메일 변경 시 이메일 인증 활성화
	$("#mb_email").on("change",function(){
		$("#btn_sendAuthCode").show();
		isCheckEmail="false";
	});
	//이메일 인증 클릭시
	$("#btn_sendAuthCode").click(function(){
		var mb_authcode=$("#mb_email").val();
		if(mb_email ==""||mb_email==null){
			$("#authcode_status").html("이메일을 먼저 입력해주세요.");
			return;
		}
		$("#authcode_status").css("color","grey");
		$("#authcode_status").html("인증코드를 전송중 입니다. 잠시만 기다려주세요...");
		
		$.ajax({
			url:'/email/send',
			type:'post',
			dataType:'text',
			data:{mb_authcode:mb_authcode},
			success:function(data){
				$("#email_authcode").show();
				$("#authcode_status").css("color","blue");
				$("#authcode_status").html("메일이 전송되었습니다. 입력하신 이메일 주소에서 인증코드를 확인 후 입력해 주세요.");
			}
		});
	});
	//이메일 인증코드 확인 클릭시
	$("#btn_checkAuthCode").click(function(){
		var mb_authcode=$("#mb_authcode").val();
		if(mb_authcode==""||mb_authcode==null){
			alert("인증코드를 입력해 주세요.");
			mb_authcode.focus();
		}
		$.ajax({
			url:'/member/checkAuthcode',
			type:'post',
			dataType:'text',
			data:{mb_authcode:mb_authcode},
			success:function(data){
				if(data==SUCCESS){
					$("#email_authcode").hide();
					$("#authcode_status").css("color","blue");
					$("#authcode_status").html("인증이 완료되었습니다.");
					$("#mb_email").attr("readonly",true);
					$("#btn_sendAuthCode").attr("disabled",true);
					isCheckEmail="true";
					return;
				}else{
					$("#email_authcode").hide();
					$("#authcode_status").css("color","red");
					$("#authcode_status").html("인증 실패. 다시 시도해주세요.");
				}
			}
		});
	});
	//회원수정 확인버튼 클릭시
	$("#btn_submit").click(function(){
		var mb_id=$("#mb_id");
		var mb_pw=$("#mb_pw");
		var mb_name=$("#mb_name");
		var mb_nickname=$("#mb_nickname");
		var mb_email=$("#mb_email");
		var mb_authcode = $("#mb_authcode");
		var mb_phone=$("#mb_phone");
		var mb_zipcode=$("input[name='mb_zipcode']");
		var mb_add=$("input[name='mb_add']");
		var mb_add_d=$("input[name='mb_add_d']");
		//유효성 검사
		if(mb_pw.val()==""||mb_pw.val()==null){
			alert("현재 비밀번호를 입력해주세요.");
			$("#mb_pw").focus();
			return;
		}else if(mb_name==""||mb_name==null){
			alert("이름을 입력해주세요.");
			$("#mb_name").focus();
			return;
		}else if(mb_nickname==""||mb_nickname==null){
			alert("닉네임을 입력해주세요.");
			$("#mb_nickname").focus();
			return;
		}else if(mb_email==""||mb_email==null){
			alert("이메일을 입력해주세요.");
			$("#mb_email").focus();
			return;
		}else if(isCheckEmail!="true" && mb_authcode==""||mb_authcode==null){
			alert("이메일 인증 후 인증 코드를 입력해주세요.");
			$("#mb_pw").focus();
			return;
		}else if(isCheckEmail=="false"){
			alert("이메일 인증을 해주세요.");
			$("#btn_sendAuthCode").focus();
			return;
		}else if(mb_phone==""||mb_phone==null){
			alert("휴대폰 번호를 입력해주세요.");
			$("#mb_phone").focus();
			return;
		}else if(mb_zipcode==""||mb_zipcode==null){
			alert("우편번호를 입력해주세요.");
			$("#btn_postCode").focus();
			return;
		}else if(mb_add==""||mb_add==null){
			alert("우편번호를 입력해주세요.");
			$("#btn_postCode").focus();
			return;
		}else if(mb_add_d==""||mb_add_d==null){
			alert("우편번호를 입력해주세요.");
			$("#mb_add_d").focus();
			return;
		}
		var mb_pw=mb_pw.val();
		
		$.ajax({
			url:'/member/checkPw',
			type:'post',
			dataType:'text',
			data:{mb_pw:mb_pw},
			success:function(data){
				if(data=="SUCCESS"){
					form.submit();
					alert("회원정보가 수정되었습니다.");
				}else{
					alert("비밀번호가 틀렸습니다. 다시 시도해주세요.");
					mb_pw.val("");
					mb_pw.focus();
				}
			}
		});
	});
	//취소버튼 클릭시
	$("#btn_cancle").click(function(){
	   var result=confirm("회원수정을 취소하시겠습니까?");
		if(result){
			location.href='/';
		}
	});		
	//회원 탈퇴 클릭시
	$("#btn_modal_confirm").on('click',function(){
		
		var coment = $("#coment").val();
		var mb_id = $(".mb_id").val();
		var mb_name= $(".mb_name").val();
		var mb_phone= $(".mb_phone").val();
		var mb_email= $(".mb_email").val();
		
		
		alert("이용해 주셔서 감사합니다.")
		$.ajax({
			url:'/member/deleteUser',
			type:'post',
			dataType:'text',
			data:{
				comment:coment,
				mb_id:mb_id,
				mb_name:mb_name,
				mb_phone:mb_phone,
				mb_email:mb_email
			},
			success:function(data){
				location.href="/";
			}
			
		});
		
	});
	
});