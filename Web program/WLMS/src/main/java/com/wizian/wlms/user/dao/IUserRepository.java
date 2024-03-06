package com.wizian.wlms.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.wlms.user.model.UserVO;

public interface IUserRepository {
	void insertUser(UserVO user);

	void deleteUser(@Param("id") String id, @Param("password") String password);

	void updateUser(UserVO user);
	
	List<Map<String, Object>> getAllGroupName();

	UserVO selectUser(@Param("id") String id);
}
