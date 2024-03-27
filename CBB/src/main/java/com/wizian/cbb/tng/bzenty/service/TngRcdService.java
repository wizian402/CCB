package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngRcdRepository;

@Service
public class TngRcdService implements ITngRcdService {

	@Autowired
	ITngRcdRepository tngRcdRepository;

	@Override
	public Map<String, Object> getTngStdnt(String tngNo, String stdntSn) {
		return tngRcdRepository.getTngStdnt(tngNo, stdntSn);
	}

	@Override
	public Map<String, Object> selectBzentyUserNo(String loginId) {
		return tngRcdRepository.selectBzentyUserNo(loginId);
	}

	@Override
	public void insertRcd(int tngAplyNo, String bzentyUserNo, String logDate, String evlCn) {
		tngRcdRepository.insertRcd(tngAplyNo, bzentyUserNo, logDate, evlCn);
	}

	@Override
	public List<Map<String, Object>> selectRcdList(int tngAplyNo) {
		return tngRcdRepository.selectRcdList(tngAplyNo);
	}
}
