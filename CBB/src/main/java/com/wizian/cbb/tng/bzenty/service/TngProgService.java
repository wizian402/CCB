package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngProgRepository;

@Service
public class TngProgService implements ITngProgService {

	@Autowired
	ITngProgRepository tngProgRepository;

	@Override
	public List<Map<String, Object>> tngPerStdntList(String tngNo) {
		return tngProgRepository.tngPerStdntList(tngNo);
	}

	@Override
	public Map<String, Object> getTngStdnt(String tngNo, String stdntSn) {
		return tngProgRepository.getTngStdnt(tngNo, stdntSn);
	}

	@Override
	public Map<String, Object> getBzentyUserNo(String tngNo) {
		return tngProgRepository.getBzentyUserNo(tngNo);
	}

	@Override
	public void insertTngGrd(int tngAplyNo, String bzentyUserNo, String semester, int score, String grd) {
		tngProgRepository.insertTngGrd(tngAplyNo, bzentyUserNo, semester, score, grd);
	}

	@Override
	public void updateIndstEvlYn(String tngNo, String stdntSn) {
		tngProgRepository.updateIndstEvlYn(tngNo, stdntSn);		
	}
	
	
}
