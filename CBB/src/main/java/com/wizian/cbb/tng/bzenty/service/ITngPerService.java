package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.stdnt.model.StdntVO;

public interface ITngPerService {
	List<StdntVO> selectTngStdntList(String tngNo);

	List<Map<String, String>> selectScsbjt();
	
	List<Map<String, Object>> stdntPrgrsStts();
	
	void selecStdnt(String tngNo, String stdntSn);

	void delTngAply(String tngNo, String stdntSn);
}
