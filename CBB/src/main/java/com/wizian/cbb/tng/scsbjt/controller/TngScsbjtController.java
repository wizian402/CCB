package com.wizian.cbb.tng.scsbjt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RestController;

import com.wizian.cbb.tng.scsbjt.service.ITngScsbjtService;

@RestController
public class TngScsbjtController {
	@Autowired
	@Qualifier("tngScsbjtService")
	ITngScsbjtService tngScsbjtService;
}
