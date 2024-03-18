package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface ITngListRepository {
	Map<String, Object> selectBzentyUserNo(@Param("loginId") String loginId);

	List<Map<String, Object>> selectPrgrsStts();
	
	List<TngVO> selectTngList(@Param("bzentyUserNo") String bzentyUserNo);
}
