package com.wizian.cbb.consulting.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.wizian.cbb.consulting.model.ConItemVO;
import com.wizian.cbb.consulting.model.ResultVO;
import com.wizian.cbb.consulting.model.SchedulePrintVO;
import com.wizian.cbb.consulting.model.ConuselorVO;
import com.wizian.cbb.consulting.model.ProcessingVO;

public interface IConsultingRepository {
//////////////상담 항목 관리//////////////////////
	public List<ConItemVO> Consultationitems();

	public int itemInsert(ConItemVO conItemsVO);

	public int itemUpdate(ConItemVO conItemsVO);

	public int itemDelete(@Param("itemId") String itemId);

	public String itemCheck(ConItemVO conItemsVO);
//////////////상담 항목 관리//////////////////////

//////////////상담원 시간표 확인//////////////////////
	public List<SchedulePrintVO> adminScheduleList();

	public int updateSchedule(String scheduleId);

	public int updateReservation(String processingId);
//////////////상담원 시간표 확인//////////////////////

//////////////상담원 시간표 확인//////////////////////
	public String checkId(String id);

	public List<SchedulePrintVO> counselorScheduleList(@Param("checkId") String checkId);

	public int scheduleCansel(int scheduleId);
//////////////상담원 시간표 확인//////////////////////

//////////////상담원 시간표 등록//////////////////////
	public boolean checkDuplicate(@Param("id") String id, @Param("cdNum") int cdNum, @Param("strDate") String strDate);

	public int insertSchedule(@Param("id") String id, @Param("cdNum") int cdNum, @Param("strDate") String strDate);
//////////////상담원 시간표 등록//////////////////////

//////////////상담원 상담 신청 처리//////////////////////
	public List<SchedulePrintVO> scheduleIdList(int scheduleId);

	public String getCount(String scheduleId);
//////////////상담원 상담 신청 처리//////////////////////

//////////////상담원 상담 결과 등록//////////////////////
	public List<ProcessingVO> resultRegistrationList(String checkId);

	public int resultRegistration(@Param("comment") String comment, @Param("reservationId") String reservationId);
//////////////상담원 상담 결과 등록//////////////////////

//////////////학생 상담 종합 이력//////////////////////
	public List<ResultVO> resultList();
//////////////학생 상담 종합 이력//////////////////////

//////////////학생 상담 신청//////////////////////
	public List<ConuselorVO> counselorList();

	public List<SchedulePrintVO> studentScheduleList(String id);

	public String studentIdCheck(String studentId);
	public int requestCheck(SchedulePrintVO schedulePrintVO);
	public int request(SchedulePrintVO schedulePrintVO);
//////////////학생 상담 신청//////////////////////

///////////////////get//////////////////////
	public String getStudentName(String studentId);

}
