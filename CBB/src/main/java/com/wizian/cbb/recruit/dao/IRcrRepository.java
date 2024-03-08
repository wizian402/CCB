package com.wizian.cbb.recruit.dao;

import java.util.List;
import java.util.Map;

import com.wizian.cbb.recruit.model.RcrResumesVO;

public interface IRcrRepository {
	List<RcrResumesVO> getAllResumesfromDB();
}
