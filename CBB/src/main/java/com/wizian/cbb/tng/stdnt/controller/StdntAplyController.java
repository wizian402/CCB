package com.wizian.cbb.tng.stdnt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.wizian.cbb.tng.stdnt.service.IStdntAplyService;

@RestController
public class StdntAplyController {

	@Autowired
	IStdntAplyService stdntAplyService;
}
