package com.wizian.cbb.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.user.dao.IUserRepository;
import com.wizian.cbb.user.model.UserVO;

@Service
public class UserService implements IUserService {
	@Autowired
	IUserRepository userRepository;

	@Override
	public void insertUser(UserVO user) {
		userRepository.insertUser(user);
	}

	@Override
	public UserVO selectUser(String loginId) {
		return userRepository.selectUser(loginId);
	}
}
