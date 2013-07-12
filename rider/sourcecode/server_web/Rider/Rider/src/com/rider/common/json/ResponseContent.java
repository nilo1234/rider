package com.rider.common.json;

import java.util.ArrayList;
import java.util.List;

import com.rider.interfaces.param.AppVersionRespBean;
import com.rider.interfaces.param.Server_Info;

public class ResponseContent extends BaseResponseBean {
	private List<Server_Info>  server_info_list = new ArrayList<Server_Info>();
	private AppVersionRespBean version_info;

	public List<Server_Info> getServer_info_list() {
		return server_info_list;
	}

	public void setServer_info_list(List<Server_Info> server_info_list) {
		this.server_info_list = server_info_list;
	}

	public AppVersionRespBean getVersion_info() {
		return version_info;
	}

	public void setVersion_info(AppVersionRespBean version_info) {
		this.version_info = version_info;
	}

	
}
