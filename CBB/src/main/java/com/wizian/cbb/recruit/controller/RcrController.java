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

			RcrPbancVO pbanc = rcrService.getPbanc(pbancSn);
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
		System.out.println("업데이트잡서치 진입");
		rcrService.updateJobSearchDB(userData);
	}

	@PostMapping("/rcr/checkAply")
	public @ResponseBody Map<String, Object> checkAply(@RequestBody String data)
			throws JsonParseException, JsonMappingException, IOException {

		System.out.println("체크어플라이진입?");
		System.out.println(rcrService.checkAply(data));
		return rcrService.checkAply(data);
	}

	@PostMapping("/rcr/cancleAply")
	public void updateAplyCancle(@RequestBody String userData)
			throws JsonParseException, JsonMappingException, IOException {
		rcrService.updateAplyCancleDB(userData);
	}

	@PostMapping("/rcr/aplylist")
	public @ResponseBody List<RcrPbancVO> aplyPbancList(@RequestBody String userData)
			throws JsonParseException, JsonMappingException, IOException {

		return rcrService.getAplyPbancList(userData);
	}

	@PostMapping("/rcr/fetchStdntInfo")
	public @ResponseBody Map<String, Object> getAllStdntInfo(@RequestBody String userData)
			throws JsonParseException, JsonMappingException, IOException {
		return rcrService.getAllStdntInfo(userData);
	}

	@PostMapping("/rcr/writeResume")
	public void writeResume(@RequestBody String data) throws JsonParseException, JsonMappingException, IOException {
		rcrService.insertResume(data);
	}

	@PostMapping("/rcr/resumeList")
	public List<Map<String, Object>> getAllResumeList(@RequestBody String data)
			throws JsonParseException, JsonMappingException, IOException {
		return rcrService.getAllResume(data);
	}

	@PostMapping("/rcr/resumeDelete")
	public void deleteResume(@RequestBody String data) throws JsonParseException, JsonMappingException, IOException {
		rcrService.deleteResume(data);
	}

	@PostMapping("/rcr/bzRecruit/getComInfo")
	public @ResponseBody Map<String, Object> getComInfobyBrno(@RequestBody String data) throws JsonParseException, JsonMappingException, IOException
	{
		
		return rcrService.getComData(data);
	}

	@PostMapping("/rcr/bzRecruit/writePbanc")
	public void writePbanc (@RequestBody String data) throws JsonParseException, JsonMappingException, IOException {
		rcrService.bzWritePbanc(data);
	}

	
	@PostMapping("/rcr/bzRecruit/writedPbancList")
	public @ResponseBody List<Map<String, Object>> writedPbancList (@RequestBody String data) throws JsonParseException, JsonMappingException, IOException{
		return rcrService.writedPbancList(data);
	}
	
	@PostMapping("/rcr/bzRecruit/deletePbanc")
	public void deletePbanc (@RequestBody String data) throws JsonMappingException, IOException {
		rcrService.deletePbanc(data);
	}
	
	@PostMapping("/rcr/bzRecruit/notAPRVPbanc")
	public List<Map<String, Object>> notAPRVPbanc (@RequestBody String data) throws JsonParseException, JsonMappingException, IOException {
		return rcrService.notAPRVPbanc(data);
	}
	
	
	@PostMapping("/rcr/admin/notAPRVPbancList")
	public @ResponseBody List<Map<String, Object>> adNotAPRVPbanc (){
		return rcrService.adNotAPRVPbanc();
	}
	
	@PostMapping("/rcr/admin/APRVPbanc")
	public @ResponseBody int aprvPbancY(@RequestBody String data) throws JsonParseException, JsonMappingException, IOException {
		return rcrService.aprvPbancY(data);
	}
	
	@PostMapping("/rcr/admin/allComList")
	public @ResponseBody List<Map<String, Object>> allComList(){
		return rcrService.getAllComList();
	}
	
	@PostMapping("/rcr/admin/detailCom")
	public @ResponseBody Map<String, Object> detailCom(@RequestBody String data) throws JsonParseException, JsonMappingException, IOException{
		
		return rcrService.getDetailCom(data);
	}

	@PostMapping("/rcr/admin/manager")
	public @ResponseBody Map<String, Object> manager(@RequestBody String data) throws JsonMappingException, IOException, Exception{
		return rcrService.getManager(data);
	}
	
	
	
	
	
	
	
}
