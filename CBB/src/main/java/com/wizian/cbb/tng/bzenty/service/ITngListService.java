package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface ITngListService {

	Map<String, Object> selectBzentyUserNo(String loginId);

	List<Map<String, Object>> selectPrgrsStts();
	
	List<TngVO> selectTngList(String bzentyUserNo);
}
