package com.wizian.cbb.tng.bzenty.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.wizian.cbb.tng.bzenty.service.ITngProgService;

@RestController
public class TngProgController {

	@Autowired
	ITngProgService tngProgService;
}
