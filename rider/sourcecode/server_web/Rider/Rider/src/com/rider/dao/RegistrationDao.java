package com.rider.dao;

import com.rider.interfaces.param.PhoneEnv;
import com.rider.interfaces.param.RegistrationReqBean;

public interface RegistrationDao {
	public RegistrationReqBean isUsedUserName(RegistrationReqBean reqBean);
	public RegistrationReqBean isUsedEmailAddr(RegistrationReqBean reqBean);
	public String getPhoneSeq();
	public void RIDER_REGISTRATION_USER(RegistrationReqBean reqBean);
	public void RIDER_REGISTRATION_PHONE(PhoneEnv phoneEnv);

}
