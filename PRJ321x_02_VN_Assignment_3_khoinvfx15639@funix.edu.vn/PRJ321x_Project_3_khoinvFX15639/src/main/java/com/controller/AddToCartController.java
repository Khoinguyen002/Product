package com.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import com.dao.ListProductDAO;
import com.model.Cart;
import com.model.Product;

/**
 * Servlet implementation class AddToCartController
 */
public class AddToCartController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddToCartController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=UTF-8");
		try {
			HttpSession ss = request.getSession(true);
			String idd = request.getParameter("id");
			String action = request.getParameter("action");
			
			// Handle add to cart 
			if (action != null && action.equalsIgnoreCase("add")) {
				if (ss.getAttribute("cart") == null) {
					ss.setAttribute("cart", new Cart());
				}
				int id = Integer.parseInt(idd);
				Product p = new ListProductDAO().getProduct("" + id);
				Cart c = (Cart) ss.getAttribute("cart");
				c.add(new Product(p.getId(), p.getName(), p.getDescription(), p.getPrice(),
						p.getSrc(), p.getType(), p.getBrand(), 1));
				
				// Handle delete product in cart
			} else if (action != null && action.equalsIgnoreCase("delete")) { 
				int id = Integer.parseInt(idd);
				Cart c = (Cart) ss.getAttribute("cart");
				c.remove(id);
				
				// Handle change amount of product in cart 
			} else if (action != null && action.equalsIgnoreCase("change")) {
				Cart c = (Cart) ss.getAttribute("cart");
				for (Product product : c.getItems()) {
					int newNumber = Integer.parseInt(request.getParameter(product.getId() + ""));
					if (product.getNumber() != newNumber) {
						if (newNumber == 0) {
							c.remove(product.getId());
						} else product.setNumber(newNumber);
					}
				}
			}
			request.setAttribute("action", "cart");
			request.getRequestDispatcher("index.jsp").forward(request, response);
		} catch (Exception e) {
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
