<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<c:if test="${!result.isEmpty()}">
		<div class="container" id="content">
			<div class="row">
				<c:forEach var="product" items="${result}">
					<div class="col-md-4 col-xl-3 col-sm-6 gy-3">
						<div class="card" style="width: 100%;">
							<img src="${product.src}" class="card-img-top" alt="img">
							<div class="card-body">
								<a href="<%= getServletContext().getContextPath() %>/InfoProductController?id=${product.id}">
									<h5 class="card-title">${product.name}</h5>
								</a>
								<p class="card-text">${product.type}</p>
								<Strong>$${product.price}</Strong>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
			<div id="pagination">
				<jsp:include page="pagination.jsp"></jsp:include>
			</div>
		</div>
	</c:if>
	<c:if test="${result.isEmpty()}"><p>No result</p></c:if>
</html>