package com.wizian.wlms.member.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.wizian.wlms.member.model.MemberVO;

public interface IMemberRepository {
	void insertMember(MemberVO member);

	void deleteMember(@Param("id") String id, @Param("password") String password);

	List<Map<String, Object>> getAllGroupName();

	MemberVO selectMember(@Param("id") String id);

}
