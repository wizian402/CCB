package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.stdnt.model.StdntVO;

public interface ITngPerRepository {
	List<StdntVO> selectTngStdntList(@Param("tngNo") String tngNo);

}
