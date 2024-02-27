package com.wizian.wlms.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.wizian.wlms.member.dao.IMemberRepository;
import com.wizian.wlms.member.model.MemberVO;

@Service
public class MemberService implements IMemberService {

	@Autowired
	IMemberRepository memberRepository;
	
	@Override
	public void insertEmp(MemberVO member) {
		memberRepository.insertMember(member);
	}

}
