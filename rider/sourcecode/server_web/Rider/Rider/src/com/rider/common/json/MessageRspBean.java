package com.rider.common.json;
/**
 * 
 * @author user
 *
 */
public class MessageRspBean <T extends BaseResponseBean>{
	private String response_time;
	private int accept_result;
	private String resp_desc;
	private String resp_code;
	private T order_content;
	public String getResponse_time() {
		return response_time;
	}
	public void setResponse_time(String response_time) {
		this.response_time = response_time;
	}
	public int getAccept_result() {
		return accept_result;
	}
	public void setAccept_result(int accept_result) {
		this.accept_result = accept_result;
	}
	public String getResp_desc() {
		return resp_desc;
	}
	public void setResp_desc(String resp_desc) {
		this.resp_desc = resp_desc;
	}
	public String getResp_code() {
		return resp_code;
	}
	public void setResp_code(String resp_code) {
		this.resp_code = resp_code;
	}
	public T getOrder_content() {
		return order_content;
	}
	public void setOrder_content(T order_content) {
		this.order_content = order_content;
	}
	
	
	
}
