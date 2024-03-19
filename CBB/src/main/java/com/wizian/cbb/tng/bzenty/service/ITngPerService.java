package com.wizian.cbb.tng.bzenty.service;

import java.util.List;

import com.wizian.cbb.tng.stdnt.model.StdntVO;

public interface ITngPerService {
	List<StdntVO> selectTngStdntList(String tngNo);
}
