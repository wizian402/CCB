package com.wizian.cbb.recruit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.recruit.dao.IRcrRepository;
import com.wizian.cbb.recruit.model.RcrResumesVO;

@Service
public class RcrService implements IRcrService{

	@Autowired
	IRcrRepository rcrRepository;
	
	@Override
	public List<RcrResumesVO> getAllResumes() {
		return rcrRepository.getAllResumesfromDB();		 
	}
}
