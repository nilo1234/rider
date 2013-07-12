package com.rider.common;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.rider.common.json.MessageReqBean;
import com.rider.common.json.RequestContent;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * 
 * 
 * @author wuzeping
 *
 */

public class FunctionInvoke {
	static ApplicationContext context =null;
	static{
		if(context==null){
			context = new ClassPathXmlApplicationContext("config/application-context-main.xml");

		}
		}
	public static String commonInvoke(String jsonStr) throws ClassNotFoundException, SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException{
		System.out.println("json::::::::"+jsonStr);
		Gson gson = new Gson();
		java.lang.reflect.Type type=new TypeToken<MessageReqBean<RequestContent>>(){}.getType();
		MessageReqBean<RequestContent> reqBean = gson.fromJson(jsonStr,type);
		String function_id =reqBean.getProcess_code();
		String req = XMLUtil.getReqBeanByServiceId(function_id);
		String function = XMLUtil.getFunctionByServiceId(function_id);
		String cls = XMLUtil.getClassByServiceId(function_id);
		String objName = XMLUtil.getObjByServiceId(function_id);
	    System.out.println("obj>>>>>>"+objName);
		Object obj =context.getBean(objName);
		System.out.println(obj.getClass());
		System.out.println("req:::::::::::::"+req);
		System.out.println("function:::::::::::::"+function);
		System.out.println("cls:::::::::::::"+cls);
		Class executeClass = obj.getClass();
		Object executeObj = obj;
		Method executeMethod = executeClass.getMethod(function,MessageReqBean.class);
		return (String) executeMethod.invoke(executeObj, reqBean);	
	}
	
	

}
