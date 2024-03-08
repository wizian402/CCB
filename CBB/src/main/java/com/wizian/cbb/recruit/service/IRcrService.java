package com.wizian.cbb.recruit.service;

import java.util.List;

import com.wizian.cbb.recruit.model.RcrPbancVO;

public interface IRcrService {
	
	List<RcrPbancVO> getAllPbancs();		
	public RcrPbancVO getPbanc(int pbancSn);
}
