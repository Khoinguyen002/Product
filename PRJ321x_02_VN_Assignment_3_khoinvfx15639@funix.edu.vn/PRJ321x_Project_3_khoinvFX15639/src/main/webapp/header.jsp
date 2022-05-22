<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<img id="headLogo" alt="logo" src="img/SellPhoneC.png">
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgb(227, 228, 230)">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <button class="btn btn-danger">SellPhoneC</button>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">
                <li class="nav-item">
                    <a class="nav-link ${action == 'home' ? 'active' : ''}" aria-current="page" href="ListController">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${action == 'product' || action == 'search' ? 'active' : ''}" href="#">Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${action == 'cart' ? 'active' : ''}" href="AddToCartController">Cart</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <c:choose>
                	<c:when test="${user == null}">
	                	<li class="nav-item">
		                    <a class="nav-link"
		                        href="<%= getServletContext().getContextPath() + "/login.jsp" %>">LogIn</a>
		                </li>
                	</c:when>
                	<c:when test="${user != null}">
		                <li class="nav-item">
		                    <a class="nav-link ${action == 'history' ? 'active' : ''}"
		                        href="HistoryController">History</a>
		                </li>
                		<li class="nav-item d-flex align-items-center justify-content-center flex-grow-1" style="cursor: pointer;">
		                    <div class="dropdown">
                                <div class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <strong>${user.getUsr()}</strong>
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><a class="dropdown-item" href="<%= getServletContext().getContextPath() + "/AccountController?action=logout" %>">Log Out</a></li>
                                </ul>
                            </div>	
		                </li>
                	</c:when>
                </c:choose>
            </ul>
            <form class="d-flex" action="SearchController2">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="s" value="${searchContent}">
                <button class="btn btn-outline-danger" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>