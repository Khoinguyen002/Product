package com.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.SQLException;

import javax.naming.NamingException;

import com.dao.ListAccountDAO;
import com.model.Account;

/**
 * Servlet implementation class AccountController
 */
public class AccountController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AccountController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		request.setCharacterEncoding("utf-8");
		String action = request.getParameter("action");
		
		switch (action) {
		case "login" -> {
			try {
				HttpSession session = request.getSession();
				//read from form in login page
				String userId = request.getParameter("username");
				String password = request.getParameter("password");
				String isRemember = request.getParameter("remember");
				ListAccountDAO lad = new ListAccountDAO();
				Account acc = lad.accountCheck(userId, password);
				
				if (acc != null) {
					
					if (isRemember != null) {
						Cookie cookieEmail = new Cookie("email", userId);
						Cookie cookiePassword = new Cookie("password", password);
						cookieEmail.setMaxAge(300);
						cookiePassword.setMaxAge(300);
						response.addCookie(cookieEmail);
						response.addCookie(cookiePassword);
					}
					session.setAttribute("error", null);
					session.setAttribute("user", acc);
					if (acc.getRole() == 1) {
						response.sendRedirect("admin/index.jsp");
					} else if (acc.getRole() == 2) {
						response.sendRedirect("index.jsp");
					}
				} else {
					session.setAttribute("error", "Email or Password is invalid!");
					response.sendRedirect("login.jsp");
				}
			} catch (NullPointerException e) {
				RequestDispatcher rd = request.getRequestDispatcher("login.jsp");
				rd.forward(request, response);
			} catch (Exception ex) {
				response.getWriter().print(ex);
			}
		}
		case "logout" -> {
			eraseCookie(request, response);
			response.sendRedirect("login.jsp");
		}
		case "signUp" -> {
			HttpSession session = request.getSession();
			String userId = request.getParameter("username");
			String password = request.getParameter("password");
			String name = request.getParameter("name");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			ListAccountDAO lad = new ListAccountDAO();
			
			try {
				if (!lad.isValidAccount(userId)) {
					Account acc = new Account(userId, password, 2, 
							name, address, phone, 0);
					new ListAccountDAO().insertAccount(acc);
					session.setAttribute("user", acc);
					session.setAttribute("error", null);
					response.sendRedirect("index.jsp");
				} else {
					session.setAttribute("error", "Email is valid");
					response.sendRedirect("signUp.jsp");
				}
			} catch (SQLException | NamingException e) {
				e.printStackTrace();
			}
		}
		
		default -> 
		throw new IllegalArgumentException("Unexpected value: " + action);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 * Clear cookie
	 */
	private void eraseCookie(HttpServletRequest req, HttpServletResponse resp) {
	    Cookie cookieEmail = new Cookie("email", "");
	    Cookie cookiePassword = new Cookie("password", "");
	    HttpSession session = req.getSession();
	    
	    session.setAttribute("user", null);	
	    session.setAttribute("cart", null);	
	    session.setAttribute("action", null);
	    session.setAttribute("error", null);	
	    cookieEmail.setMaxAge(0);
	    cookiePassword.setMaxAge(0);
	    resp.addCookie(cookieEmail);
	    resp.addCookie(cookiePassword);
	}

}
