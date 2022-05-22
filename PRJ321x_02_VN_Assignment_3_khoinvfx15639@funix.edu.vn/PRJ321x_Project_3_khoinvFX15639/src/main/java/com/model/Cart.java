package com.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {
	private List<Product> items;//list of item in cart
	
	public Cart() {
		items = new ArrayList<Product>();
	}
	
	//add new product to cart
	public void add(Product ci) {
		for (Product x : items) {
			if (ci.getId() == x.getId()) {
				x.setNumber(x.getNumber() + 1);
				return;
			}
		}
		items.add(ci);
	}
	
	//remove a product from cart
	public void remove(int id) {
		for (int i = 0; i < items.size(); i++) {
			if (items.get(i).getId() == id) {
				items.remove(i);
				break;
			}
		}
	}
	
	//return total amount of cart
	public double getAmount() {
		double s = 0;
		for (Product product : items) {
			s += product.getPrice() * product.getNumber();
		}
		return Math.round(s * 100.0) / 100.0;
	}
	
	//get list of products in cart
	public List<Product> getItems() {
		return items;
	}
}
