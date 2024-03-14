package com.wizian.cbb.tng.scsbjt.service;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.tng.scsbjt.model.TngScsbjtUserVO;
import com.wizian.cbb.tng.stdnt.model.StdntVO;

public interface ITngScsbjtService {
	TngScsbjtUserVO selecTngScsbjtUser(String loginId);

	List<StdntVO> selectStdntList(String scsbjtCd);
	
	List<Map<String, Object>> getScsbjtAcavsr(String scsbjtCd);
}
