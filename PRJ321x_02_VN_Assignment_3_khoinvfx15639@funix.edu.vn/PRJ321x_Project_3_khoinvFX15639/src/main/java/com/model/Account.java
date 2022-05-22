package com.model;

public class Account {
	private String usr, pwd;
	private int role;
	private String name, address, phone;
	private int check;
	
	public Account() {
		
	}
	
	public Account(String usr, String pwd, int role, String name, String address, String phone, int check) {
		this.usr = usr;
		this.pwd = pwd;
		this.name = name;
		this.role = role;
		this.address = address;
		this.phone = phone;
		this.check = check;
		
	}
	
	// Getter
	public String getAddress() {
		return address;
	}
	public int getCheck() {
		return check;
	}
	public String getName() {
		return name;
	}
	public String getPhone() {
		return phone;
	}
	public String getPwd() {
		return pwd;
	}
	public int getRole() {
		return role;
	}
	public String getUsr() {
		return usr;
	}
	
	// Setter
	public void setAddress(String address) {
		this.address = address;
	}
	public void setCheck(int check) {
		this.check = check;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public void setUsr(String usr) {
		this.usr = usr;
	}
}
