<%@page import="java.util.Set"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<div id="history" class="container" >
		<h3>Order history</h3>
		<div class="line"></div>
		<c:forEach var="key" items="${listOfOrders.keySet()}">
			<c:set value="0" var="sum"></c:set>
			<strong>Order #${key}</strong>
			<div class="item">
				<div class="row align-items-center">
					<div class="col-md-8">
						<c:forEach var="order" items="${historyOrder}">
						<c:if test="${order.orderId == key}">
						<c:set value="${order.price * order.amountProduct + sum}" var="sum"></c:set>
						
						<div class="row">
							<div class="col-md-6">
								<img alt="pic" src="${order.src}" style="height: 100px">
							</div>
							<div class="col-md-6">
								<p><strong>${order.nameProduct}</strong></p>
								<p><strong>Amount:</strong> ${order.amountProduct}</p>
								<p><strong>Price:</strong> <strong style="color: #DC3545">$${order.price}</strong></p>
							</div>
						</div>
							
						</c:if>
						</c:forEach>
					</div>
					<div class="col-md-4">
						<p><strong>Order Date:</strong> ${listOfOrders.get(key).get(0)}</p>
						<p><strong>Address:</strong> ${listOfOrders.get(key).get(1)}</p>
						<p><strong>Status:</strong> ${listOfOrders.get(key).get(2)}</p>
					</div>
				</div>
				<div style="text-align: center"><p style="color: #DC3545; font-weight: bolder; font-size: 18px">TOTAL: $${Math.round(sum * 100.0) / 100.0}</p></div>
			</div>
		</c:forEach>
	</div>
</html>