package com.wizian.cbb.tng.bzenty.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngAfpRepository;
import com.wizian.cbb.tng.bzenty.model.TngVO;

@Service
public class TngAfpService implements ITngAfpService {

	@Autowired
	ITngAfpRepository tngAfpRepository;	

	@Override
	public Map<String, Object> companyNm(String loginId) {
		return tngAfpRepository.companyNm(loginId);
	}

	@Override
	public Map<String, Object> selectBzentyUserNo(String loginId) {
		return tngAfpRepository.selectBzentyUserNo(loginId);
	}

	@Override
	public void insertTng(String bzentyUserNo, String semester, String tngNope, String tngStYmd, String tngEndYmd,
			String aplyEndDt, String prgrsStts, String ttlTngHr, String cmcrsHr, String tkcgTaskNm) {
		tngAfpRepository.insertTng(bzentyUserNo, semester, tngNope, tngStYmd, tngEndYmd, aplyEndDt, prgrsStts, ttlTngHr, cmcrsHr, tkcgTaskNm);
	}

	@Override
	public List<Map<String, Object>> selectPrgrsStts() {
		return tngAfpRepository.selectPrgrsStts();
	}

}
