package com.rider.controller;

import com.google.gson.Gson;
import com.rider.common.CommonValue;
import com.rider.common.DateUtil;
import com.rider.common.json.MessageReqBean;
import com.rider.common.json.MessageRspBean;
import com.rider.common.json.RequestContent;
import com.rider.common.json.ResponseContent;
import com.rider.interfaces.param.AppVersionRespBean;
import com.rider.manager.AppVersionManager;

public class AppVersionController {
    public AppVersionManager appVersionManager;
	
	public String RICH_QRY_APPVERSION(MessageReqBean<RequestContent> reqBean){
         AppVersionRespBean version_info = new AppVersionRespBean();
         System.out.println(reqBean.getOrder_content().getVersion_info());
		 AppVersionRespBean resp=appVersionManager.RICH_QRY_APPVERSION(reqBean.getOrder_content().getVersion_info());
		 MessageRspBean <ResponseContent> rs = new MessageRspBean <ResponseContent>();
		 ResponseContent order_content = new ResponseContent();
		 if(resp!=null){
		 version_info.setIs_force_update(resp.getIs_force_update());
		 version_info.setIs_new_version(resp.getIs_new_version());
		 version_info.setNew_version(resp.getNew_version());
		 version_info.setSoftware_file(resp.getSoftware_file());
		 version_info.setSoftware_name(resp.getSoftware_name());
		 version_info.setVersion_release_time(resp.getVersion_release_time());
		 version_info.setSoftware_path(resp.getSoftware_path());
		 version_info.setVersion_descrip(resp.getVersion_descrip());
		 order_content.setVersion_info(version_info);
		 rs.setOrder_content(order_content);
		 rs.setAccept_result(CommonValue.ACCEPT_RESULT_SUCCESS);
		 rs.setResponse_time(DateUtil.getResponse_time());
		 }
		 
		 Gson gson = new Gson();
		 
		 String s = gson.toJson(rs);
		return s;
	}
	public void setAppVersionManager(AppVersionManager appVersionManager) {
		this.appVersionManager = appVersionManager;
	}
	public AppVersionManager getAppVersionManager() {
		return appVersionManager;
	}
	public static void main(String args[]){
		
	}
}
