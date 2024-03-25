package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.bzenty.model.TngVO;
import com.wizian.cbb.tng.stdnt.model.StdntVO;

public interface ITngPerService {
	List<Map<String, Object>> selectTngStdntList(String tngNo);

	List<Map<String, String>> selectScsbjt();
	
	List<Map<String, Object>> stdntPrgrsStts();
	
	void selecStdnt(String tngNo, String stdntSn);

	void delTngAply(String tngNo, String stdntSn);
	
	int stdntCnt(@Param("tngNo") String tngNo);
	
	TngVO selectTng(@Param("tngNo") String tngNo);
	
	void closeTngAply(@Param("tngNo") String tngNo);
}
