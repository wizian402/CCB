package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngPerRepository;
import com.wizian.cbb.tng.bzenty.model.TngVO;
import com.wizian.cbb.tng.stdnt.model.StdntVO;

@Service
public class TngPerService implements ITngPerService {

	@Autowired
	ITngPerRepository tngPerRepository;
	
	@Override
	public List<StdntVO> selectTngStdntList(String tngNo) {
		return tngPerRepository.selectTngStdntList(tngNo);
	}

	@Override
	public List<Map<String, String>> selectScsbjt() {
		return tngPerRepository.selectScsbjt();
	}

	@Override
	public List<Map<String, Object>> stdntPrgrsStts() {
		return tngPerRepository.stdntPrgrsStts();
	}

	@Override
	public void selecStdnt(String tngNo, String stdntSn) {
		tngPerRepository.selecStdnt(tngNo, stdntSn);
	}

	@Override
	public void delTngAply(String tngNo, String stdntSn) {
		tngPerRepository.delTngAply(tngNo, stdntSn);
	}

	@Override
	public int stdntCnt(String tngNo) {
		return tngPerRepository.stdntCnt(tngNo);
	}

	@Override
	public TngVO selectTng(String tngNo) {
		return tngPerRepository.selectTng(tngNo);
	}

	@Override
	public void closeTngAply(String tngNo) {
		tngPerRepository.closeTngAply(tngNo);
	}

}
