package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ITngRcdRepository {

	Map<String, Object> getTngStdnt(@Param("tngNo") String tngNo, @Param("stdntSn") String stdntSn);

	Map<String, Object> selectBzentyUserNo(@Param("loginId") String loginId);

	void insertRcd(@Param("tngAplyNo") int tngAplyNo, @Param("bzentyUserNo") String bzentyUserNo,
			@Param("logDate") String logDate, @Param("evlCn") String evlCn);
	
	List<Map<String, Object>> selectRcdList(@Param("tngAplyNo") int tngAplyNo);

	void updateRcd(@Param("tngAplyNo") int tngAplyNo, @Param("bzentyUserNo") String bzentyUserNo,
			@Param("logDate") String logDate, @Param("evlCn") String evlCn);

	void deleteRcd(@Param("tngAplyNo") int tngAplyNo, @Param("bzentyUserNo") String bzentyUserNo,
			@Param("logDate") String logDate, @Param("evlCn") String evlCn);
}
