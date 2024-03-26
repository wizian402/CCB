package com.wizian.cbb.tng.bzenty.service;

import java.util.Map;

public interface ITngRcdService {

	Map<String, Object> getTngStdnt(String tngNo, String stdntSn);
	
	Map<String, Object> selectBzentyUserNo(String loginId);

	void insertRcd(int tngAplyNo, String bzentyUserNo, String logDate, String evlCn);
}
