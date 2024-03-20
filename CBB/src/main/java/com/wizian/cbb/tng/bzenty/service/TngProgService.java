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
}
