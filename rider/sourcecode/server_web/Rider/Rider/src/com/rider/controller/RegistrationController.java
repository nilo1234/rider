package com.rider.controller;

import com.google.gson.Gson;
import com.rider.common.CommonValue;
import com.rider.common.DateUtil;
import com.rider.common.ReturnResult;
import com.rider.common.json.MessageReqBean;
import com.rider.common.json.MessageRspBean;
import com.rider.common.json.RequestContent;
import com.rider.interfaces.param.PhoneEnv;
import com.rider.interfaces.param.RegistrationReqBean;
import com.rider.manager.RegistrationManager;

public class RegistrationController {
	RegistrationManager registrationManager;
	public String RIDER_REGISTRATION(MessageReqBean<RequestContent> reqBean){
		MessageRspBean mrs = new MessageRspBean ();
		System.out.println(reqBean.getOrder_content().getR_user_info().getPhone_id());
		RegistrationReqBean rrb = reqBean.getOrder_content().getR_user_info();
		PhoneEnv phoneEnv = reqBean.getOrder_content().getEv_info();
		ReturnResult rrs =registrationManager.RIDER_REGISTRATION(rrb,phoneEnv);
		if(rrs.getRet()){
			mrs.setAccept_result(CommonValue.ACCEPT_RESULT_SUCCESS);
			mrs.setResponse_time(DateUtil.getResponse_time());
		}else {
			mrs.setAccept_result(CommonValue.ACCEPT_RESULT_FAIL);
			mrs.setResponse_time(DateUtil.getResponse_time());
			mrs.setResp_code(CommonValue.BUSSINESS_ERROR);
			mrs.setResp_desc(rrs.getMsg());
		}
		Gson gson = new Gson(); 
		String s = gson.toJson(mrs);
		return s;
	}
	public RegistrationManager getRegistrationManager() {
		return registrationManager;
	}
	public void setRegistrationManager(RegistrationManager registrationManager) {
		this.registrationManager = registrationManager;
	}
	
}
