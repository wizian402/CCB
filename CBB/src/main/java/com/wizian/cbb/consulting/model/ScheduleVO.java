package com.wizian.cbb.consulting.model;

import java.util.Arrays;

public class ScheduleVO {
	private String id;
	private int year;
    private int month;
    private int day;
    private boolean[] timeSlots;
    
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getDay() {
		return day;
	}
	public void setDay(int day) {
		this.day = day;
	}
	public boolean[] getTimeSlots() {
		return timeSlots;
	}
	public void setTimeSlots(boolean[] timeSlots) {
		this.timeSlots = timeSlots;
	}
	
	@Override
	public String toString() {
		return "ScheduleVO [id=" + id + ", year=" + year + ", month=" + month + ", day=" + day + ", timeSlots="
				+ Arrays.toString(timeSlots) + "]";
	}
}
