package com.wizian.wlms.member.service;

import java.util.List;
import java.util.Map;

import com.wizian.wlms.member.model.MemberVO;

public interface IMemberService {
	void insertMember(MemberVO member);

	void deleteMember(String id, String password);
	
	MemberVO selectMember(String id);

	List<Map<String, Object>> getAllGroupName();

}
