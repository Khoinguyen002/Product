package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.model.Account;

public class ListAccountDAO {
	public void insertAccount(Account acc) throws SQLException, NamingException {
		String sql = "insert into shoppingdb.account (user_mail, password, account_role, user_name, user_address, user_phone)"
				+ "values (?, ?, ?, ?, ?, ?)";
		PreparedStatement ps = queryShoppingDB(sql);
		
		ps.setString(1, acc.getUsr());
		ps.setString(2, acc.getPwd());
		ps.setInt(3, acc.getRole());
		ps.setString(4, acc.getName());
		ps.setString(5, acc.getAddress());
		ps.setString(6, acc.getPhone());
		ps.executeUpdate();
	}
	
	public Account accountCheck(String user_mail, String pwd) throws SQLException, NamingException {
		String sql = "select * from shoppingdb.account where user_mail=? and password=?";
		PreparedStatement ps = queryShoppingDB(sql);
		
		ps.setString(1, user_mail);
		ps.setString(2, pwd);
		ResultSet rs = ps.executeQuery();
		
		while (rs.next()) {
			Account acc = new Account(rs.getString(1), rs.getString(2), rs.getInt(3), 
					rs.getString(4), rs.getString(5), rs.getString(6), 0);
			ps.close();
			return acc;
		} return null;
	}
	
	public boolean isValidAccount(String user_mail) throws SQLException, NamingException {
		String sql = "select count(*) from shoppingdb.account where user_mail=?";
		PreparedStatement ps = queryShoppingDB(sql);
		
		ps.setString(1, user_mail);
		ResultSet rs = ps.executeQuery();
		rs.next();
		if (rs.getInt(1) == 1) {
			ps.close();
			return true;
		} return false;
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
