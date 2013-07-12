package com.rider.common.json;
/***
 *
 * @author user
 *
 */
public class MessageReqBean<T extends BaseRequestBean>{
	private String process_code;
	private String request_time;
	private PlatformEnv platform_env;
	private String sesson_id;
	private T order_content;
	public String getProcess_code() {
		return process_code;
	}
	public void setProcess_code(String process_code) {
		this.process_code = process_code;
	}
	public String getRequest_time() {
		return request_time;
	}
	public void setRequest_time(String request_time) {
		this.request_time = request_time;
	}
	public PlatformEnv getPlatform_env() {
		return platform_env;
	}
	public void setPlatform_env(PlatformEnv platform_env) {
		this.platform_env = platform_env;
	}
	public String getSesson_id() {
		return sesson_id;
	}
	public void setSesson_id(String sesson_id) {
		this.sesson_id = sesson_id;
	}
	public T getOrder_content() {
		return order_content;
	}
	public void setOrder_content(T order_content) {
		this.order_content = order_content;
	}
    

}
