package com.wizian.cbb.tng.scsbjt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.scsbjt.dao.ITngScsbjtRepository;

@Service
public class TngScsbjtService {
	@Autowired
	ITngScsbjtRepository tngScsbjtRepository;
}
