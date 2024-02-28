<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 탈퇴</title>
</head>
<body>
	회원 탈퇴
	<form action="./secession" method="post">
		<table border="1">
			<tr>
				<th>password</th>
				<td><input type="text" name="password"></td>
			</tr>
			<tr>
				<th>&nbsp;</th>
				<td><input type="submit" value="삭제"> <input
					type="reset" value="취소"></td>
			</tr>

		</table>
	</form>
</body>
</html>