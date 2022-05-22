<%@page import="com.dao.ListAccountDAO"%>
<%@page import="com.model.Account"%>
<%@page import="com.controller.CookieChecker"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>SellPhoneC</title>
	<link href="css/style.css" type="text/css" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
		integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
		crossorigin="anonymous" referrerpolicy="no-referrer" />
	<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
	<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js" type="text/javascript">
	</script>
</head>
<% 
CookieChecker cc = new CookieChecker();
Account acc = cc.isLogIn(request, response);
if (acc != null) session.setAttribute("user", acc);
%>
<c:if test="${action == null}">
	<% response.sendRedirect(getServletContext().getContextPath() + "/ListController"); %>
</c:if>
<body>
	<header class="header">
		<jsp:include page="header.jsp"></jsp:include>
	</header>
	<main>
		<div id="breadcrumb">
			<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
				aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="ListController">Home</a></li>
					<c:choose>
						<c:when test="${action == 'cart'}">
							<li class="breadcrumb-item active" aria-current="page">Cart</li>
						</c:when>
						<c:when test="${action == 'product' || action == 'search'}">
							<li class="breadcrumb-item active" aria-current="page">Product</li>
						</c:when>
					</c:choose>
				</ol>
			</nav>
		</div>
		<c:choose>
			<c:when test="${action == 'home'}">
				<jsp:include page="content.jsp"></jsp:include>
			</c:when>
			<c:when test="${action == 'product'}">
				<jsp:include page="infoProduct.jsp"></jsp:include>
			</c:when>
			<c:when test="${action == 'search'}">
				<jsp:include page="search.jsp"></jsp:include>
			</c:when>
			<c:when test="${action == 'cart'}">
				<jsp:include page="cart.jsp"></jsp:include>
			</c:when>
			<c:when test="${action == 'history'}">
				<jsp:include page="historyOrders.jsp"></jsp:include>
			</c:when>
		</c:choose>
	</main>
	<section id="footer">
		<jsp:include page="footer.jsp"></jsp:include>
	</section>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
</script>
<script type="text/javascript" src="js/validatorCart.js"></script>

</html>