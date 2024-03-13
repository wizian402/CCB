package com.wizian.cbb.user.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.user.model.UserVO;

public interface IUserRepository {
	UserVO selectUser(@Param("loginId") String loginId);

	void updateRcntLoginDt(@Param("loginId") String loginId);

	void updatePswdErrCnt(@Param("loginId") String loginId, @Param("pswdErrCnt") int pswdErrCnt);
	
	void updateUserCloseYn(@Param("loginId") String loginId, @Param("userCloseYn") String userCloseYn );
	
	void findPswd(@Param("loginId") String loginId);
	
	Map<String, Object> getUserInfo(@Param("loginId") String loginId, @Param("tableNm") String tableNm, @Param("nameSql") String nameSql, @Param("telNoSql") String telNoSql);
}
