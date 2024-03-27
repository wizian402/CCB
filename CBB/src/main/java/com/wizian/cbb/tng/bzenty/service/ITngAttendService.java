package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

public interface ITngAttendService {
	List<Map<String, Object>> selectAttendCd();
	
	void insertAtndc(String attendanceDate, int tngAplyNo, String tngAtndcCd);
	
	Map<String, Object> getTngStdnt(String tngNo, String stdntSn);
	
	List<Map<String, Object>> getAttendList(int tngAplyNo);
	
	void updateTtrHr(String hour, int tngAplyNo);
}
