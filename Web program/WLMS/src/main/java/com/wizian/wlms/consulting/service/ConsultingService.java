package com.wizian.wlms.consulting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.wlms.consulting.dao.IConsultingRepository;
import com.wizian.wlms.consulting.model.ConItemVO;

@Service
public class ConsultingService implements IConsultingService {

    @Autowired
    IConsultingRepository consultingRepository;

    @Override
    public List<ConItemVO> Consultationitems() {
        return consultingRepository.Consultationitems();
    }
    @Override
    public int itemInsert(ConItemVO conItemVO) {
    	return consultingRepository.itemInsert(conItemVO);
    }
    
    @Override
    public int itemUpdate(ConItemVO conItemsVO) {
    	return consultingRepository.itemUpdate(conItemsVO);
    }

    @Override
    public int itemDelete(String itemId) {
    	return consultingRepository.itemDelete(itemId);
    }
    
    @Override
    public String itemCheck(ConItemVO conItemVO) {
    	return consultingRepository.itemCheck(conItemVO);
    }
   
}
