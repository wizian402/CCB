package com.wizian.cbb.tng.scsbjt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public void scsbjt(@RequestBody String loginData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			TngScsbjtUserVO tngScsbjtUserVO = tngScsbjtService.selecTngScsbjtUser(loginId);
			List<StdntVO> stdntList = tngScsbjtService.selectStdntList(tngScsbjtUserVO.getScsbjtCd());
			for (StdntVO stdnt : stdntList) {
			    System.out.println(stdnt.getStdntNm()); 
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
