package com.wizian.cbb.user.service;

import com.wizian.cbb.user.model.UserVO;

public interface IUserService {
	void insertUser(UserVO user);

	UserVO selectUser(String id);
}
