package com.wizian.cbb.recruit.service;

import java.util.List;
import java.util.Map;

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


	@Override
	public Map<String, Object> getComInfo(String regNum) {
		
		return rcrRepository.getComInfo(regNum);
	}


	@Override
	public void updateJobSearchDB(Object userNo) {
		int STDNTSN = (Integer) getSTDNTInfo(userNo).get("STDNTSN");
		
	}


	@Override
	public Map<String, Object> getSTDNTInfo(Object userNo) {
		return rcrRepository.getSTDNTInfo(userNo);
	}
	
	
	
}
