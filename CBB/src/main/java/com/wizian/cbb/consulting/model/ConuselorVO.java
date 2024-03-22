package com.wizian.cbb.consulting.model;

public class ConuselorVO {
	private String sonuselorId;
	private String name;
	private String phone;
	private String email;
	private String birth;
	private String address;
	private String item;
	private String type;
	private String userNum;
	private String gender;
	
	public String getSonuselorId() {
		return sonuselorId;
	}
	public void setSonuselorId(String sonuselorId) {
		this.sonuselorId = sonuselorId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUserNum() {
		return userNum;
	}
	public void setUserNum(String userNum) {
		this.userNum = userNum;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	@Override
	public String toString() {
		return "ConuselorVO [sonuselorId=" + sonuselorId + ", name=" + name + ", phone=" + phone + ", email=" + email
				+ ", birth=" + birth + ", address=" + address + ", item=" + item + ", type=" + type + ", userNum="
				+ userNum + ", gender=" + gender + "]";
	}
	
	

}
