package com.rider.manager;

import com.rider.common.ReturnResult;
import com.rider.dao.RegistrationDao;
import com.rider.interfaces.param.PhoneEnv;
import com.rider.interfaces.param.RegistrationReqBean;

public class RegistrationManager {
	RegistrationDao registrationDao;
	public ReturnResult RIDER_REGISTRATION(RegistrationReqBean rrb,PhoneEnv phoneEnv){
		ReturnResult rrs = new ReturnResult();
		//1.注册的话首先去判断邮箱和昵称是否被用了 如果备用则返回错误
		RegistrationReqBean reqBean1 = registrationDao.isUsedUserName(rrb);
		if(reqBean1!=null){
			rrs.setRet(false);
			rrs.setMsg("用户名重复");
			return rrs;
		}
		RegistrationReqBean reqBean2 = registrationDao.isUsedEmailAddr(rrb);
		if(reqBean2!=null){
			rrs.setRet(false);
			rrs.setMsg("该邮箱已注册");
			return rrs;
		}
		String id = registrationDao.getPhoneSeq();
		rrb.setPhone_id(id);
		phoneEnv.setPhone_id(id);
		registrationDao.RIDER_REGISTRATION_USER(rrb);
	    registrationDao.RIDER_REGISTRATION_PHONE(phoneEnv);
	    rrs.setRet(true);
	    return rrs;
		
	}
	public RegistrationDao getRegistrationDao() {
		return registrationDao;
	}
	public void setRegistrationDao(RegistrationDao registrationDao) {
		this.registrationDao = registrationDao;
	}

}
