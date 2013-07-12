package com.rider.interfaces.param;

public class LoginReqBean {
	private String user_id;
	private int phone_id;
	private String email;
	private String password;
	private String ext_data;
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getPhone_id() {
		return phone_id;
	}
	public void setPhone_id(int phone_id) {
		this.phone_id = phone_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getExt_data() {
		return ext_data;
	}
	public void setExt_data(String ext_data) {
		this.ext_data = ext_data;
	}
	

}
