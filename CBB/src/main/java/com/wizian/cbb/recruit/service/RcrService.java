package com.wizian.cbb.recruit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.recruit.dao.IRcrRepository;
import com.wizian.cbb.recruit.model.RcrPbancVO;

@Service
public class RcrService implements IRcrService{

	@Autowired
	IRcrRepository rcrRepository;
	
	@Override
	public List<RcrPbancVO> getAllPbancs() {
		return rcrRepository.getAllPbancsfromDB();		 
	}
	
	
	@Override
	public RcrPbancVO getPbanc(int pbancSn) {
		return rcrRepository.getPbancfromDB(pbancSn);
	}
	
}
