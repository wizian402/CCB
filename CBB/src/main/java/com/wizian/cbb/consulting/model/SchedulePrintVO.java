package com.wizian.cbb.consulting.model;


public class SchedulePrintVO {
	private String scheduleId;
	private String type;
	private String counselor;
	private String counselorId;
	private String item;
	private String itemId;
	private String consultationDate;
	private String consultationTime;
	private String creationDate;
	private String studentId;
	public String getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(String scheduleId) {
		this.scheduleId = scheduleId;
	}
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
	public String getCounselorId() {
		return counselorId;
	}
	public void setCounselorId(String counselorId) {
		this.counselorId = counselorId;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	public String getConsultationDate() {
		return consultationDate;
	}
	public void setConsultationDate(String consultationDate) {
		this.consultationDate = consultationDate;
	}
	public String getConsultationTime() {
		return consultationTime;
	}
	public void setConsultationTime(String consultationTime) {
		this.consultationTime = consultationTime;
	}
	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	
	@Override
	public String toString() {
		return "SchedulePrintVO [scheduleId=" + scheduleId + ", type=" + type + ", counselor=" + counselor
				+ ", counselorId=" + counselorId + ", item=" + item + ", itemId=" + itemId + ", consultationDate="
				+ consultationDate + ", consultationTime=" + consultationTime + ", creationDate=" + creationDate
				+ ", studentId=" + studentId + "]";
	}
	

}
