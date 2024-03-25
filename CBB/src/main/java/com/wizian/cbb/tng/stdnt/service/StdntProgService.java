package com.wizian.cbb.tng.stdnt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.stdnt.dao.IStdntProgRepository;

@Service
public class StdntProgService implements IStdntProgService {

	@Autowired
	IStdntProgRepository stdntProgRepository;

	@Override
	public Map<String, Object> selectTngStdnt(String loginId) {
		return stdntProgRepository.selectTngStdnt(loginId);
	}

	@Override
	public Map<String, Object> getTngStdnt(String tngNo, String stdntSn) {
		return stdntProgRepository.getTngStdnt(tngNo, stdntSn);
	}

	@Override
	public List<Map<String, Object>> getAttendList(int tngAplyNo) {
		return stdntProgRepository.getAttendList(tngAplyNo);
	}

}
