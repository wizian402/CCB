package com.wizian.wlms.user.service;

import com.wizian.wlms.user.model.UserVO;

public interface IUserService {
	void insertUser(UserVO user);

	UserVO selectUser(String id);
}
