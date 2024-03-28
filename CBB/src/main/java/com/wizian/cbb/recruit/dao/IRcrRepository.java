package com.wizian.cbb.recruit.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wizian.cbb.recruit.model.RcrPbancVO;

public interface IRcrRepository {
	List<RcrPbancVO> getAllPbancsfromDB();

	RcrPbancVO getPbancfromDB(String pbancSn);

	public Map<String, Object> getComInfo(String regNum);
	
	public Map<String, Object> getSTDNTInfo(String userData);
	
	public int setJSData(Map<String, Object> data);

	Map<String, Object> getCheckAply(Map<String, Object> data4get);

	void setAplyCancle(Map<String, Object> data);

	List<Map<String, Object>> getAplyPbancListDB(String userSTDNTSN);

	Map<String, Object> getAllStdntInfo(String userSTDNTSN);

	void resumeInsert(HashMap<String, Object> dataMap);

	List<Map<String, Object>> getAllResumeList(String userSTDNTSN);

	void deleteResume(Object object);

	void deleteLng(Object object);

	void deleteCrtfct(Object object);

	void deleteActv(Object object);

	void deleteAcbg(Object object);

	String getBrno(String data);

	void bzWritePbancDB(Map<String, Object> dataMap);

	List<Map<String, Object>> writedPbancListDB(String brno);

	void deletePbancDB(Map<String, Object> dataMap);

	List<Map<String, Object>> notAPRVPbancDB(String brno);

}
