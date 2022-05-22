package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.model.Cart;
import com.model.Orders;
import com.model.Product;
import com.model.ProductOrders;

import jakarta.servlet.http.HttpSession;

public class OrdersDAO {
	public Map< Integer, ArrayList<String> > getListOfOrderID(String email) throws SQLException, NamingException {
		Map< Integer, ArrayList<String> > map = new HashMap< Integer, ArrayList<String>>();
		Connection conn = GetShoppingDBConn();
		String sql = "select o.order_id, order_date, order_address, order_status from shoppingdb.orders o\r\n"
				+ "join shoppingdb.orders_detail oi on o.order_id = oi.order_id\r\n"
				+ "where user_mail = ?\r\n"
				+ "group by o.order_id, order_date";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, email);
		ResultSet rs = ps.executeQuery();
		
		while (rs.next()) {
			ArrayList<String> as = new ArrayList<String>();
			as.add(rs.getString(2));
			as.add(rs.getString(3));
			as.add(rs.getString(4));
			map.put(rs.getInt(1), as);
		}
		ps.close();
		return map;
	}
	
	public List<ProductOrders> getListProductOrdered(String email) throws SQLException, NamingException {
		Connection conn = GetShoppingDBConn();
		List<ProductOrders> lpo = new ArrayList<ProductOrders>(); 
		String sql = "SELECT o.order_id, amount_product, product_name, product_img_source, product_price\r\n"
				+ "FROM orders_detail od\r\n"
				+ "join orders o on od.order_id = o.order_id\r\n"
				+ "join account a on o.user_mail = a.user_mail\r\n"
				+ "join products p on p.product_id = od.product_id\r\n"
				+ "where a.user_mail = ?;\r\n";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, email);
		ResultSet rs = ps.executeQuery();
		
		while (rs.next()) {
			lpo.add(new ProductOrders(rs.getInt(1), rs.getInt(2), rs.getString(3), rs.getDouble(5), rs.getString(4)));
		}
		conn.close();
		return lpo;
	}
	public void insertOrder(Orders o, Cart c) throws SQLException, NamingException {
		Connection conn = GetShoppingDBConn();
		
		// Insert to Orders table
		String ordersSql = "insert into shoppingdb.orders (user_mail, order_status, order_discount_code, order_address)"
				+ "values(?, ?, ?, ?)";
		PreparedStatement ps = conn.prepareStatement(ordersSql);
		ps.setString(1, o.getUserMail());
		ps.setString(2, o.getStatus() + "");
		ps.setString(3, o.getDiscount());
		ps.setString(4, o.getAddress());
		ps.executeUpdate();
		
		// Get current Orders_id
		String getCurrentOrders_idSql = "select MAX(order_id) from shoppingdb.orders";
		ps = conn.prepareStatement(getCurrentOrders_idSql);
		ResultSet rs = ps.executeQuery();
		rs.next();
		int currentOrders_id = rs.getInt(1);
		
		// Insert information into orders_detail table
		List<Product> lp = c.getItems();
		for (int i = 0; i < lp.size(); i++) {
			String ordersDetailSql = "insert into shoppingdb.orders_detail (order_id, product_id, amount_product, price_product)"
					+ "values(?, ?, ?, ?)";
			ps = conn.prepareStatement(ordersDetailSql);
			ps.setInt(1, currentOrders_id);
			ps.setInt(2, lp.get(i).getId());
			ps.setInt(3, lp.get(i).getNumber());
			ps.setFloat(4, lp.get(i).getPrice());
			ps.executeUpdate();
		}
		ps.close();
		conn.close();
		
	}
	
	private Connection GetShoppingDBConn() throws SQLException, NamingException {
		Context initContext = new InitialContext();
        Context envContext = (Context) initContext.lookup("java:comp/env");
        DataSource ds = (DataSource) envContext.lookup("jdbc/shoppingdb");
		Connection conn = ds.getConnection();
		return conn;
	}
}
