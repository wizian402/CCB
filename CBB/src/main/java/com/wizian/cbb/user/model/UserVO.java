package com.wizian.cbb.user.model;

import java.sql.Timestamp;

public class UserVO {
	private String userNo;
	private String userGroupCd;
	private String loginId;
	private String pswd;
	private Timestamp rcntLoginDt;
	private Timestamp pswdChgDt;
	private int pswdErrCnt;
	private String userCloseYn;

	public String getUserNo() {
		return userNo;
	}

	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}

	public String getUserGroupCd() {
		return userGroupCd;
	}

	public void setUserGroupCd(String userGroupCd) {
		this.userGroupCd = userGroupCd;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getPswd() {
		return pswd;
	}

	public void setPswd(String pswd) {
		this.pswd = pswd;
	}

	public Timestamp getRcntLoginDt() {
		return rcntLoginDt;
	}

	public void setRcntLoginDt(Timestamp rcntLoginDt) {
		this.rcntLoginDt = rcntLoginDt;
	}

	public Timestamp getPswdChgDt() {
		return pswdChgDt;
	}

	public void setPswdChgDt(Timestamp pswdChgDt) {
		this.pswdChgDt = pswdChgDt;
	}

	public int getPswdErrCnt() {
		return pswdErrCnt;
	}

	public void setPswdErrCnt(int pswdErrCnt) {
		this.pswdErrCnt = pswdErrCnt;
	}

	public String getUserCloseYn() {
		return userCloseYn;
	}

	public void setUserCloseYn(String userCloseYn) {
		this.userCloseYn = userCloseYn;
	}
}
