<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8">
<title>index</title>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>

	<%
	out.print(session.getAttribute("id"));
	%>

	<c:set var="loggedInUser" value="${memberGroup}" />
	<c:choose>
		<c:when test="${empty loggedInUser}">
			<a href="./login">로그인</a>
			<a href="./signIn">회원가입</a>
		</c:when>
		<c:otherwise>
			<a href="./logout">로그아웃</a>
		</c:otherwise>
	</c:choose>
	<a href="./modify">정보수정</a>
	<a href="./secession">탈퇴</a>

	<c:choose>
		<c:when test="${loggedInUser eq '1'}">
			<%@ include file="/WEB-INF/views/common/studentNav.jsp"%>
		</c:when>
		<c:when test="${loggedInUser eq '2'}">
			<%@ include file="/WEB-INF/views/common/professorNav.jsp"%>
		</c:when>
		<c:when test="${loggedInUser eq '3'}">
			<%@ include file="/WEB-INF/views/common/companyNav.jsp"%>
		</c:when>
	</c:choose>
</body>
</html>