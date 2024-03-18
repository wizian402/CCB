package com.wizian.cbb.tng.admin.dao;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface IAdmPerRepository {
	List<TngVO> selectAllTng();
	
	List<Map<String, Object>> selectBzentyNm();
}
