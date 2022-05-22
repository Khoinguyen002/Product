package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.model.Product;

import jakarta.annotation.Resource;

public class ListProductDAO {
	
	//return the list of products by product name
	public List<Product> search(String character, int page, int productsPerPage) throws SQLException, NamingException {
		List<Product> lp = new ArrayList<Product>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = null;
		
		if (page == 0 && productsPerPage == 0) {
			sql = "SELECT * FROM shoppingdb.products where "
					+ "product_name like '%" + character + "%' or product_des like '%" + character + "%' or "
					+ "product_type like '%" + character + "%' or product_brand like '%" + character + "%' or "
					+ "product_type like '%" + character + "%'";
			ps = queryShoppingDB(sql);
			rs = ps.executeQuery();
		} else {
			sql = "SELECT * FROM shoppingdb.products where "
					+ "product_name like '%" + character + "%' or product_des like '%" + character + "%' or "
					+ "product_type like '%" + character + "%' or product_brand like '%" + character + "%' or "
					+ "product_type like '%" + character + "%'" + "limit ?, ?";
			ps = queryShoppingDB(sql);
			ps.setInt(1, (page - 1) * productsPerPage);
			ps.setInt(2, productsPerPage);
			rs = ps.executeQuery();
		}
		
		while (rs.next()) {
			lp.add(new Product(rs.getInt(1), rs.getString(2), rs.getString(3),
					rs.getFloat(4), rs.getString(5), rs.getString(6), rs.getString(7)));
		}
		ps.close();
		return lp;
	}
	
	public Product getProduct(String id) throws SQLException, NamingException {
		String sql = "SELECT * FROM shoppingdb.products where product_id=?";
		PreparedStatement ps = queryShoppingDB(sql);
		ps.setString(1, id);
		ResultSet rs = ps.executeQuery();
		
		rs.next();
		Product p = new Product(rs.getInt(1), rs.getString(2), rs.getString(3),
				rs.getFloat(4), rs.getString(5), rs.getString(6), rs.getString(7));
		ps.close();
		return p
	}
	
	private PreparedStatement queryShoppingDB(String sql) throws SQLException, NamingException {
		Context initContext = new InitialContext();
        Context envContext = (Context) initContext.lookup("java:comp/env");
        DataSource ds = (DataSource) envContext.lookup("jdbc/shoppingdb");
		Connection conn = ds.getConnection();
		PreparedStatement ps = conn.prepareStatement(sql);
		return ps;
	}
	
}
