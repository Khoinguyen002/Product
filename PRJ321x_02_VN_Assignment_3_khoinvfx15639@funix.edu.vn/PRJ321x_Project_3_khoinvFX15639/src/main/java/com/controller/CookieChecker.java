package com.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

import javax.naming.NamingException;

import com.dao.ListAccountDAO;
import com.model.Account;

/**
 * Servlet implementation class CookieChecker
 */
public class CookieChecker {
	private static final long serialVersionUID = 1L;
	private String emailValue;
	private String passwordValue;
    
	public Account isLogIn(HttpServletRequest request, HttpServletResponse response) throws SQLException, NamingException {
		Cookie[] cookies = request.getCookies();
		Account acc = null;
		if (cookies != null) {
			for(Cookie cookie: cookies) {
				if (cookie.getName().equals("email")) {
					emailValue = cookie.getValue();
				} else if (cookie.getName().equals("password")) {
					passwordValue = cookie.getValue();
				}
				if (emailValue != null && passwordValue != null) {
					acc = new ListAccountDAO().accountCheck(emailValue, passwordValue);
				}
			}
		}
		return acc;
	}
	public String getEmailValue() {
		return emailValue;
	}
	public String getPasswordValue() {
		return passwordValue;
	}
}
