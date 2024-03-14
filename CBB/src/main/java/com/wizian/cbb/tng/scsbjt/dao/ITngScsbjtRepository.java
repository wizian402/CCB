package com.wizian.cbb.tng.scsbjt.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.scsbjt.model.TngScsbjtUserVO;
import com.wizian.cbb.tng.stdnt.model.StdntVO;

public interface ITngScsbjtRepository {
	TngScsbjtUserVO selecTngScsbjtUser(@Param("loginId") String loginId);

	List<StdntVO> selectStdntList(@Param("scsbjtCd") String scsbjtCd);

	List<Map<String, Object>> getScsbjtAcavsr();

}
