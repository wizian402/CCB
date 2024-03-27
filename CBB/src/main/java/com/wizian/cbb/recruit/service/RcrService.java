package com.wizian.cbb.recruit.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
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
	public RcrPbancVO getPbanc(String pbancSn) {
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
		int count = rcrRepository.setJSData(data);
		System.out.println("setData결과 행 수:"+count);
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
		 Map<String, Object>result = rcrRepository.getCheckAply(data4get);
		 
		if(result!=null) return result;
			
		result = new HashMap<String, Object>();
		result.put("JNCMP_APLY_YN", "N"); 
		return result;
		
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
	
	
	@Override
	public List<RcrPbancVO> getAplyPbancList(String userData) throws JsonParseException, JsonMappingException, IOException{
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> dataMap = objectMapper.readValue(userData, new TypeReference<Map<String, String>>() {
		});
		String userNo = dataMap.get("userNo");
		String userSTDNTSN = ((BigDecimal) rcrRepository.getSTDNTInfo(userNo).get("STDNTSN")).toString();
		List<RcrPbancVO> result = new ArrayList<RcrPbancVO>();
		List<Map<String,Object>> aplyPbancSNs = rcrRepository.getAplyPbancListDB(userSTDNTSN);
		
		for(Map<String,Object> aplyPbancSN : aplyPbancSNs ) {
			result.add(rcrRepository.getPbancfromDB(((BigDecimal) aplyPbancSN.get("PBANC_SN")).toString()));
		}
		return result;
	}
	
	
	@Override
	public Map<String, Object> getAllStdntInfo(String userData) throws JsonParseException, JsonMappingException, IOException{
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> dataMap = objectMapper.readValue(userData, new TypeReference<Map<String, String>>() {
		});
		String userNo = dataMap.get("userNo");
		String userSTDNTSN = ((BigDecimal) rcrRepository.getSTDNTInfo(userNo).get("STDNTSN")).toString();
		return rcrRepository.getAllStdntInfo(userSTDNTSN);
		
	}


	@Override
	public void insertResume(String data) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		HashMap<String, Object> dataMap = objectMapper.readValue(data, HashMap.class);
		
		rcrRepository.resumeInsert(dataMap);
	}


	@Override
	public List<Map<String, Object>> getAllResume(String data) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> dataMap = objectMapper.readValue(data, HashMap.class);
		String userNo = dataMap.get("userNo");
		String userSTDNTSN = ((BigDecimal) rcrRepository.getSTDNTInfo(userNo).get("STDNTSN")).toString();
		System.out.println(userSTDNTSN);
		return rcrRepository.getAllResumeList(userSTDNTSN);
		
		
	}


	@Override
	public void deleteResume(String data) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> dataMap = objectMapper.readValue(data, new TypeReference<Map<String, String>>() {
		});
		System.out.println(dataMap.get("number"));
		rcrRepository.deleteResume(dataMap.get("number"));
		rcrRepository.deleteLng(dataMap.get("number"));
		rcrRepository.deleteCrtfct(dataMap.get("number"));
		rcrRepository.deleteActv(dataMap.get("number"));
		rcrRepository.deleteAcbg(dataMap.get("number"));
		
	}


	@Override
	public Map<String, Object> getComData(String data) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> dataMap = objectMapper.readValue(data, HashMap.class);
		String userNo = dataMap.get("userNo");
		String brno = getBrno(userNo);
		Map<String, Object> conInfo = getComInfo(brno);
		
		return conInfo;
	}
	
	
	
	public String getBrno(String data) {
		return rcrRepository.getBrno(data);
	}

	
	
}
