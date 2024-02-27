<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
</head>
<body>
회원가입
<form action="./signIn" method="post">
	<table border="1">
	<tr>
		<th>id</th>
		<td><input type="text" name="id" required></td>
	</tr>
	<tr>
		<th>password</th>
		<td><input type="text" name="password"></td>
	</tr>
	<tr>
		<th>group</th>
		<td>
		<label for="option1">옵션 1</label>
        <input type="radio" id="option1" name="memberGroup" value="1"><br>
        
        <label for="option2">옵션 2</label>
        <input type="radio" id="option2" name="memberGroup" value="2"><br>
        
        <label for="option3">옵션 3</label>
        <input type="radio" id="option3" name="memberGroup" value="3"><br>
        </td>
	</tr>
	<tr>
		<th>&nbsp;</th>
		<td>
			<input type="submit" value="저장">
			<input type="reset" value="취소">			
		</td>	
	</tr>
	
	</table>
</form>
</body>
</html>