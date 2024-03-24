package com.wizian.cbb.tng.stdnt.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface IStdntProgRepository {
	List<Map<String, Object>> selectTngStdnt(@Param("loginId") String loginId);

}
