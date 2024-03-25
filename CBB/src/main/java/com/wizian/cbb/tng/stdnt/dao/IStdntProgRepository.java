package com.wizian.cbb.tng.stdnt.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface IStdntProgRepository {
	Map<String, Object> selectTngStdnt(@Param("loginId") String loginId);
	
	Map<String, Object> getTngStdnt(@Param("tngNo") String tngNo, @Param("stdntSn") String stdntSn);
	
	List<Map<String, Object>> getAttendList(@Param("tngAplyNo") int tngAplyNo);
}
