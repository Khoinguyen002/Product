package com.model;

public class ProductOrders {
	private int orderId;
	private int amountProduct;//quantity of selected product
	private String nameProduct;
	private String src;
	private double price;
	
	public ProductOrders(int OrderId, int amountProduct, String nameProduct, double price, String src) {
		this.orderId = OrderId;
		this.amountProduct = amountProduct;
		this.nameProduct = nameProduct;
		this.src = src;
		this.price = price;
	}
	
	public String getNameProduct() {
		return nameProduct;
	}
	
	public void setNameProduct(String nameProduct) {
		this.nameProduct = nameProduct;
	}
	
	public int getOrderId() {
		return orderId;
	}
	
	public int getAmountProduct() {
		return amountProduct;
	}
	
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	
	public void setAmountProduct(int amountProduct) {
		this.amountProduct = amountProduct;
	}
	
	public double getPrice() {
		return price;
	}
	
	public String getSrc() {
		return src;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
	
	public void setSrc(String src) {
		this.src = src;
	}
}
