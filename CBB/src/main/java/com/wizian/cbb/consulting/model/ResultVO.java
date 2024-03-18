package com.wizian.cbb.consulting.model;

public class ResultVO {
	
	private String type;
	private String counselor;
	private String item;
	private String student;
	private String content;
	private String consultationDate;
	private String time;
	private String creationDate;
	
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
	public String getStudent() {
		return student;
	}
	public void setStudent(String student) {
		this.student = student;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getConsultationDate() {
		return consultationDate;
	}
	public void setConsultationDate(String consultationDate) {
		this.consultationDate = consultationDate;
	}
	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	@Override
	public String toString() {
		return "ResultVO [type=" + type + ", counselor=" + counselor + ", item=" + item + ", student=" + student
				+ ", content=" + content + ", consultationDate=" + consultationDate + ", time=" + time
				+ ", creationDate=" + creationDate + "]";
	}
	
	
	
	
	
}
