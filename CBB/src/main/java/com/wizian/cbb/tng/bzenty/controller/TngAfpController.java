package com.wizian.cbb.tng.bzenty.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.tng.bzenty.service.ITngAfpService;

@RestController
public class TngAfpController {

	@Autowired
	@Qualifier("tngAfpService")
	ITngAfpService tngAfpService;

	@PostMapping("/tng/companyNm")
	public ResponseEntity<Map<String, Object>> getCompanyNm(@RequestBody String companyNm) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(companyNm, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			Map<String, Object> comnMap = tngAfpService.companyNm(loginId);
			return ResponseEntity.ok(comnMap);
		} catch (Exception e) {
			// 예외 처리
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/tng/aplyTng")
	public void aplyTng(@RequestBody String companyNm) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(companyNm, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			String yearAndSemester = loginMap.get("yearAndSemester");
			String tngNope = loginMap.get("tngNope");
			String tngStYmd = loginMap.get("tngStYmd");
			String tngEndYmd = loginMap.get("tngEndYmd");
			String aplyEndDt = loginMap.get("aplyEndDt");
			String ttlTngHr = loginMap.get("ttlTngHr");
			String tkcgTaskNm = loginMap.get("tkcgTaskNm");
			String cmcrsHr = String.valueOf(Integer.parseInt(ttlTngHr) * 8/10);
			Map<String, Object> userNo = tngAfpService.selectBzentyUserNo(loginId);
			String bzentyUserNo = (String) userNo.get("bzentyUserNo");
			tngAfpService.insertTng(bzentyUserNo, yearAndSemester, tngNope, tngStYmd, tngEndYmd, aplyEndDt, "10",
					ttlTngHr, cmcrsHr, tkcgTaskNm);
		} catch (Exception e) {
			// 예외 처리
			e.printStackTrace();
		}
	}

}
