<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<html>
<div id="product" class="container">
	<h3>${product.name}</h3>
	<div class="line"></div>
	<div class="row">
		<div class="col-md-4">
			<img alt="pic" src="${product.src}" width="100%">
		</div>
		<div class="col-md-8 gy-3">
			<h2 style="color: red">$${product.price}</h2>
			<p>${product.description}</p>
			<a href="<%= getServletContext().getContextPath() %>/AddToCartController?action=add&id=${product.id}">
				<button type="button" class="btn btn-danger">Add to cart</button>
			</a>
		</div>
	</div>
</div>

</html>