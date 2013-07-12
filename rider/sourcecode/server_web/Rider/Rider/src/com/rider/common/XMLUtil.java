package com.rider.common;

import java.net.URL;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
public class XMLUtil {
	static Document doc = null;
	static List rowList  = null;
	static {
		SAXReader saxReader = new SAXReader();  
		try {
			URL url =Thread.currentThread().getContextClassLoader().getResource("config/service-config.xml");
			doc = saxReader.read(url);
			rowList = doc.selectNodes("//services/service");
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static String getReqBeanByServiceId(String serviceId){
		
		 for(Iterator iter = rowList.iterator();iter.hasNext();){    
			Element element = (Element)iter.next();  
			String id=element.attributeValue("id");
			if (id.equals(serviceId)){
				return element.attributeValue("req");
			}
		 }
		return "不存在reqBean";
	}

	public static String getFunctionByServiceId(String serviceId){
		 for(Iterator iter = rowList.iterator();iter.hasNext();){      
				Element element = (Element)iter.next();  
				String id=element.attributeValue("id");
				if (id.equals(serviceId)){
					return element.attributeValue("method");
				}
			 }
			return "不存在method";
	}
	public static String getClassByServiceId(String serviceId){
		 for(Iterator iter = rowList.iterator();iter.hasNext();){      
				Element element = (Element)iter.next();  
				String id=element.attributeValue("id");
				if (id.equals(serviceId)){
					return element.attributeValue("class");
				}
			 }
			return "不存在class";
	}
	public static String getObjByServiceId(String serviceId){
		 for(Iterator iter = rowList.iterator();iter.hasNext();){      
				Element element = (Element)iter.next();  
				String id=element.attributeValue("id");
				if (id.equals(serviceId)){
					return element.attributeValue("obj");
				}
			 }
			return "不存在obj";
	}
	public static void main(String args[]){
		XMLUtil xmlUtil = new XMLUtil();
	}

}
