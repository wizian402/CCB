package com.wizian.cbb.tng.scsbjt.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.tng.scsbjt.model.TngScsbjtUserVO;
import com.wizian.cbb.tng.scsbjt.service.ITngScsbjtService;
import com.wizian.cbb.tng.stdnt.model.StdntVO;

@RestController
public class TngScsbjtController {
	@Autowired
	@Qualifier("tngScsbjtService")
	ITngScsbjtService tngScsbjtService;

	@PostMapping("/scsbjt")
	public @ResponseBody List<StdntVO> scsbjt(@RequestBody String loginData) {
		List<StdntVO> stdntList = new ArrayList<StdntVO>();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			TngScsbjtUserVO tngScsbjtUserVO = tngScsbjtService.selecTngScsbjtUser(loginId);
			stdntList = tngScsbjtService.selectStdntList(tngScsbjtUserVO.getScsbjtCd());
		} catch (Exception e) {
			// TODO: handle exception
		}
		return stdntList;
	}

	@PostMapping("/selectAcavsr")
	public @ResponseBody List<Map<String, Object>> selectAcavsr(@RequestBody String loginData) {
		List<Map<String, Object>> acavsrList = new ArrayList<Map<String, Object>>();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			TngScsbjtUserVO tngScsbjtUserVO = tngScsbjtService.selecTngScsbjtUser(loginId);
			acavsrList = tngScsbjtService.getScsbjtAcavsr(tngScsbjtUserVO.getScsbjtCd());
		} catch (Exception e) {
			// TODO: handle exception
		}
		return acavsrList;
	}
}
