package com.wizian.cbb.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.user.model.UserVO;

public interface IUserRepository {
	void insertUser(UserVO user);

	void deleteUser(@Param("loginId") String loginId, @Param("password") String pswd);

	void updateUser(UserVO user);

	List<Map<String, Object>> getAllGroupName();

	UserVO selectUser(@Param("loginId") String loginId);
}
