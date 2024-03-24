package com.wizian.cbb.tng.stdnt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.stdnt.dao.IStdntAplyRepository;
import com.wizian.cbb.tng.stdnt.dao.IStdntProgRepository;

@Service
public class StdntProgService implements IStdntProgService{

	@Autowired
	IStdntProgRepository stdntProgRepository;

	@Override
	public List<Map<String, Object>> selectTngStdnt(String loginId) {
		return stdntProgRepository.selectTngStdnt(loginId);
	}
	
}
