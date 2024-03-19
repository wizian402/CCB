package com.wizian.cbb.tng.bzenty.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.tng.bzenty.model.TngVO;
import com.wizian.cbb.tng.bzenty.service.ITngListService;

@RestController
public class TngListController {

	@Autowired
	ITngListService tngListService;

	@PostMapping("/tng/list")
	public @ResponseBody List<TngVO> tngList(@RequestBody String companyNm) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(companyNm, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			Map<String, Object> userNo = tngListService.selectBzentyUserNo(loginId);
			String bzentyUserNo = (String) userNo.get("bzentyUserNo");
			List<TngVO> tngVoList = tngListService.selectTngList(bzentyUserNo);
			List<Map<String, Object>> list = tngListService.selectPrgrsStts();
			return tngVoList;
		} catch (Exception e) {
			// 예외 처리
			e.printStackTrace();
		}
		return null;
	}

	@PostMapping("/tng/stts")
	public @ResponseBody List<Map<String, Object>> tngList() {
		List<Map<String, Object>> list = tngListService.selectPrgrsStts();
		return list;
	}
}
