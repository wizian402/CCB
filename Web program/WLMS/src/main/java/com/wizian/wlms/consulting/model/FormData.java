package com.wizian.wlms.consulting.model;

public class FormData {
	private String itemCode;
    private String itemName;
    private String use;
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getUse() {
		return use;
	}
	public void setUse(String use) {
		this.use = use;
	}
	@Override
	public String toString() {
		return "FormData [itemCode=" + itemCode + ", itemName=" + itemName + ", use=" + use + "]";
	}
    
}
