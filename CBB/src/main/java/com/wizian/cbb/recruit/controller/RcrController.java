package com.wizian.cbb.recruit.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.recruit.model.RcrPbancVO;
import com.wizian.cbb.recruit.service.IRcrService;

@RestController
public class RcrController {
	@Autowired
	@Qualifier("rcrService")
	IRcrService rcrService;
	
	@GetMapping("/rcr/list")
	public @ResponseBody List<RcrPbancVO> getAllPbancs(){
		List list = rcrService.getAllPbancs();
		return list;
	}
	
//	@GetMapping("/rcr/detail/{pbancSn}")
//	public @ResponseBody RcrPbancVO getPbanc(@PathVariable int pbancSn) {
//		RcrPbancVO pbanc = rcrService.getPbanc(pbancSn);
//		return pbanc;
//	}
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
	
	
	@GetMapping("/rcr/detailCom/{bizRegNum}")
	public @ResponseBody List<Map<String, Object>> getComInfo(@PathVariable String bizRegNum){
				try {
			int bizRegNumInt = Integer.parseInt(bizRegNum);
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> comMap = objectMapper.readValue(bizRegNum, new TypeReference<Map<String, Object>>(){
			});
			String bzNm = comMap.get("BZENTY_NM");
			String bzCEONm = comMap.get("BZENTY_RPRSV_NM");
			String slsAmt = comMap.get("ANL_SLS_AMT");
			String WorkerNum = comMap.get("TNOWK");
			String tpBz = comMap.get("TPBIZ_NM");
			String bzSize = comMap.get("ENT_KND");
			
			
			
		} catch (NumberFormatException e) {
			return ResponseEntity.badRequest().body("Invalid bizRegNum: " + bizRegNum);
		}
	}
	
	
	
}
