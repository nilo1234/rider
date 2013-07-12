package com.rider.manager;

import com.rider.common.ReturnResult;
import com.rider.dao.LoginDao;
import com.rider.interfaces.param.LoginReqBean;
import com.rider.interfaces.param.PhoneEnv;
import com.rider.interfaces.param.UserLoginReqBean;

public class LoginManager {
	private LoginDao loginDao;
	public ReturnResult userLogin(LoginReqBean loginReqBean,PhoneEnv phoneEnv){
		ReturnResult ret = new ReturnResult();
		LoginReqBean loginReq = loginDao.RIDER_LOGIN_INFO(loginReqBean);
		UserLoginReqBean ureqBean = new UserLoginReqBean();
		ureqBean.setUser_id(loginReq.getUser_id());
		if (loginReq !=null){
			 String phone_id = loginDao.getPhoneId();
			 ureqBean.setPhone_id(phone_id);
			 loginDao.insertUserLogin(ureqBean);
			 phoneEnv.setPhone_id(phone_id);
			 loginDao.insertPhoneEnv(phoneEnv);
			 ret.setRet(true);
		} else{
			ret.setRet(false);
			ret.setMsg("不存在该用户");
		}
		
		return ret;
		
	}
	public LoginDao getLoginDao() {
		return loginDao;
	}
	public void setLoginDao(LoginDao loginDao) {
		this.loginDao = loginDao;
	}
	
}
