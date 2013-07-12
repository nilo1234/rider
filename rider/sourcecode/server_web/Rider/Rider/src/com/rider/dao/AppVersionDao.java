package com.rider.dao;

import com.rider.interfaces.param.AppVersionReqBean;
import com.rider.interfaces.param.AppVersionRespBean;

public interface AppVersionDao  {
	AppVersionRespBean RICH_QRY_APPVERSION(AppVersionReqBean appVersionReqBean);
	
}
