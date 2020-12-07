package com.test.dto;

import java.util.Date;

public class DateDTO {

	private String contract_s;
 	private String contract_e;
	public String getContract_s() {
		return contract_s;
	}
	public void setContract_s(String contract_s) {
		this.contract_s = contract_s;
	}
	public String getContract_e() {
		return contract_e;
	}
	public void setContract_e(String contract_e) {
		this.contract_e = contract_e;
	}
	@Override
	public String toString() {
		return "DateDTO [contract_s=" + contract_s + ", contract_e=" + contract_e + "]";
	}
	
}
