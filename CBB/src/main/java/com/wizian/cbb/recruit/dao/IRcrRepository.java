package com.wizian.cbb.recruit.dao;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.recruit.model.RcrPbancVO;

public interface IRcrRepository {
	List<RcrPbancVO> getAllPbancsfromDB();
	RcrPbancVO getPbancfromDB(int pbancSn);
}
