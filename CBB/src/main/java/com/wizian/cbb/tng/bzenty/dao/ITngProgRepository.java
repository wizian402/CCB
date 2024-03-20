package com.wizian.cbb.tng.bzenty.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ITngProgRepository {
	List<Map<String, Object>> tngPerStdntList(@Param("tngNo") String tngNo);
}
