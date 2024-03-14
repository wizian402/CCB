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
import com.wizian.cbb.consulting.model.SchedulePrintVO;
import com.wizian.cbb.consulting.model.ScheduleVO;
import com.wizian.cbb.consulting.service.IConsultingService;

@Controller
public class ConsultingController {

	@Autowired
	IConsultingService consultingService;
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(value = "/consulting/items")
	public @ResponseBody List<ConItemVO> Consultationitems() {
		List list = consultingService.Consultationitems();
		System.out.println(list);
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
		num = consultingService.itemDelete(conItemsVO.getConItemsID());
		return num;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(value = "/consulting/schedules")
	public @ResponseBody List<SchedulePrintVO> adminSchedules() {
		List list = consultingService.adminSchedules();
		System.out.println(list);
		return list;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/consulting/insertSchedule")
	public @ResponseBody int insertSchedule(@RequestBody ScheduleVO scheduleVO) {
		int num = 0;
		System.out.println(scheduleVO);
		num = consultingService.insertSchedules(scheduleVO);
		return num;
	}

}
