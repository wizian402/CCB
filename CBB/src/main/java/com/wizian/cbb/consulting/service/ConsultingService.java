package com.wizian.cbb.consulting.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.consulting.dao.IConsultingRepository;
import com.wizian.cbb.consulting.model.ConItemVO;
import com.wizian.cbb.consulting.model.ConuselorVO;
import com.wizian.cbb.consulting.model.ResultVO;
import com.wizian.cbb.consulting.model.SchedulePrintVO;
import com.wizian.cbb.consulting.model.ScheduleVO;

@Service
public class ConsultingService implements IConsultingService {

	@Autowired
	IConsultingRepository consultingRepository;

//////////////상담 항목 관리//////////////////////
	@Override
	public List<ConItemVO> Consultationitems() {
		return consultingRepository.Consultationitems();
	}

	@Override
	public int itemInsert(ConItemVO conItemVO) {
		return consultingRepository.itemInsert(conItemVO);
	}

	@Override
	public int itemUpdate(ConItemVO conItemsVO) {
		return consultingRepository.itemUpdate(conItemsVO);
	}

	@Override
	public int itemDelete(String itemId) {
		return consultingRepository.itemDelete(itemId);
	}

	@Override
	public String itemCheck(ConItemVO conItemVO) {
		return consultingRepository.itemCheck(conItemVO);
	}
//////////////상담 항목 관리//////////////////////    

//////////////상담원 시간표 확인//////////////////////    
	@Override
	public List<SchedulePrintVO> adminSchedulesList() {
		return consultingRepository.adminScheduleList();
	}
//////////////상담원 시간표 확인//////////////////////

//////////////상담원 시간표 확인//////////////////////

	@Override
	public List<SchedulePrintVO> counselorSchedulesList(String id) {
		String checkId = consultingRepository.checkId(id);

		return consultingRepository.counselorScheduleList(checkId);
	}

	@Override
	public int scheduleCansel(int id) {
		return consultingRepository.scheduleCansel(id);
	}

//////////////상담원 시간표 확인//////////////////////

//////////////상담원 시간표 등록//////////////////////
	@Override
	public int insertSchedule(ScheduleVO scheduleVO) {
		String id = consultingRepository.checkId(scheduleVO.getId());
		if (id == null) {
			return 0;
		}

		int year = scheduleVO.getYear();
		int month = scheduleVO.getMonth();
		int day = scheduleVO.getDay();
		boolean[] list = scheduleVO.getTimeSlots();
		LocalDate date = LocalDate.of(year, month, day);
		String strDate = date.toString();
		int cdNum = 10;
		int num = 0;

		try {
			for (int i = 0; i < list.length; i++) {
				if (list[i]) {
					// 해당 시간대에 이미 스케줄이 있는지 확인
					if (!consultingRepository.checkDuplicate(id, cdNum, strDate)) {
						// 중복되지 않으면 스케줄 추가
						num += consultingRepository.insertSchedule(id, cdNum, strDate);
					}
				}
				if (i != 4) {
					cdNum += 10;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		if (num == 0) {
			num = -1;
		}
		return num;
	}
//////////////상담원 시간표 등록//////////////////////
	
	
	
//////////////상담원 상담 신청 처리//////////////////////

@Override
	public List<SchedulePrintVO> scheduleIdList(int scheduleId) {
		return consultingRepository.scheduleIdList(scheduleId);
	}
//////////////상담원 상담 신청 처리//////////////////////

//////////////학생 상담 종합 이력//////////////////////   
	@Override
	public List<ResultVO> resultList() {
		return consultingRepository.resultList();
	}
//////////////학생 상담 종합 이력//////////////////////


	//////////////학생 상담 신청//////////////////////
	@Override
	public List<ConuselorVO> counselorList() {
		return consultingRepository.counselorList();
	}

	@Override
	public int request(SchedulePrintVO schedulePrintVO) {
		schedulePrintVO.setStudentId(consultingRepository.studentIdCheck(schedulePrintVO.getStudentId()));
		return consultingRepository.request(schedulePrintVO);
	}
//////////////학생 상담 신청//////////////////////
}
