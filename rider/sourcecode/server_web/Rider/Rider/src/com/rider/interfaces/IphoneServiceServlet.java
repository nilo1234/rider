package com.rider.interfaces;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URLDecoder;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;

import com.rider.common.FunctionInvoke;

/**
 * @author user
 *
 */
public class IphoneServiceServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("I am still alive servlet.........");
		// TODO Auto-generated method stub
		ServletInputStream sis = req.getInputStream();
		String jsonStr = URLDecoder.decode(IOUtils.toString(sis), "GBK");
		String jsonRspStr ="";
		String []tmp = jsonStr.split(",");
		String []tmp1 = tmp[0].split(":");
		String function_id = tmp1[1].substring(1,tmp1[1].length()-1);
		System.out.println(function_id);
		System.out.println(jsonStr);
		try {
			jsonRspStr=FunctionInvoke.commonInvoke(jsonStr);
			
	        resp.setContentType("text/json; charset=GBK");
	        resp.getWriter().write(jsonRspStr);
	        resp.getWriter().flush();
	        resp.getWriter().close();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//super.doGet(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doGet(req, resp);
	}
	
	

}
