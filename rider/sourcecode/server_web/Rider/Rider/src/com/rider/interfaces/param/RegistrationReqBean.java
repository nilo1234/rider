package com.rider.interfaces.param;

public class RegistrationReqBean {
	
	private String user_id;
	private String password;
	private String email_addr;
	private String sms_verifycode;
	private String ext_data;
	private String user_img;
	private String user_name;
	private String phone_id;
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getPhone_id() {
		return phone_id;
	}
	public void setPhone_id(String phone_id) {
		this.phone_id = phone_id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail_addr() {
		return email_addr;
	}
	public void setEmail_addr(String email_addr) {
		this.email_addr = email_addr;
	}
	public String getSms_verifycode() {
		return sms_verifycode;
	}
	public void setSms_verifycode(String sms_verifycode) {
		this.sms_verifycode = sms_verifycode;
	}
	public String getExt_data() {
		return ext_data;
	}
	public void setExt_data(String ext_data) {
		this.ext_data = ext_data;
	}
	public String getUser_img() {
		return user_img;
	}
	public void setUser_img(String user_img) {
		this.user_img = user_img;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	

}
