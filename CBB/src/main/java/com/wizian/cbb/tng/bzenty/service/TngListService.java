package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngListRepository;
import com.wizian.cbb.tng.bzenty.model.TngVO;

@Service
public class TngListService implements ITngListService {

	@Autowired
	ITngListRepository tngListRepository;	

	@Override
	public Map<String, Object> selectBzentyUserNo(String loginId) {
		return tngListRepository.selectBzentyUserNo(loginId);
	}

	@Override
	public List<Map<String, Object>> selectPrgrsStts() {
		return tngListRepository.selectPrgrsStts();
	}

	@Override
	public List<TngVO> selectTngList(String bzentyUserNo) {
		return tngListRepository.selectTngList(bzentyUserNo);
	}
}
