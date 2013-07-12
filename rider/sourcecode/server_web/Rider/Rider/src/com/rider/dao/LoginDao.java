package com.rider.dao;

import com.rider.interfaces.param.LoginReqBean;
import com.rider.interfaces.param.PhoneEnv;
import com.rider.interfaces.param.UserLoginReqBean;

public interface LoginDao {
	public String getPhoneId();
	public LoginReqBean RIDER_LOGIN_INFO(LoginReqBean reqBean);
	public void insertUserLogin(UserLoginReqBean reqBean);
	public void insertPhoneEnv(PhoneEnv phoneEnv);
	
}
