package com.wizian.wlms.consulting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wizian.wlms.consulting.model.ConItemsVO;
import com.wizian.wlms.consulting.service.IConsultingService;

@Controller
public class ConsultingController {

    @Autowired
    IConsultingService consultingService;
    
    @CrossOrigin(origins = "http://localhost:3001")
    @RequestMapping(value = "/api/students")
    public @ResponseBody List<ConItemsVO> Consultationitems() {
        List list = consultingService.Consultationitems();
        System.out.println(list);
        return list;
    }
}