package com.wizian.cbb.user.service;

import com.wizian.cbb.user.model.UserVO;

public interface IUserService {
	UserVO selectUser(String id);
	void updateRcntLoginDt(String loginId);
}
