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
import com.wizian.cbb.tng.bzenty.service.ITngRcdService;

@RestController
public class TngRcdController {

	@Autowired
	ITngRcdService tngRcdService;

	@PostMapping("/tng/rcdReg")
	public @ResponseBody List<Map<String, Object>> rcdReg(@RequestBody String rcdData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> rcdMap = objectMapper.readValue(rcdData, new TypeReference<Map<String, String>>() {
			});
			String tngNo = rcdMap.get("tngNo");
			String stdntSn = rcdMap.get("stdntSn");
			String evlCn = rcdMap.get("evlCn");
			String year = rcdMap.get("year");
			String month = addLeadingZero(Integer.parseInt(rcdMap.get("month")));
			String day = addLeadingZero(Integer.parseInt(rcdMap.get("day")));
			String combinedDate = year + month + day;
			String loginId = rcdMap.get("loginId");

			Map<String, Object> bzentyUserNoMap = tngRcdService.selectBzentyUserNo(loginId);
			String bzentyUserNo = bzentyUserNoMap.get("bzentyUserNo").toString();

			Map<String, Object> tngAplyNoMap = tngRcdService.getTngStdnt(tngNo, stdntSn);
			int tngAplyNo = Integer.parseInt(tngAplyNoMap.get("tngAplyNo").toString());

			tngRcdService.insertRcd(tngAplyNo, bzentyUserNo, combinedDate, evlCn);

			return null;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	private String addLeadingZero(int number) {
		return String.format("%02d", number);
	}
}
