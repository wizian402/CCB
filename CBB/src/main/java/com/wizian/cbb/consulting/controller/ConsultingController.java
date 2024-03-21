package com.wizian.cbb.consulting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wizian.cbb.consulting.model.ConItemVO;
import com.wizian.cbb.consulting.model.ResultVO;
import com.wizian.cbb.consulting.model.SchedulePrintVO;
import com.wizian.cbb.consulting.model.ScheduleVO;
import com.wizian.cbb.consulting.model.ConuselorVO;
import com.wizian.cbb.consulting.service.IConsultingService;

@Controller
public class ConsultingController {

	@Autowired
	IConsultingService consultingService;
	
	//////////////상담 항목 관리//////////////////////
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(value = "/consulting/items")
	public @ResponseBody List<ConItemVO> Consultationitems() {
		List list = consultingService.Consultationitems();
		return list;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/consulting/items/insert")
	public @ResponseBody int ItemInsert(@RequestBody ConItemVO conItemsVO) {
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

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/consulting/items/update")
	public @ResponseBody int ItemUpdate(@RequestBody ConItemVO conItemsVO) {	
		int num = 0;
		num = consultingService.itemUpdate(conItemsVO);
		return num;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/consulting/items/delete")
	public @ResponseBody int ItemDelete(@RequestBody ConItemVO conItemsVO) {
		int num = 0;
		num = consultingService.itemDelete(conItemsVO.getItemID());
		return num;
	}
	//////////////상담 항목 관리//////////////////////
	
	
	
	//////////////상담원 시간표 확인//////////////////////
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(value = "/consulting/schedule")
	public @ResponseBody List<SchedulePrintVO> adminSchedules() {
		List list = consultingService.adminSchedulesList();
		return list;
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/consulting/insertSchedule")
	public @ResponseBody int insertSchedule(@RequestBody ScheduleVO scheduleVO) {
		int num = 0;
		num = consultingService.insertSchedule(scheduleVO);
		return num;
	}
	//////////////상담원 시간표 확인//////////////////////
	
	
	
	
//////////////학생 상담 종합 이력//////////////////////
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(value = "/consulting/result")
	public @ResponseBody List<ResultVO> resultsList() {
		List list = consultingService.resultList();
		return list;
	}
//////////////학생 상담 종합 이력//////////////////////

//////////////학생 상담 신청//////////////////////
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(value = "/consulting/counselor")
	public @ResponseBody List<ConuselorVO> counselorList() {
		List list = consultingService.counselorList();
		System.out.println(list);
		return list;
	}
//////////////학생 상담 신청//////////////////////
	
	
	
}
