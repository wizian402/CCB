package com.wizian.cbb.tng.scsbjt.dao;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.tng.scsbjt.model.TngScsbjtUserVO;

public interface ITngScsbjtRepository {
	TngScsbjtUserVO selecTngScsbjtUser(@Param("loginId") String loginId);
}
