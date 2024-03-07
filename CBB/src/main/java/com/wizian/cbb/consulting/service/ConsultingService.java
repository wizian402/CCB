package com.wizian.cbb.consulting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.cbb.consulting.dao.IConsultingRepository;
import com.wizian.cbb.consulting.model.ConItemsVO;

@Service
public class ConsultingService implements IConsultingService {
	@Autowired
	IConsultingRepository consultingRepository;

	@Override
	public List<ConItemsVO> Consultationitems() {
		return consultingRepository.Consultationitems();
	}
}
