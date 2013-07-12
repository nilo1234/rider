package com.rider.common.json;

import com.rider.interfaces.param.AppVersionReqBean;
import com.rider.interfaces.param.LoginReqBean;
import com.rider.interfaces.param.PhoneEnv;
import com.rider.interfaces.param.RegistrationReqBean;
import com.rider.interfaces.param.Server_Info;



public class RequestContent extends BaseRequestBean{
	private Server_Info server_info;
	private AppVersionReqBean version_info;
	private PhoneEnv ev_info;
	private RegistrationReqBean r_user_info;
	private LoginReqBean l_user_info;
	
	public Server_Info getServer_info() {
		return server_info;
	}

	public void setServer_info(Server_Info server_info) {
		this.server_info = server_info;
	}

	public AppVersionReqBean getVersion_info() {
		return version_info;
	}
	public void setVersion_info(AppVersionReqBean version_info) {
		this.version_info = version_info;
	}

	public PhoneEnv getEv_info() {
		return ev_info;
	}

	public void setEv_info(PhoneEnv ev_info) {
		this.ev_info = ev_info;
	}

	public RegistrationReqBean getR_user_info() {
		return r_user_info;
	}

	public void setR_user_info(RegistrationReqBean r_user_info) {
		this.r_user_info = r_user_info;
	}

	public LoginReqBean getL_user_info() {
		return l_user_info;
	}

	public void setL_user_info(LoginReqBean l_user_info) {
		this.l_user_info = l_user_info;
	}
	
	
}
