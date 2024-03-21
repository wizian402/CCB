package com.wizian.cbb.recruit.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.recruit.model.RcrPbancVO;
import com.wizian.cbb.recruit.service.IRcrService;

@RestController
public class RcrController {
	@Autowired
	@Qualifier("rcrService")
	IRcrService rcrService;

	@GetMapping("/rcr/list")
	public @ResponseBody List<RcrPbancVO> getAllPbancs() {
		List list = rcrService.getAllPbancs();
		return list;
	}

	@GetMapping("/rcr/detail/{pbancSn}")
	public @ResponseBody ResponseEntity<?> getPbanc(@PathVariable String pbancSn) {
		try {
			int pbancSnInt = Integer.parseInt(pbancSn);
			RcrPbancVO pbanc = rcrService.getPbanc(pbancSnInt);
			return ResponseEntity.ok(pbanc);
		} catch (NumberFormatException e) {
			return ResponseEntity.badRequest().body("Invalid pbancSn: " + pbancSn);
		}
	}

	@PostMapping("/rcr/detailCom")
	public @ResponseBody Map<String, Object> getComInfo(@RequestBody String bizRegData)
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> comMap = objectMapper.readValue(bizRegData, new TypeReference<Map<String, Object>>() {
		});
		String bizRegNum = comMap.get("bizRegNum");
		Map<String, Object> comInfoData = rcrService.getComInfo(bizRegNum);

		return comInfoData;
	}

	@PostMapping("/rcr/udtJobSearch")
	public void updateJobSearch(@RequestBody String userData)
			throws JsonParseException, JsonMappingException, IOException {
		rcrService.updateJobSearchDB(userData);
	}

	@PostMapping("/rcr/checkAply")
	public @ResponseBody Map<String, Object> checkAply(@RequestBody String data)
			throws JsonParseException, JsonMappingException, IOException {
		return rcrService.checkAply(data);
	}  

	@PostMapping("/rcr/cancleAply")
	public void updateAplyCancle(@RequestBody String userData) throws JsonParseException, JsonMappingException, IOException {
		rcrService.updateAplyCancleDB(userData);
	}
	
}
