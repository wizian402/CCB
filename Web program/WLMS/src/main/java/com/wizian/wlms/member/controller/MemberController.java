package com.wizian.wlms.member.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.wlms.member.model.MemberVO;
import com.wizian.wlms.member.service.IMemberService;

@RestController
public class MemberController {

	@Autowired
	@Qualifier("memberService")
	IMemberService memberService;

	// 로그인 메인 페이지
	@GetMapping(value = "/member/home")
	public String home() {
		return "/member/home";
	}

	// 회원가입
	@PostMapping("/member/signIn")
	public void signIn(@RequestBody MemberVO memberVO) {
		memberService.insertMember(memberVO);
	}

	// 로그인
	@PostMapping(value = "/member/login")
	public void login(@RequestBody String loginData, HttpSession session) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {
			});
			String id = loginMap.get("id");
			String password = loginMap.get("password");
			MemberVO memberVO = memberService.selectMember(id);
			if (memberVO == null) {

			} else {
				if (memberVO.getPassword().equals(password)) {
					session.setMaxInactiveInterval(600);
					session.setAttribute("id", id);
					session.setAttribute("memberGroup", memberVO.getMemberGroup());
				} else {

				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// 로그아웃
	@GetMapping(value = "/member/logout")
	public String logout(HttpSession session, Model model) {
		session.invalidate();
		return "/member/home";
	}

	// 탈퇴
	@GetMapping(value = "/member/secession")
	public String secession() {
		return "/member/secession";
	}

	@PostMapping(value = "/member/secession")
	public String secession(String password, HttpSession session, Model model) {
		MemberVO memberVO = memberService.selectMember((String) session.getAttribute("id"));
		if (memberVO.getPassword().equals(password)) {
			memberService.deleteMember(memberVO.getId(), memberVO.getPassword());
			session.invalidate();
		}
		return "redirect:/member/home";
	}

	// 수정
	@GetMapping(value = "/member/modify")
	public String modify(Model model) {
		model.addAttribute("groupList", memberService.getAllGroupName());
		return "/member/modify";
	}

	@PostMapping("/member/modify")
	public String modify(MemberVO member, Model model) {
		System.out.println(member.getId());
		memberService.updateMember(member);
		
		return "redirect:/member/home";
	}

}
