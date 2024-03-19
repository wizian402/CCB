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
import com.wizian.cbb.tng.bzenty.service.ITngPerService;
import com.wizian.cbb.tng.stdnt.model.StdntVO;

@RestController
public class TngPerController {

	@Autowired
	ITngPerService tngPerService;

	@PostMapping("/tng/perStdnt")
	public @ResponseBody List<StdntVO> perStdnt(@RequestBody String tngData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> tngMap = objectMapper.readValue(tngData, new TypeReference<Map<String, String>>() {
			});
			String tngNo = tngMap.get("tngNo");
			List<StdntVO> stdntList = tngPerService.selectTngStdntList(tngNo);
			for(StdntVO vo: stdntList) {
				System.out.println(vo.getStdntSn());
			}
			return stdntList;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
}
