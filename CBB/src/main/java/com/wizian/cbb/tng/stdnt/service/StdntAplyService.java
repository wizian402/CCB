package com.wizian.cbb.tng.stdnt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.model.TngVO;
import com.wizian.cbb.tng.stdnt.dao.IStdntAplyRepository;

@Service
public class StdntAplyService implements IStdntAplyService {

	@Autowired
	IStdntAplyRepository stdntAplyRepository;

	@Override
	public List<TngVO> selectProcTng() {
		return stdntAplyRepository.selectProcTng();
	}

	@Override
	public void stdntAplyTng(int tngNo, int stdntSn) {
		stdntAplyRepository.stdntAplyTng(tngNo, stdntSn);
	}

	@Override
	public Map<String, Object> selectStndtSn(String loginId) {
		return stdntAplyRepository.selectStndtSn(loginId);
	}

	@Override
	public int countTngStdnt(int tngNo, int stdntSn) {
		return stdntAplyRepository.countTngStdnt(tngNo, stdntSn);
	}

	@Override
	public List<Map<String, Object>> getTngStdnt(int stdntSn) {
		return stdntAplyRepository.getTngStdnt(stdntSn);
	}

}
