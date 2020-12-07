/**
 * 
 */

$(function(){
	var isCheckId="false";
	var isCheckEmail="false";
	var form=$("#joinForm");
	
	//회원가입 버튼 클릭
	$("#btn_submit").click(function(){
		var mb_id=$("#mb_id").val();
		var mb_pw=$("#mb_pw").val();
		var mb_pw_check=$("#mb_pw_check").val();
		var mb_name=$("#mb_name").val();
		var mb_nickname=$("#mb_nickname").val();
		var mb_email=$("#mb_email").val();
		var mb_authcode=$("#mb_authcode").val();
		var mb_phone=$("#mb_phone").val();
		var mb_add=$("input[name='mb_add']").val();
		var mb_add_d=$("input[name='mb_add_d']").val();
		var mb_zipcode=$("input[name='mb_zipcode']").val();
		
		//유효성 검사
		if (mb_id==""||mb_id==null){
			alert("아이디를 입력해주세");
			$("#mb_id").focus();
		}else if(isCheckId=="false"){
			alert("아이디 중복 체크를 해주세요.");
			$("#btn_checkId").focus();
		}else if(mb_pw==""||mb_pw==null){
			alert("비밀번호를 입려해주세요.");
			$("#mb_pw").focus();
		}else if(mb_pw_check==""||mb_pw_check==null){
			alert("비밀번호 확인란을 입력해주세요.");
			$("#mb_pw_check").focus();
		}else if(mb_pw!=mb_pw_check){
			alert("입력하신 비밀번호가 다릅니다.\n 비밀번호를 다시 확인해주세요.");
			$("#mb_pw_check").focus();
		}else if(mb_name==""||mb_name==null){
			alert("이름을 입력해주세요.");
			$("#mb_name").focus();
		}else if(mb_nickname==""||mb_nickname==null){
			alert("닉네임을 입력해주세요.");
			$("#mb_nickname").focus();
		}else if(mb_email==""||mb_email==null){
			alert("이메일을 입력해주세요.");
			$("#mb_email").focus();
		}else if(mb_authcode==""||mb_authcode==null){
			alert("이메일 인증확인 후 인증코드를 입력해주세요..");
			$("#mb_email").focus();
		}else if(isCheckEmail=="false"){
			alert("이메일 인증을 해주세요.");
			$("#mb_email").focus();
		}else if(mb_phone==""||mb_phone==null){
			alert("휴대폰 번호를 입력해주세요.");
			$("#mb_phone").focus();
		}else if(mb_zipcode==""||mb_zipcode==null){
			alert("우편번호를 입력해 주세요.");
			$("#mb_zipcode").focus();
		}else if(mb_add==""||mb_add==null){
			alert("주소를 입력해주세요.");
			$("#mb_add").focus();
		}else if(mb_add_d==""||mb_add_d==null){
			alert("상세 주소를 입력해주세요.");
			$("#mb_add_d").focus();
		}else if(mb_add_d==""||mb_add_d==null){
			alert("상세 주소를 입력해주세요.");
			$("#mb_add_d").focus();
		}else{
		
		$("#joinForm").submit();
		}
	});
	//아이디 중복체크
	$("#btn_checkId").on("click",function(){
	
		if($("#mb_id").val()==""||$("#mb_id").val()==null){
			$("#id_availability").html("아이디를 입력해주세요.");
			return;
		}
		var mb_id=$("#mb_id").val();
        
        $.ajax({
            url:'/member/checkIdDuplicate',
            type:'post',
            dataType:'text',
            data:{mb_id:mb_id},
            success: function (data){
                if(data=='SUCCESS'){
                    $("#id_availability").css("color","blue");
                    $("#id_availability").html("사용가능한 아이디 입니다.");
                    $("#mb_id").attr("readonly",true);
                    $("#btn_checkId").attr("disabled",true);
                    isCheckId="true";
	
                }else{
                    $("#id_availability").html("이미 존재하는 아이디 입니다.\n다시 시도해 주세요.");
                }
            }
        });	
    });

	//메일인증코드 발송
     $("#btn_sendAuthCode").click(function(){
        
        if($("#mb_email").val()==""||$("#mb_email").val()==null){
            $("#authcode_status").html("메일을 입력해 주세요.");
            return;
        }

        var receiveMail=$("#mb_email").val();

        $("#authcode_status").css("color","red");
        $("#authcode_status").html("인증코드를 발송중 입니다. 잠시만 기다려주세요.");
        
        $.ajax({
            url:'/email/send',
            type:'post',
            datatype:'text',
            data:{receiveMail:receiveMail},
            success:function(data){
                $("#email_authcode").show();
                $("#authcode_status").css("color","blue");
                $("#authcode_status").html("메일이 전송되었습니다.  입력하신 이메일 주소에서 인증코드 확인 후 입력해주세요.");
            }

        });
    });
	//인증코드 확인
	$("#btn_checkAuthCode").on("click", function(){
		var code = $("#mb_authcode").val();  
		
		$.ajax({
			url: '/member/checkAuthcode',
			type: 'post',
			dataType: 'text',
			data: {code : code},
			success: function(data){
				if(data == 'SUCCESS'){
					$("#email_authcode").hide(); 
					$("#authcode_status").css("color", "blue");
					$("#authcode_status").html('인증 성공');
					$("#mb_email").attr("readonly",true);
					$("#btn_sendAuthCode").attr("disabled", true);
					isCheckEmail = "true";  
					return;
					
				} else {
					$("#email_authcode").hide();
					$("#authcode_status").css("color", "red");
					$("#authcode_status").html('인증 실패. 다시 시도해주세요.');
					return;
				}
			}
		});
	});
	
});
