package com.wizian.cbb.recruit.model;

import java.sql.Date;

public class RcrPbancVO {

	private int pbancSn;
	private String pbancName;
	private int numRcr;
	private int slry;
	private String pbancContent;
	private Date endYMD;
	private String aprvYN;
	private Date startDT;
	private String epmType;
	private String rcrStatus;
	private String bizRegNum;
	public int getPbancSn() {
		return pbancSn;
	}
	public void setPbancSn(int pbancSn) {
		this.pbancSn = pbancSn;
	}
	public String getPbancName() {
		return pbancName;
	}
	public void setPbancName(String pbancName) {
		this.pbancName = pbancName;
	}
	public int getNumRcr() {
		return numRcr;
	}
	public void setNumRcr(int numRcr) {
		this.numRcr = numRcr;
	}
	public int getSlry() {
		return slry;
	}
	public void setSlry(int slry) {
		this.slry = slry;
	}
	public String getPbancContent() {
		return pbancContent;
	}
	public void setPbancContent(String pbancContent) {
		this.pbancContent = pbancContent;
	}
	public Date getEndYMD() {
		return endYMD;
	}
	public void setEndYMD(Date endYMD) {
		this.endYMD = endYMD;
	}
	public String getAprvYN() {
		return aprvYN;
	}
	public void setAprvYN(String aprvYN) {
		this.aprvYN = aprvYN;
	}
	public Date getStartDT() {
		return startDT;
	}
	public void setStartDT(Date startDT) {
		this.startDT = startDT;
	}
	public String getEpmType() {
		return epmType;
	}
	public void setEpmType(String epmType) {
		this.epmType = epmType;
	}
	public String getRcrStatus() {
		return rcrStatus;
	}
	public void setRcrStatus(String rcrStatus) {
		this.rcrStatus = rcrStatus;
	}
	public String getBizRegNum() {
		return bizRegNum;
	}
	public void setBizRegNum(String bizRegNum) {
		this.bizRegNum = bizRegNum;
	}
	@Override
	public String toString() {
		return "RcrPbancVO [pbancSn=" + pbancSn + ", pbancName=" + pbancName + ", numRcr=" + numRcr + ", slry=" + slry
				+ ", pbancContent=" + pbancContent + ", endYMD=" + endYMD + ", aprvYN=" + aprvYN + ", startDT="
				+ startDT + ", epmType=" + epmType + ", rcrStatus=" + rcrStatus + ", bizRegNum=" + bizRegNum + "]";
	}
	
	
	
	
	
}
