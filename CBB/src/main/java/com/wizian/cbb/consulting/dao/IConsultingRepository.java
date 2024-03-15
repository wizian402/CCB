package com.wizian.cbb.consulting.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.consulting.model.ConItemVO;
import com.wizian.cbb.consulting.model.ResultVO;
import com.wizian.cbb.consulting.model.SchedulePrintVO;


public interface IConsultingRepository {
	public List<ConItemVO> Consultationitems();
	public int itemInsert(ConItemVO conItemsVO);
	public int itemUpdate(ConItemVO conItemsVO);
	public int itemDelete(@Param("itemId") String itemId);
	public String itemCheck(ConItemVO conItemsVO);
	
	
	public List<SchedulePrintVO> adminScheduleList();
	
	
	
	public String checkId(String id);
	public boolean checkDuplicate(@Param("id")String id,@Param("cdNum")int cdNum,@Param("strDate")String strDate);
	public int insertSchedule(@Param("id")String id,@Param("cdNum")int cdNum,@Param("strDate")String strDate);
	
	
	
	public List<ResultVO> resultList();
}
