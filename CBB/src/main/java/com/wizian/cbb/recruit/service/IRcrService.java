package com.wizian.cbb.recruit.service;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.recruit.model.RcrPbancVO;

public interface IRcrService {
	
	List<RcrPbancVO> getAllPbancs();		
	public RcrPbancVO getPbanc(int pbancSn);
	public Map<String,Object> getComInfo(String regNum);
	public void updateJobSearchDB(Object userNo);
	public Map<String, Object> getSTDNTInfo(Object userNo);
}
