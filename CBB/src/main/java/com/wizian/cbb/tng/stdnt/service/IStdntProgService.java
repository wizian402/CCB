package com.wizian.cbb.tng.stdnt.service;

import java.util.List;
import java.util.Map;

public interface IStdntProgService {
	Map<String, Object> selectTngStdnt(String loginId);

	Map<String, Object> getTngStdnt(String tngNo, String stdntSn);

	List<Map<String, Object>> getAttendList(int tngAplyNo);
}
