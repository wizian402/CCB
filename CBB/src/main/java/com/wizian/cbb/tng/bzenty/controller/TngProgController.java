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
			System.out.println(tngNo);
			List<Map<String, Object>> stdntList = tngProgService.tngPerStdntList(tngNo);
			return stdntList;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
}
