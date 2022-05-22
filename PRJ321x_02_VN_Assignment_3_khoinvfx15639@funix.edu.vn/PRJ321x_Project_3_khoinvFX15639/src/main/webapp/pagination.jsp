<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<c:set var="controller" value="${action == 'home' ? 'ListController' : 'SearchController2'}"></c:set>
		<nav aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item ${page == 1 ? 'disabled' : ''}">
					<a class="page-link" href="${controller}?page=${page - 1}&s=${searchContent}">Previous</a>
				</li>
				<c:set var="count" value="1"></c:set>
				<c:forEach begin="0" end="${Math.ceil(numOfproduct / 8.0) - 1}">
					<li class="page-item ${page == count ? 'active' : ''}"><a class="page-link" href="${controller}?page=${count}&s=${searchContent}">${count}</a></li>
					<c:set var="count" value="${count + 1}"></c:set>
				</c:forEach>
				<li class="page-item ${page == Math.ceil(numOfproduct / 8.0) ? 'disabled' : ''}">
					<a class="page-link" href="${controller}?page=${page + 1}&s=${searchContent}">Next</a>
				</li>
			</ul>
		</nav>
	</head>
</html>