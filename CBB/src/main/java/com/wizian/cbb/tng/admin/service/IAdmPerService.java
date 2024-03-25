package com.wizian.cbb.tng.admin.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface IAdmPerService {
	List<TngVO> selectAllTng();
	
	List<Map<String, Object>> selectBzentyNm();
	
	void approvalTng(String tngNo);
	
	Map<String, Object> selectTkcgTaskCd(String loginId);
}
