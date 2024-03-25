package com.wizian.cbb.tng.stdnt.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface IStdntAplyRepository {
	List<TngVO> selectProcTng();

	void stdntAplyTng(@Param("tngNo") int tngNo, @Param("stdntSn") int stdntSn);

	Map<String, Object> selectStndtSn(@Param("loginId") String loginId);

	int countTngStdnt(@Param("tngNo") int tngNo, @Param("stdntSn") int stdntSn);
	
	List<Map<String, Object>> getTngStdnt(@Param("stdntSn") int stdntSn);
}
