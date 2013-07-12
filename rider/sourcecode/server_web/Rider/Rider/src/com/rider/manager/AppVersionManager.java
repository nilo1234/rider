package com.rider.manager;

import com.rider.dao.AppVersionDao;
import com.rider.interfaces.param.AppVersionReqBean;
import com.rider.interfaces.param.AppVersionRespBean;

public class AppVersionManager {
	private AppVersionDao appVersionDao;
	public AppVersionManager(){
		System.out.println("初始化AppVersionManager");
	}
	public AppVersionRespBean RICH_QRY_APPVERSION(AppVersionReqBean reqBean) {
		return	 appVersionDao.RICH_QRY_APPVERSION(reqBean);
		
	
	}
	public AppVersionDao getAppVersionDao() {
		return appVersionDao;
	}
	public void setAppVersionDao(AppVersionDao appVersionDao) {
		this.appVersionDao = appVersionDao;
	}
   
}
