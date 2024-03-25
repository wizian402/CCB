package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ITngProgRepository {
	List<Map<String, Object>> tngPerStdntList(@Param("tngNo") String tngNo);

	Map<String, Object> getTngStdnt(@Param("tngNo") String tngNo, @Param("stdntSn") String stdntSn);

	Map<String, Object> getBzentyUserNo(@Param("tngNo") String tngNo);

	void insertTngGrd(@Param("tngAplyNo") int tngAplyNo, @Param("bzentyUserNo") String bzentyUserNo,
			@Param("semester") String semester, @Param("score") int score, @Param("grd") String grd);
	
	void updateIndstEvlYn(@Param("tngNo") String tngNo, @Param("stdntSn") String stdntSn);
}
