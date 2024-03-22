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
import com.wizian.cbb.tng.bzenty.service.ITngAttendService;

@RestController
public class TngAttendController {

	@Autowired
	ITngAttendService tngAttendService;

	@PostMapping("/tng/attentCd")
	public @ResponseBody List<Map<String, Object>> attentCd() {
		List<Map<String, Object>> attendCd = tngAttendService.selectAttendCd();
		return attendCd;
	}
	
	@PostMapping("/tng/attentReg")
	public @ResponseBody List<Map<String, Object>> attentReg(@RequestBody String attendData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> attendMap = objectMapper.readValue(attendData, new TypeReference<Map<String, String>>() {
			});
			String tngNo = attendMap.get("tngNo");
			String stdntSn = attendMap.get("stdntSn");
			String cd = attendMap.get("cd");
			String year = attendMap.get("year");
			String month = addLeadingZero(Integer.parseInt(attendMap.get("month")));
			String day = addLeadingZero(Integer.parseInt(attendMap.get("day")));
			String combinedDate = year + month + day;
			Map<String, Object> tngAplyNoMap = tngAttendService.getTngStdnt(tngNo, stdntSn);
			int tngAplyNo = Integer.parseInt(tngAplyNoMap.get("tngAplyNo").toString());
			
			tngAttendService.insertAtndc(combinedDate, tngAplyNo, cd);
			return null;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	
	// 데이터가 1자리인 경우 앞에 0을 추가하여 2자리로 만들어주는 함수
	private String addLeadingZero(int number) {
	    return String.format("%02d", number);
	}

}
