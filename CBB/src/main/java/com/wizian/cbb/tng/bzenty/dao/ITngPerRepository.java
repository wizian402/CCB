package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.stdnt.model.StdntVO;

public interface ITngPerRepository {
	List<StdntVO> selectTngStdntList(@Param("tngNo") String tngNo);

	List<Map<String, String>> selectScsbjt();
	
	List<Map<String, Object>> stdntPrgrsStts();
	
	void selecStdnt(@Param("tngNo") String tngNo,@Param("stdntSn") String stdntSn);
}
