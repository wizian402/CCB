package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngPerRepository;
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

}
