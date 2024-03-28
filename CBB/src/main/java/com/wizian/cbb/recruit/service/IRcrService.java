package com.wizian.cbb.recruit.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.wizian.cbb.recruit.model.RcrPbancVO;

public interface IRcrService {
	
	List<RcrPbancVO> getAllPbancs();		
	public RcrPbancVO getPbanc(String pbancSn);
	public Map<String,Object> getComInfo(String regNum);
	public void updateJobSearchDB(String userNo) throws JsonParseException, JsonMappingException, IOException;
	public Map<String, Object> getSTDNTInfo(String userNo) throws JsonParseException, JsonMappingException, IOException;
	void setJSData(Map<String, Object> data);
	Map<String, Object> checkAply(String Data) throws JsonParseException, JsonMappingException, IOException;
	void updateAplyCancleDB(String userData) throws JsonParseException, JsonMappingException, IOException;
	void setCancleData(Map<String, Object> data);
	List<RcrPbancVO> getAplyPbancList(String userData) throws JsonParseException, JsonMappingException, IOException;
	Map<String, Object> getAllStdntInfo(String userData) throws JsonParseException, JsonMappingException, IOException;
	void insertResume(String data) throws JsonParseException, JsonMappingException, IOException;
	List<Map<String, Object>> getAllResume(String data) throws JsonParseException, JsonMappingException, IOException;
	void deleteResume(String data) throws JsonParseException, JsonMappingException, IOException;
	Map<String, Object> getComData(String data) throws JsonParseException, JsonMappingException, IOException;
	void bzWritePbanc(String data) throws JsonParseException, JsonMappingException, IOException;
}
