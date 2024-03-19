package com.wizian.cbb.tng.bzenty.service;

import java.util.List;

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

}
