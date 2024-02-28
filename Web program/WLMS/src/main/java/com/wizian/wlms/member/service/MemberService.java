package com.wizian.wlms.member.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wizian.wlms.member.dao.IMemberRepository;
import com.wizian.wlms.member.model.MemberVO;

@Service
public class MemberService implements IMemberService {

	@Autowired
	IMemberRepository memberRepository;

	@Override
	public void insertMember(MemberVO member) {
		memberRepository.insertMember(member);
	}

	@Override
	public List<Map<String, Object>> getAllGroupName() {
		return memberRepository.getAllGroupName();
	}

	@Override
	public MemberVO selectMember(String id) {
		return memberRepository.selectMember(id);
	}

	@Override
	public void deleteMember(String id, String password) {
		memberRepository.deleteMember(id, password);
	}

}
