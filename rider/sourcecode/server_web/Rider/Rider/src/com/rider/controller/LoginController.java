package com.rider.controller;

import com.google.gson.Gson;
import com.rider.common.CommonValue;
import com.rider.common.DateUtil;
import com.rider.common.ReturnResult;
import com.rider.common.json.MessageReqBean;
import com.rider.common.json.MessageRspBean;
import com.rider.common.json.RequestContent;
import com.rider.common.json.ResponseContent;
import com.rider.interfaces.param.LoginReqBean;
import com.rider.interfaces.param.PhoneEnv;
import com.rider.manager.LoginManager;

public class LoginController {
    private LoginManager loginManager;
	public String userLogin(MessageReqBean<RequestContent> reqBean){
		MessageRspBean<ResponseContent> rspBean = new MessageRspBean<ResponseContent>();
		LoginReqBean lrb = reqBean.getOrder_content().getL_user_info();
		PhoneEnv pev = reqBean.getOrder_content().getEv_info();
		ReturnResult rrs = loginManager.userLogin(lrb,pev);
		if(rrs.getRet()){
			rspBean.setAccept_result(CommonValue.ACCEPT_RESULT_SUCCESS);
			rspBean.setResponse_time(DateUtil.getResponse_time());
		} else {
			rspBean.setAccept_result(CommonValue.ACCEPT_RESULT_FAIL);
			rspBean.setResponse_time(DateUtil.getResponse_time());
			rspBean.setResp_code(CommonValue.BUSSINESS_ERROR);
			rspBean.setResp_desc(rrs.getMsg());
		}
		Gson gson = new Gson();
		return gson.toJson(rspBean);
		
		
	}
	public LoginManager getLoginManager() {
		return loginManager;
	}
	public void setLoginManager(LoginManager loginManager) {
		this.loginManager = loginManager;
	}
	
}
