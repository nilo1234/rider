package com.rider.interfaces.param;
/**
 * 手机应用版本服务返回Bean
 * @author user
 *
 */
public class AppVersionRespBean {
	private int is_new_version;
	private String new_version;
	private String software_name;
	private String version_release_time;
	private int is_force_update;
	private String software_file;
	private String software_path;
	private String version_descrip;
	
	public int getIs_new_version() {
		return is_new_version;
	}
	public void setIs_new_version(int is_new_version) {
		this.is_new_version = is_new_version;
	}
	public String getNew_version() {
		return new_version;
	}
	public void setNew_version(String new_version) {
		this.new_version = new_version;
	}
	public String getSoftware_name() {
		return software_name;
	}
	public void setSoftware_name(String software_name) {
		this.software_name = software_name;
	}
	public String getVersion_release_time() {
		return version_release_time;
	}
	public void setVersion_release_time(String version_release_time) {
		this.version_release_time = version_release_time;
	}
	public int getIs_force_update() {
		return is_force_update;
	}
	public void setIs_force_update(int is_force_update) {
		this.is_force_update = is_force_update;
	}
	public String getSoftware_file() {
		return software_file;
	}
	public void setSoftware_file(String software_file) {
		this.software_file = software_file;
	}
	public String getSoftware_path() {
		return software_path;
	}
	public void setSoftware_path(String software_path) {
		this.software_path = software_path;
	}
	public String getVersion_descrip() {
		return version_descrip;
	}
	public void setVersion_descrip(String version_descrip) {
		this.version_descrip = version_descrip;
	}
	
}
