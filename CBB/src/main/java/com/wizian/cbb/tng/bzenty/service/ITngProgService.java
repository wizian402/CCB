package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

public interface ITngProgService {
	List<Map<String, Object>> tngPerStdntList(String tngNo);

	Map<String, Object> getTngStdnt(String tngNo, String stdntSn);

	Map<String, Object> getBzentyUserNo(String tngNo);

	void insertTngGrd(int tngAplyNo, String bzentyUserNo, String semester, int score, String grd);

	void updateIndstEvlYn( String tngNo,  String stdntSn);
}
