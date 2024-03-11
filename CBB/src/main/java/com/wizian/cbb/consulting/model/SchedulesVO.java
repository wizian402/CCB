package com.wizian.cbb.consulting.model;

import java.sql.Date;

public class SchedulesVO {
	private String type;
	private String counselor;
	private String item;
	private Date consultationDate;
	private String consultationTime;
	private Date creationDate;
	
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCounselor() {
		return counselor;
	}
	public void setCounselor(String counselor) {
		this.counselor = counselor;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public Date getConsultationDate() {
		return consultationDate;
	}
	public void setConsultationDate(Date consultationDate) {
		this.consultationDate = consultationDate;
	}
	public String getConsultationTime() {
		return consultationTime;
	}
	public void setConsultationTime(String consultationTime) {
		this.consultationTime = consultationTime;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	@Override
	public String toString() {
		return "SchedulesVO [type=" + type + ", counselor=" + counselor + ", item=" + item + ", consultationDate="
				+ consultationDate + ", consultationTime=" + consultationTime + ", creationDate=" + creationDate + "]";
	}
	

}
