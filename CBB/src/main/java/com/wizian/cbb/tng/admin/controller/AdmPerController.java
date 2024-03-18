package com.wizian.cbb.tng.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.tng.admin.service.IAdmPerService;
import com.wizian.cbb.tng.bzenty.model.TngVO;

@RestController
public class AdmPerController {

	@Autowired
	IAdmPerService admPerService;

	@PostMapping("/tng/admPer")
	public @ResponseBody List<TngVO> admPer() {
		List<TngVO> tngVoList = admPerService.selectAllTng();
		return tngVoList;
	}

	@PostMapping("/tng/bzentyNmList")
	public @ResponseBody List<Map<String, Object>> bzentyNmList() {
		List<Map<String, Object>> bzentyNmList = admPerService.selectBzentyNm();
		return bzentyNmList;
	}

	@PostMapping("/tng/approvalTng")
	public void approvalTng(@RequestBody String tngData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> tngMap = objectMapper.readValue(tngData, new TypeReference<Map<String, String>>() {
			});
			String tngNo = tngMap.get("tngNo");
			admPerService.approvalTng(tngNo);
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
