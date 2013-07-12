package com.rider.interfaces.param;
/**
 * 手机应用版本请求Bean
 * @author user
 *
 */
public class AppVersionReqBean {
	private String curr_version;
	private String app_id;
	public String getCurr_version() {
		return curr_version;
	}
	public void setCurr_version(String curr_version) {
		this.curr_version = curr_version;
	}
	public String getApp_id() {
		return app_id;
	}
	public void setApp_id(String app_id) {
		this.app_id = app_id;
	}
	
}
