package com.wizian.cbb.tng.stdnt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.wizian.cbb.tng.bzenty.model.TngVO;
import com.wizian.cbb.tng.stdnt.service.IStdntAplyService;

@RestController
public class StdntAplyController {

	@Autowired
	IStdntAplyService stdntAplyService;

	@PostMapping("/tng/stdntAly")
	public @ResponseBody List<TngVO> stdntAly() {
		List<TngVO> tempList = stdntAplyService.selectProcTng();
		return tempList;
	}
}
