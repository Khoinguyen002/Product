<%@page import="com.controller.CookieChecker"%>
<%@page import="org.apache.tomcat.util.http.ServerCookies"%>
<%@page import="org.apache.catalina.startup.CopyParentClassLoaderRule"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Login page</title>
	<link rel="stylesheet" type="text/css" href="css/login_upPageStyle.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css">
	<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
	<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js" type="text/javascript">
	</script>
</head>
<% 
Boolean isRemember = false;
CookieChecker cc = new CookieChecker();
if (cc.isLogIn(request, response) != null) isRemember = true;
%>
<body>
	<section class="vh-100">
		<div class="container-fluid h-custom">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-lg-6 col-xl-6">
					<img src="img/SellPhoneC.png"
						class="img-fluid" alt="Sample image">
				</div>
				<div class="col-lg-6 col-xl-5 offset-xl-1">
					<form action="AccountController" method="POST">
						<div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
							<p class="lead fw-normal mb-0 me-3">Sign in with</p>
							<button type="button" class="btn btn-danger btn-floating mx-1">
								<i class="ti-facebook"></i>
							</button>

							<button type="button" class="btn btn-danger btn-floating mx-1">
								<i class="ti-twitter"></i>
							</button>

							<button type="button" class="btn btn-danger btn-floating mx-1">
								<i class="ti-linkedin"></i>
							</button>
						</div>

						<div class="divider d-flex align-items-center my-4">
							<p class="text-center fw-bold mx-3 mb-0">Or</p>
						</div>
						
						<!-- Email input -->
						<div class="form-outline mb-4">
							<label class="form-label" for="form3Example3">Email address</label>
							<input type="email" id="form3Example3" class="form-control form-control-lg"
								placeholder="Enter a valid email address" name="username" 
								value="<%= cc.getEmailValue() == null ? "" : cc.getEmailValue() %>" />
						</div>

						<!-- Password input -->
						<div class="form-outline mb-3">
							<label class="form-label" for="form3Example4">Password</label>
							<input type="password" id="form3Example4" class="form-control form-control-lg"
								placeholder="Enter password" name="password"
								value="<%= cc.getPasswordValue() == null ? "" : cc.getPasswordValue() %>" />
						</div>
						<% if (session.getAttribute("error") != null) {  %>
						<div class="invalid">
							<p style="color:#dc3545"><%= session.getAttribute("error") %></p>
						</div>
						<% } %>
						<div class="d-flex justify-content-between align-items-center">
							<!-- Checkbox -->
							<div class="form-check mb-0">
								<input class="form-check-input me-2" type="checkbox" 
								<%= isRemember ? "checked" : "" %> id="form2Example3"
									name="remember" />
								<label class="form-check-label" for="form2Example3">
									Remember me
								</label>
							</div>
							<a href="#!" class="text-body">Forgot password?</a>
						</div>

						<div class="text-center text-lg-start mt-4 pt-2">
							<input type="submit" class="btn btn-danger btn-lg"
								style="padding-left: 2.5rem; padding-right: 2.5rem;">
							<p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="signUp.jsp"
									class="link-danger">Register</a></p>
						</div>
						<input name="action" value="login" type="hidden">
					</form>
				</div>
			</div>
		</div>
		<div
			class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-danger">
			<!-- Copyright -->
			<div class="text-white mb-3 mb-md-0">
				Copyright © 2020. All rights reserved.
			</div>
			<!-- Copyright -->

			<!-- Right -->
			<div>
				<a href="#!" class="text-white me-4">
					<i class="ti-facebook"></i>
				</a>
				<a href="#!" class="text-white me-4">
					<i class="ti-twitter"></i>
				</a>
				<a href="#!" class="text-white me-4">
					<i class="ti-google"></i>
				</a>
				<a href="#!" class="text-white">
					<i class="ti-linkedin"></i>
				</a>
			</div>
			<!-- Right -->
		</div>
	</section>

</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
</script>
<script type="text/javascript" src="js/validatorLogin.js"></script>
</html>