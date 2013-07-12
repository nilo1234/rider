package com.rider.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

		public static String getResponse_time(){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String response_time = sdf.format(new Date());
			return response_time;
		}
		public static void main(String args[]){
			System.out.println(DateUtil.getResponse_time());
		}
}
