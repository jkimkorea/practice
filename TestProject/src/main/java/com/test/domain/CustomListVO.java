package com.test.domain;

public class CustomListVO {

	private String busi_num;
	private String custom;
	
	public String getBusi_num() {
		return busi_num;
	}
	public void setBusi_num(String busi_num) {
		this.busi_num = busi_num;
	}
	public String getCustom() {
		return custom;
	}
	public void setCustom(String custom) {
		this.custom = custom;
	}
	
	@Override
	public String toString() {
		return "CustomListVO [busi_num=" + busi_num + ", custom=" + custom + "]";
	}
	
}
