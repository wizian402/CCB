package com.wizian.cbb.tng.stdnt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.tng.stdnt.service.IStdntProgService;

@RestController
public class StdntProgController {

	@Autowired
	IStdntProgService stdntProgService;

	@PostMapping("/tng/stdntProg")
	public @ResponseBody List<Map<String, Object>> stdntProg(@RequestBody String loginData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			Map<String, Object> stdntTngNo = stdntProgService.selectTngStdnt(loginId);
			String stdntSn = stdntTngNo.get("stdntSn").toString();
			String tngNo = stdntTngNo.get("tngNo").toString();

			Map<String, Object> tngStdnt = stdntProgService.getTngStdnt(tngNo, stdntSn);
			int tngAplyNo = Integer.parseInt(tngStdnt.get("tngAplyNo").toString());
			List<Map<String, Object>> attendList = stdntProgService.getAttendList(tngAplyNo);
			return attendList;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
}
