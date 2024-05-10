package com.wizian.cbb.consulting.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wizian.cbb.consulting.model.ConItemVO;
import com.wizian.cbb.consulting.model.ResultVO;
import com.wizian.cbb.consulting.model.SchedulePrintVO;
import com.wizian.cbb.consulting.model.ScheduleVO;
import com.wizian.cbb.consulting.model.ConuselorVO;
import com.wizian.cbb.consulting.model.ProcessingVO;
import com.wizian.cbb.consulting.service.IConsultingService;

@Controller
public class ConsultingController {

	@Autowired
	IConsultingService consultingService;
	
	@GetMapping(value = "/consulting/items")
	public @ResponseBody List<ConItemVO> consultationitems() {
		List list = consultingService.Consultationitems();
		return list;
	}

	@PostMapping(value = "/consulting/items/insert")
	public @ResponseBody int itemInsert(@RequestBody ConItemVO conItemsVO) {
//		String checkId = consultingService.itemCheck(conItemsVO);
//		System.out.println(checkId);
		int num = 0;
//		if(checkId == null) {
//			num = consultingService.itemInsert(conItemsVO);
//			return num;
//		}else {
//			num = consultingService.itemUpdate(conItemsVO);
//		}
		num = consultingService.itemInsert(conItemsVO);
		return num;
	}

	@PostMapping(value = "/consulting/items/update")
	public @ResponseBody int itemUpdate(@RequestBody ConItemVO conItemsVO) {	
		int num = 0;
		num = consultingService.itemUpdate(conItemsVO);
		return num;
	}

	@PostMapping(value = "/consulting/items/delete")
	public @ResponseBody int itemDelete(@RequestBody ConItemVO conItemsVO) {
		int num = 0;
		num = consultingService.itemDelete(conItemsVO.getItemID());
		return num;
	}
	//////////////상담 항목 관리//////////////////////
	
	
	
	//////////////상담원 시간표 확인//////////////////////c
	@GetMapping(value = "/consulting/adminSchedule")
	public @ResponseBody List<SchedulePrintVO> adminSchedulesList() {
		List list = consultingService.adminSchedulesList();
		return list;
	}

	//////////////상담원 시간표 확인//////////////////////
	
	

//////////////학생 상담 종합 이력//////////////////////
	@GetMapping(value = "/consulting/resultList")
	public @ResponseBody List<ResultVO> resultsList() {
		List list = consultingService.resultList();
		return list;
	}
//////////////학생 상담 종합 이력//////////////////////


	
	
//////////////상담원 시간표 확인//////////////////////

	@GetMapping(value = "/consulting/counselorSchedule")
	public @ResponseBody List<SchedulePrintVO> counselorScheduleList(String id) {
		List list = consultingService.counselorSchedulesList(id);
		return list;
	}
	
	@PostMapping(value = "/consulting/counselorSchedule/cancel")
	public @ResponseBody int counselorScheduleCancel(@RequestBody int scheduleId) {
		return consultingService.scheduleCansel(scheduleId);
	}
	
	
//////////////상담원 시간표 확인//////////////////////

//////////////상담원 시간표 등록//////////////////////
	@PostMapping(value = "/consulting/insertSchedule")
	public @ResponseBody int insertSchedule(@RequestBody ScheduleVO scheduleVO) {
		int num = 0;
		num = consultingService.insertSchedule(scheduleVO);
		return num;
	}

//////////////상담원 시간표 등록//////////////////////
	
//////////////상담원 상담 신청 처리//////////////////////
	@PostMapping(value = "/consulting/processing")
	public @ResponseBody List<SchedulePrintVO> processing(@RequestBody int scheduleId) {
		List list = consultingService.scheduleIdList(scheduleId);
		return list;
	}
	@PostMapping(value = "/consulting/reservation")
	public @ResponseBody int reservation(@RequestBody ProcessingVO processingVO) {
		return consultingService.reservation(processingVO);
	}
//////////////상담원 상담 신청 처리//////////////////////
	
	
//////////////상담원 상담 결과 등록//////////////////////
	
	@PostMapping(value = "/consulting/result")
	public @ResponseBody List<ProcessingVO> resultRegistrationList(@RequestBody Map<String, String> requestBody) {
		List list = consultingService.resultRegistrationList(requestBody.get("id"));
		return list;
	}
	
	@PostMapping(value = "/consulting/ResultRegistration")
	public @ResponseBody int resultRegistration(@RequestBody Map<String, String> requestBody) {
		String comment = requestBody.get("comment");
		String reservationId = requestBody.get("reservationId");
		return consultingService.resultRegistration(comment, reservationId);
	}
	
//////////////상담원 상담 결과 등록//////////////////////
	
	
	
//////////////학생 상담 신청//////////////////////
	@GetMapping(value = "/consulting/counselor")
	public @ResponseBody List<ConuselorVO> counselorList() {
		List list = consultingService.counselorList();
		return list;
	}
	
	@GetMapping(value = "/consulting/studentSchedule")
	public @ResponseBody List<SchedulePrintVO> studentScheduleList(String id) {
		List list = consultingService.studentScheduleList(id);
		System.out.println(list);
		return list;
	}
	
	@PostMapping(value = "/consulting/request")
	public @ResponseBody int request(@RequestBody SchedulePrintVO schedulePrintVO) {
		int num = 0;
		num = consultingService.request(schedulePrintVO);
		return num;
	}
//////////////학생 상담 신청//////////////////////
	
	
	
}
