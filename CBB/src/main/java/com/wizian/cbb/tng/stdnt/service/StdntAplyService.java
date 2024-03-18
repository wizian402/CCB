package com.wizian.cbb.tng.stdnt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.model.TngVO;
import com.wizian.cbb.tng.stdnt.dao.IStdntAplyRepository;

@Service
public class StdntAplyService implements IStdntAplyService {

	@Autowired
	IStdntAplyRepository stdntAplyRepository;
	
	@Override
	public List<TngVO> selectProcTng() {
		return stdntAplyRepository.selectProcTng();
	}

}
