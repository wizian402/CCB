package com.wizian.cbb.tng.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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

}
