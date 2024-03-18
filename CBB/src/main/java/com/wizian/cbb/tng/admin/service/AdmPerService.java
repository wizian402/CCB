package com.wizian.cbb.tng.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.admin.dao.IAdmPerRepository;
import com.wizian.cbb.tng.bzenty.model.TngVO;

@Service
public class AdmPerService implements IAdmPerService {

	@Autowired
	IAdmPerRepository admPerRepository;

	@Override
	public List<TngVO> selectAllTng() {
		return admPerRepository.selectAllTng();
	}

	@Override
	public List<Map<String, Object>> selectBzentyNm() {
		return admPerRepository.selectBzentyNm();
	}

	@Override
	public void approvalTng(String tngNo) {
		admPerRepository.approvalTng(tngNo);
	}

}
