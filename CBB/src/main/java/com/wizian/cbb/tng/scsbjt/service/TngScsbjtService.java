package com.wizian.cbb.tng.scsbjt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.scsbjt.dao.ITngScsbjtRepository;
import com.wizian.cbb.tng.scsbjt.model.TngScsbjtUserVO;

@Service
public class TngScsbjtService implements ITngScsbjtService {
	@Autowired
	ITngScsbjtRepository tngScsbjtRepository;

	@Override
	public TngScsbjtUserVO selecTngScsbjtUser(String loginId) {
		return tngScsbjtRepository.selecTngScsbjtUser(loginId);
	}
}
