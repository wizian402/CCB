package com.wizian.cbb.user.service;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.user.model.UserVO;

public interface IUserService {
	UserVO selectUser(String id);

	void updateRcntLoginDt(String loginId);

	void updatePswdErrCnt(String loginId, int pswdErrCnt);

	void updateUserCloseYn(String loginId, String userCloseYn);

	List<Map<String, Object>> getStdntInfo(String loginId);
}
