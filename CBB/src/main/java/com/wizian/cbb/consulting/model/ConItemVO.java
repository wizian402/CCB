package com.wizian.cbb.consulting.model;

import java.sql.Date;

public class ConItemVO {
	private String itemID;
	private String item;
	private char use;
	private String creationDate;
	private String modificationDate;
	public String getItemID() {
		return itemID;
	}
	public void setItemID(String itemID) {
		this.itemID = itemID;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public char getUse() {
		return use;
	}
	public void setUse(char use) {
		this.use = use;
	}
	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	public String getModificationDate() {
		return modificationDate;
	}
	public void setModificationDate(String modificationDate) {
		this.modificationDate = modificationDate;
	}
	
	
	@Override
	public String toString() {
		return "ConItemVO [itemID=" + itemID + ", item=" + item + ", use=" + use + ", creationDate=" + creationDate
				+ ", modificationDate=" + modificationDate + "]";
	}
	
	
	
	
	
	
}
