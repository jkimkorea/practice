<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">

function test(str1,str2) {
 opener.div1.innerHTML = "<input type='text' name='country_eng' value="+str1+">"+"<input type='text' name='country_kor' value="+str2+">";
 opener = self;
 self.close();
}

</script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<p onClick="test('KOR','한국');" style="cursor:hand;">
  한국
</p>
<p onClick="test('US','미국');" style="cursor:hand;">
 미국
</p>
<p onClick="test('BM','영국');" style="cursor:hand;">
 영국
</p>
<p onClick="test('CH','스위스');" style="cursor:hand;">
 스위스
</p>
<p>선택해주세요</p>
</body>
</html>