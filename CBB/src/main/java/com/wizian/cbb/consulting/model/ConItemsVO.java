package com.wizian.cbb.consulting.model;

import java.sql.Date;

public class ConItemsVO {
	private int counseling_items_id;
	private String counseling_items_name;
	private char is_used;
	private Date creation_date;
	private Date modification_date;
	public int getCounseling_items_id() {
		return counseling_items_id;
	}
	public void setCounseling_items_id(int counseling_items_id) {
		this.counseling_items_id = counseling_items_id;
	}
	public String getCounseling_items_name() {
		return counseling_items_name;
	}
	public void setCounseling_items_name(String counseling_items_name) {
		this.counseling_items_name = counseling_items_name;
	}
	public char getIs_used() {
		return is_used;
	}
	public void setIs_used(char is_used) {
		this.is_used = is_used;
	}
	public Date getCreation_date() {
		return creation_date;
	}
	public void setCreation_date(Date creation_date) {
		this.creation_date = creation_date;
	}
	public Date getModification_date() {
		return modification_date;
	}
	public void setModification_date(Date modification_date) {
		this.modification_date = modification_date;
	}
	
	
	@Override
	public String toString() {
		return "ConitemsVO [counseling_items_id=" + counseling_items_id + ", counseling_items_name="
				+ counseling_items_name + ", is_used=" + is_used + ", creation_date=" + creation_date
				+ ", modification_date=" + modification_date + "]";
	}	
}
