package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface ITngAfpRepository {
	Map<String, Object> companyNm(@Param("loginId") String loginId);

	Map<String, Object> selectBzentyUserNo(@Param("loginId") String loginId);

	void insertTng(@Param("bzentyUserNo") String bzentyUserNo, @Param("semester") String semester,
			@Param("tngNope") String tngNope, @Param("tngStYmd") String tngStYmd, @Param("tngEndYmd") String tngEndYmd,
			@Param("aplyEndDt") String aplyEndDt, @Param("prgrsStts") String prgrsStts,
			@Param("ttlTngHr") String ttlTngHr, @Param("cmcrsHr") String cmcrsHr,
			@Param("tkcgTaskNm") String tkcgTaskNm);
	List<Map<String, Object>> selectPrgrsStts();
}
