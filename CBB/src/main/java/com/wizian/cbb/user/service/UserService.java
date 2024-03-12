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
	public UserVO selectUser(String loginId) {
		return userRepository.selectUser(loginId);
	}

	@Override
	public void updateRcntLoginDt(String loginId) {
		userRepository.updateRcntLoginDt(loginId);
	}
	
	@Override
	public void updatePswdErrCnt(String loginId) {
		userRepository.updatePswdErrCnt(loginId);
	}
}
