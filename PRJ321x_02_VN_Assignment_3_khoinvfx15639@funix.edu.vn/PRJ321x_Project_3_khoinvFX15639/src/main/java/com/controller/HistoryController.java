package com.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.NamingException;

import com.dao.OrdersDAO;
import com.model.Account;
import com.model.ProductOrders;

/**
 * Servlet implementation class HistoryController
 */
public class HistoryController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HistoryController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession ss = request.getSession();
		Account acc = (Account) ss.getAttribute("user");
		List<ProductOrders> lpo = null;
		
		try {
			if (acc != null) {
				lpo = new OrdersDAO().getListProductOrdered(acc.getUsr());
				request.setAttribute("listOfOrders", new OrdersDAO().getListOfOrderID(acc.getUsr()));
				request.setAttribute("action", "history");
				request.setAttribute("historyOrder", lpo);
				request.getRequestDispatcher("index.jsp").forward(request, response);
			} else response.sendRedirect("login.jsp");
		} catch (SQLException | NamingException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
