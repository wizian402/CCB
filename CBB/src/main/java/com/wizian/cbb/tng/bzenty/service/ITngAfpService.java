package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

public interface ITngAfpService {
	Map<String, Object> companyNm(String loginId);

	Map<String, Object> selectBzentyUserNo(String loginId);

	void insertTng(String bzentyUserNo, String semester, String tngNope, String tngStYmd, String tngEndYmd,
			String aplyEndDt, String prgrsStts, String ttlTngHr, String cmcrsHr, String tkcgTaskNm);

	List<Map<String, Object>> selectPrgrsStts();
	
}
