package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface ITngPerService {
	List<Map<String, Object>> selectTngStdntList(String tngNo);

	List<Map<String, String>> selectScsbjt();

	List<Map<String, Object>> stdntPrgrsStts();

	void selecStdnt(String tngNo, String stdntSn);

	void delTngAply(String tngNo, String stdntSn);

	int stdntCnt(String tngNo);

	TngVO selectTng(String tngNo);

	void closeTngAply(String tngNo);
}
