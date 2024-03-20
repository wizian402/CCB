package com.wizian.cbb.tng.bzenty.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.tng.bzenty.dao.ITngProgRepository;

@Service
public class TngProgService implements ITngProgService {

	@Autowired
	ITngProgRepository tngProgRepository;
}
