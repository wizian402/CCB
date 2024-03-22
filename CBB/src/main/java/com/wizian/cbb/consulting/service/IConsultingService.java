package com.wizian.cbb.consulting.service;

import java.util.List;

import com.wizian.cbb.consulting.model.ConItemVO;
import com.wizian.cbb.consulting.model.ResultVO;
import com.wizian.cbb.consulting.model.SchedulePrintVO;
import com.wizian.cbb.consulting.model.ScheduleVO;
import com.wizian.cbb.consulting.model.ConuselorVO;

public interface IConsultingService {
//////////////상담 항목 관리//////////////////////
public List<ConItemVO> Consultationitems();

public int itemInsert(ConItemVO conItemsVO);

public int itemUpdate(ConItemVO conItemsVO);

public int itemDelete(String itemId);

public String itemCheck(ConItemVO conItemsVO);
//////////////상담 항목 관리//////////////////////



//////////////상담원 시간표 확인//////////////////////
public List<SchedulePrintVO> adminSchedulesList();
//////////////상담원 시간표 확인//////////////////////


//////////////상담원 시간표 확인//////////////////////
public List<SchedulePrintVO> counselorSchedulesList(String id);
//////////////상담원 시간표 확인//////////////////////


//////////////상담원 시간표 등록//////////////////////
public int insertSchedule(ScheduleVO scheduleVO);
//////////////상담원 시간표 등록//////////////////////


//////////////학생 상담 종합 이력//////////////////////
public List<ResultVO> resultList();
//////////////학생 상담 종합 이력//////////////////////



//////////////학생 상담 신청//////////////////////
public List<ConuselorVO> counselorList();
//////////////학생 상담 신청//////////////////////
}
