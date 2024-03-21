package com.wizian.cbb.recruit.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.recruit.dao.IRcrRepository;
import com.wizian.cbb.recruit.model.RcrPbancVO;

@Service
public class RcrService implements IRcrService{

	@Autowired
	IRcrRepository rcrRepository;
	
	@Override
	public List<RcrPbancVO> getAllPbancs() {
		return rcrRepository.getAllPbancsfromDB();		 
	}
	
	
	@Override
	public RcrPbancVO getPbanc(int pbancSn) {
		return rcrRepository.getPbancfromDB(pbancSn);
	}


	@Override
	public Map<String, Object> getComInfo(String regNum) {
		
		return rcrRepository.getComInfo(regNum);
	}


	@Override
	public void updateJobSearchDB(String userData) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> dataMap = objectMapper.readValue(userData, new TypeReference<Map<String, String>>() {
		});
		Map<String, Object> stdntSn = getSTDNTInfo(userData);
		Map<String, Object> data4set = new HashMap<String, Object>();
		data4set.put("userNo", dataMap.get("userNo"));
		data4set.put("pbancSn", dataMap.get("pbancSn"));
		data4set.put("bizRegNum", dataMap.get("bizRegNum"));
		data4set.put("applyYn",  "y");
		data4set.put("nowDate", new Date());
		data4set.put("stdSn", stdntSn.get("STDNTSN").toString());
		setJSData(data4set);
		
		}
	


	@Override
	public Map<String, Object> getSTDNTInfo(String userData) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> stdntMap = objectMapper.readValue(userData, new TypeReference<Map<String, String>>() {
		});
		String userNo = stdntMap.get("userNo");
		return rcrRepository.getSTDNTInfo(userNo);
	}
	
	
	
	@Override
	public void setJSData(Map<String, Object> data) {
		rcrRepository.setJSData(data);
	}
	
	
	
	@Override
	public Map<String, Object> checkAply(String data) throws JsonParseException, JsonMappingException, IOException{
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> dataMap = objectMapper.readValue(data, new TypeReference<Map<String, String>>() {
		});
		Map<String, Object> stdntSn = getSTDNTInfo(data);
		Map<String, Object> data4get = new HashMap<String, Object>();
		data4get.put("stdSn", stdntSn.get("STDNTSN").toString());
		data4get.put("pbancSn", dataMap.get("pbancSn"));
		return rcrRepository.getCheckAply(data4get);
	}


	@Override
	public void updateAplyCancleDB(String userData) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> dataMap = objectMapper.readValue(userData, new TypeReference<Map<String, String>>() {
		});
		Map<String, Object> stdntSn = getSTDNTInfo(userData);
		Map<String, Object> data4set = new HashMap<String, Object>();
		data4set.put("stdSn", stdntSn.get("STDNTSN").toString());
		data4set.put("pbancSn", dataMap.get("pbancSn"));
		setCancleData(data4set);
		
	}
	
	
	@Override
	public void setCancleData (Map<String, Object> data) {
		rcrRepository.setAplyCancle(data);
	}
	
	
}
