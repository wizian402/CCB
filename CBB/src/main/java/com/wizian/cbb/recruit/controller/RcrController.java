package com.wizian.cbb.recruit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wizian.cbb.recruit.model.RcrResumesVO;
import com.wizian.cbb.recruit.service.IRcrService;

@Controller
public class RcrController {
	@Autowired
	IRcrService rcrService;
	
	@RequestMapping("/rcr/list")
	public @ResponseBody List<RcrResumesVO> getAllResumes(){
		List list = rcrService.getAllResumes();
		System.out.println(list);
		return list;
	}
}
