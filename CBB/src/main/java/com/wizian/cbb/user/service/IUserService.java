package com.wizian.cbb.user.service;

import java.util.Map;

import com.wizian.cbb.user.model.UserVO;

public interface IUserService {
	UserVO selectUser(String id);

	void updateRcntLoginDt(String loginId);

	void updatePswdErrCnt(String loginId, int pswdErrCnt);

	void updateUserCloseYn(String loginId, String userCloseYn);

	Map<String, Object> getUserInfo(String loginId, String tableNm, String nameSql, String telNoSql);

	void updatePswd(String loginId, String pswd);

	void updatePswdChgDt(String userId);
}
