package com.wizian.cbb.consulting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wizian.cbb.consulting.model.ConItemsVO;
import com.wizian.cbb.consulting.service.IConsultingService;

@Controller
public class ConsultingController {
	@Autowired
	IConsultingService consultingService;

	@RequestMapping(value = "/api/students")
	public @ResponseBody List<ConItemsVO> Consultationitems() {
		List list = consultingService.Consultationitems();
		System.out.println(list);
		return list;
	}
}
