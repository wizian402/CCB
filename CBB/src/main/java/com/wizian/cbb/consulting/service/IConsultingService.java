package com.wizian.cbb.consulting.service;

import java.util.List;

import com.wizian.cbb.consulting.model.ConItemVO;

public interface IConsultingService {
	public List<ConItemVO> Consultationitems();
	public int itemInsert(ConItemVO conItemsVO);
	public int itemUpdate(ConItemVO conItemsVO);
	public int itemDelete(String itemId);
	public String itemCheck(ConItemVO conItemsVO);
	}
