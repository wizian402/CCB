package com.wizian.cbb.tng.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface IAdmPerRepository {
	List<TngVO> selectAllTng();
	
	List<Map<String, Object>> selectBzentyNm();
	
	void approvalTng(@Param("tngNo") String tngNo);
}
