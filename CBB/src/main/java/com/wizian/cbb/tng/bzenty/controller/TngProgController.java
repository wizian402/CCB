package com.wizian.cbb.tng.bzenty.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.tng.bzenty.service.ITngProgService;

@RestController
public class TngProgController {

	@Autowired
	ITngProgService tngProgService;

	@PostMapping("/tng/progStdnt")
	public @ResponseBody List<Map<String, Object>> progStdnt(@RequestBody String tngData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> tngMap = objectMapper.readValue(tngData, new TypeReference<Map<String, String>>() {
			});
			String tngNo = tngMap.get("tngNo");
			List<Map<String, Object>> stdntList = tngProgService.tngPerStdntList(tngNo);
			return stdntList;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	@PostMapping("/tng/regGrade")
	public ResponseEntity<String> regGrade(@RequestBody String tngStdntData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> tngMap = objectMapper.readValue(tngStdntData, new TypeReference<Map<String, String>>() {
			});
			String tngNo = tngMap.get("tngNo");
			String stdntSn = tngMap.get("stdntSn");
			int score = Integer.parseInt(tngMap.get("score"));
			Map<String, Object> tngAplyNoMap = tngProgService.getTngStdnt(tngNo, stdntSn);
			int tngAplyNo = Integer.parseInt(tngAplyNoMap.get("tngAplyNo").toString());
			List<Map<String, Object>> tngList = tngProgService.getBzentyUserNo(tngNo);
			String bzentyUserNo = null;
			String semester = null;
			for (Map<String, Object> map : tngList) {
				bzentyUserNo = map.get("bzentyUserNo").toString();
				semester = map.get("semester").toString();
			}
			String grd = convertToGrade(score);

			tngProgService.insertTngGrd(tngAplyNo, bzentyUserNo, semester, score, grd);
			tngProgService.updateIndstEvlYn(tngNo, stdntSn);
			return ResponseEntity.ok("success");
		} catch (Exception e) {
			// TODO: handle exception
		}
		return ResponseEntity.ok("fail");
	}

	public String convertToGrade(int score) {
		if (score >= 90 && score <= 100) {
			return "A";
		} else if (score >= 80 && score < 90) {
			return "B";
		} else if (score >= 70 && score < 80) {
			return "C";
		} else if (score >= 60 && score < 70) {
			return "D";
		} else if (score >= 0 && score < 60) {
			return "F";
		} else {
			return "Invalid score";
		}
	}
}
