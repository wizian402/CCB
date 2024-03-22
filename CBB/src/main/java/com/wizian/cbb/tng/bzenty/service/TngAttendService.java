package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngAttendRepository;

@Service
public class TngAttendService implements ITngAttendService {

	@Autowired
	ITngAttendRepository tngAttendRepository;

	@Override
	public List<Map<String, Object>> selectAttendCd() {
		return tngAttendRepository.selectAttendCd();
	}

	@Override
	public void insertAtndc(String attendanceDate, int tngAplyNo, String tngAtndcCd) {
		tngAttendRepository.insertAtndc(attendanceDate, tngAplyNo, tngAtndcCd);
	}

	@Override
	public Map<String, Object> getTngStdnt(String tngNo, String stdntSn) {
		return tngAttendRepository.getTngStdnt(tngNo, stdntSn);
	}

	@Override
	public List<Map<String, Object>> getAttendList(int tngAplyNo) {
		return tngAttendRepository.getAttendList(tngAplyNo);
	}
}
