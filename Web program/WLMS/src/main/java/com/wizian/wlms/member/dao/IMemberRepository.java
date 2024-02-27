package com.wizian.wlms.member.dao;

import java.util.List;
import java.util.Map;

import com.wizian.wlms.member.model.MemberVO;

public interface IMemberRepository {
	void insertMember(MemberVO member);

	List<Map<String, Object>> getAllGroupName();
}
