package com.wizian.cbb.consulting.model;

import java.sql.Date;

public class ConItemVO {
	private String conItemsID;
	private String conItems;
	private char use;
	private String creationDate;
	private String modificationDate;
	
	
	public String getConItemsID() {
		return conItemsID;
	}
	public void setConItemsID(String conItemsID) {
		this.conItemsID = conItemsID;
	}
	public String getConItems() {
		return conItems;
	}
	public void setConItems(String conItems) {
		this.conItems = conItems;
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
		return "ConItemVO [conItemsID=" + conItemsID + ", conItems=" + conItems + ", use=" + use + ", creationDate="
				+ creationDate + ", modificationDate=" + modificationDate + "]";
	}
	
	
	
	
	
}
