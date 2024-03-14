package com.wizian.cbb.user.service;

import java.util.Map;

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
	public void updatePswdErrCnt(String loginId, int pswdErrCnt) {
		userRepository.updatePswdErrCnt(loginId, pswdErrCnt);
	}

	@Override
	public void updateUserCloseYn(String loginId, String userCloseYn) {
		userRepository.updateUserCloseYn(loginId, userCloseYn);
	}

	@Override
	public Map<String, Object> getUserInfo(String loginId, String tableNm, String nameSql, String telNoSql) {
		return userRepository.getUserInfo(loginId, tableNm, nameSql, telNoSql);
	}

	@Override
	public void updatePswd(String loginId, String pswd) {
		userRepository.updatePswd(loginId, pswd);
	}
}
