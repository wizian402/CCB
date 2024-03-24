package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ITngAttendRepository {
	List<Map<String, Object>> selectAttendCd();

	void insertAtndc(@Param("attendanceDate") String attendanceDate, @Param("tngAplyNo") int tngAplyNo, @Param("tngAtndcCd") String tngAtndcCd);
	
	Map<String, Object> getTngStdnt(@Param("tngNo") String tngNo, @Param("stdntSn") String stdntSn);
	
	List<Map<String, Object>> getAttendList(@Param("tngAplyNo") int tngAplyNo);
	
	void updateTtrHr(@Param("hour") String hour, @Param("tngAplyNo") int tngAplyNo);
}
