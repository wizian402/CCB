package com.wizian.wlms.consulting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.wlms.consulting.dao.IConsultingRepository;
import com.wizian.wlms.consulting.model.ConItemsVO;

@Service
public class ConsultingService implements IConsultingService {

    @Autowired
    IConsultingRepository consultingRepository;

    @Override
    public List<ConItemsVO> Consultationitems() {
        return consultingRepository.Consultationitems();
    }
}
