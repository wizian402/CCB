package com.wizian.cbb.tng.stdnt.service;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.tng.bzenty.model.TngVO;

public interface IStdntAplyService {
	List<TngVO> selectProcTng();

	void stdntAplyTng(String tngNo, String stdntSn);

	Map<String, Object> selectStndtSn(String loginId);
}
