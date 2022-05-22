<%@page import="com.model.Account"%>
<%@page import="com.controller.CookieChecker"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>SellPhoneC Administrator</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet"
        integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
</head>
<% 
Boolean isRemember = false;
CookieChecker cc = new CookieChecker();
if (cc.isLogIn(request, response) != null) isRemember = true;
%>
<body class="home">
    <div class="container-fluid display-table">
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                <div class="logo">
                    <h3>SellPhoneC</h3>
                </div>
                <div class="navi">
                    <ul>
                        <li class="active"><a href="#"><i class="fa fa-home" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Dashboard</span></a></li>
                        <li><a href="#"><i class="fa fa-tasks" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Workflow</span></a></li>
                        <li><a href="#"><i class="fa fa-bar-chart" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Statistics</span></a></li>
                        <li><a href="#"><i class="fa fa-user" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Calender</span></a></li>
                        <li><a href="#"><i class="fa fa-calendar" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Users</span></a></li>
                        <li><a href="#"><i class="fa fa-cog" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Setting</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-sm-11 display-table-cell v-align">
                <!--<button type="button" class="slide-toggle">Slide Toggle</button> -->
                <div class="row header-line">
                    <div class="col-md-7">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-danger" type="submit">Search</button>
                        </form>
                    </div>
                    <div class="col-md-5">
                        <div class="list-inline d-flex justify-content-around align-items-center">
                            <a href="#" class="add-project" data-toggle="modal" data-target="#add_project">Add
                                Project</a></d>
                            <div><a href="#" class="icon-info"><i class="fa fa-envelope" aria-hidden="true"></i></a>
                            </div>
                            <div>
                                <a href="#" class="icon-info">
                                    <i class="fa fa-bell" aria-hidden="true"></i>
                                    <span class="label label-primary">3</span>
                                </a>
                            </div>
                            <% if (isRemember == false && session.getAttribute("user") == null) { %>
                            	<a class="loginBtn" href="<%= getServletContext().getContextPath() + "/AccountController?action=login" %>">LogIn</a>
                            <% } else { %>
                            <div class="dropdown">
                                <div class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <img src="../img/avatar.jpg">
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><a class="dropdown-item" href="<%= getServletContext().getContextPath() + "/login.jsp" %>">Log Out</a></li>
                                </ul>
                            </div>	
                            <% } %>
                        </div>
                    </div>
                </div>
                <div class="row content">
                    <div class="user-dashboard">
                    <% 
                    Account user = (Account) session.getAttribute("user");
                    String email = user == null ? null : user.getUsr();
                    if (isRemember == true || email != null && user.getRole() == 1) { %>
                        <h1><%="Hello, " + (isRemember ? cc.getEmailValue() : email) %></h1>
                    <% } else { %>
                    	<h1>Login session has expired or you did not login, please login again!</h1>
                    <% } %>
                        <div class="row">
                            <div class="col-md-5 col-sm-5 col-xs-12">
                                <div class="sales">
                                    <h2>Your Sale</h2>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary btn-lg dropdown-toggle" type="button"
                                            id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Period:</span> Last Year
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#">2012</a></li>
                                            <li><a class="dropdown-item" href="#">2014</a></li>
                                            <li><a class="dropdown-item" href="#">2016</a></li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7 col-sm-7 col-xs-12">

                                <div class="sales report">
                                    <h2>Report</h2>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary btn-lg dropdown-toggle" type="button"
                                            id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span>Period:</span> Last Year
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#">2012</a></li>
                                            <li><a class="dropdown-item" href="#">2014</a></li>
                                            <li><a class="dropdown-item" href="#">2016</a></li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</body>
<script type="text/javascript" src="handleNavigate.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
    integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
</script>

</html>