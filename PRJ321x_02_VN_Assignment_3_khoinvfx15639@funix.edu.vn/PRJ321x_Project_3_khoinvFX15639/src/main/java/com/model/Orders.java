package com.model;

import java.util.Date;
import java.util.List;

public class Orders {
	private int orderId;
	private float price;
	private int status;
	private Date orderDate;
	private String discount;
	private String address;
	private String phoneNumber;
	private String userMail;
	private Date receivedDate;
	private List<ProductOrders> lp;
	
	public Orders() {
	}
	
	public Orders(int orderId, float price, int status, Date orderDate,
			String address, String phoneNumber, String userMail,
			Date receivedDate, List<ProductOrders> lp) {
		this.orderId = orderId;
		this.price = price;
		this.status = status;
		this.orderDate = orderDate;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.userMail = userMail;
		this.receivedDate = receivedDate;
		this.lp = lp;
	}
	
	public Orders(String userMail, int status, String discount,
			String address, String phoneNumber, Date receivedDate) {
		this.discount = discount;
		this.status = status;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.userMail = userMail;
		this.receivedDate = receivedDate;
	}
	
	public void setDiscount(String discount) {
		this.discount = discount;
	}
	
	public String getDiscount() {
		return discount;
	}
	
	public Date getReceivedDate() {
		return receivedDate;
	}
	
	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}
	
	public String getUserMail() {
		return userMail;
	}
	
	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}
	
	public int getOrderId() {
		return orderId;
	}
	
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	
	public float getPrice() {
		return price;
	}
	
	public void setPrice(float price) {
		this.price = price;
	}
	
	public int getStatus() {
		return status;
	}
	
	public void setStatus(int status) {
		this.status = status;
	}
	
	public Date getOrderDate() {
		return orderDate;
	}
	
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}
	
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public List<ProductOrders> getLp() {
		return lp;
	}
	
	public void setLp(List<ProductOrders> lp) {
		this.lp = lp;
	}
	
	
}
