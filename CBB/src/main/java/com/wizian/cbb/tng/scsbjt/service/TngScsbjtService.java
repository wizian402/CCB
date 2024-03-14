package com.wizian.cbb.tng.scsbjt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.scsbjt.dao.ITngScsbjtRepository;
import com.wizian.cbb.tng.scsbjt.model.TngScsbjtUserVO;
import com.wizian.cbb.tng.stdnt.model.StdntVO;

@Service
public class TngScsbjtService implements ITngScsbjtService {
	@Autowired
	ITngScsbjtRepository tngScsbjtRepository;

	@Override
	public TngScsbjtUserVO selecTngScsbjtUser(String loginId) {
		return tngScsbjtRepository.selecTngScsbjtUser(loginId);
	}

	@Override
	public List<StdntVO> selectStdntList(String scsbjtCd) {
		return tngScsbjtRepository.selectStdntList(scsbjtCd);
	}
}
