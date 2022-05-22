<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<c:set var="count" value="1"></c:set>
<div id="cart" class="container">
	<form action="<%= getServletContext().getContextPath() %>/AddToCartController" class="changeCart">
		<table class="table">
			<thead>
				<tr class="table-primary">
					<th scope="col">#</th>
					<th scope="col">Product's name</th>
					<th scope="col">Price</th>
					<th scope="col">Quantity</th>
					<th scope="col">Amount</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="result" items="${cart.items}">
					<tr>
						<th scope="row">${count}</th>
						<td>${result.name}</td>
						<td>$${result.price}</td>
						<td><input type="number" step="1" min="0" max="" style="width: 50px" name="${result.id}"
							value="${result.number}" size="3" pattern="[0-9]*" inputmode="numeric"></td>
						<td>$${Math.round((result.price * result.number) * 100) / 100.0}</td>
						<td><a href="<%= getServletContext().getContextPath() %>/AddToCartController?action=delete&id=${result.id}" 
						class="remove"><i class="ti-close"></i></a></td>
					</tr>
					<c:set var="count" value="${count + 1}"></c:set>
				</c:forEach>
				<tr class="table-primary">
					<th scope="row">Sum</th>
					<td></td>
					<td></td>
					<td></td>
					<td>$${cart.amount}</td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<input type="hidden" name="action" value="change">
		<input style="margin: 0 auto; width: 100px; display: block"
			type="hidden" value="Save" class="btn btn-danger">
	</form>
	<div class="line"></div>
	<div class="row cus" id="customerInfo">
		<div class="col-xl-3">
			<h4>Customer's information</h4>
		</div>
		<div class="col-xl-9">
			<form class="confirmCart" action="<%= getServletContext().getContextPath() %>/PayController">
				<div class="mb-3">
					<label for="exampleInputEmail" class="form-label">Email address</label>
					<input type="email" class="form-control" id="exampleInputEmail" name="email" value="${user.getUsr()}" >
				</div>
				<div class="mb-3">
					<label for="exampleInputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="exampleInputAddress" name="address" value="${user.getAddress()}" >
				</div>
				<div class="mb-3">
					<label for="exampleInputDiscount" class="form-label">Discount code</label>
					<input type="text" class="form-control" id="exampleInputDiscount" name="discount" >
				</div>
				<input type="submit" value="Confirm" class="btn btn-danger">
			</form>
		</div>
	</div>
</div>

</html>