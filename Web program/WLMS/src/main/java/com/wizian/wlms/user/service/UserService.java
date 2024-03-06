package com.wizian.wlms.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.wlms.user.dao.IUserRepository;
import com.wizian.wlms.user.model.UserVO;

@Service
public class UserService implements IUserService {

	@Autowired
	IUserRepository userRepository;

	@Override
	public void insertUser(UserVO user) {
		userRepository.insertUser(user);
	}

	@Override
	public UserVO selectUser(String id) {
		return userRepository.selectUser(id);
	}

}
