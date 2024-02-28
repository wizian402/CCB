package com.wizian.wlms.member.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.wizian.wlms.member.model.MemberVO;
import com.wizian.wlms.member.service.IMemberService;

@Controller
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
	@GetMapping(value = "/member/signIn")
	public String signIn(Model model) {
		model.addAttribute("groupList", memberService.getAllGroupName());
		return "/member/signIn";
	}

	@PostMapping("/member/signIn")
	public String signIn(MemberVO member, Model model) {
		memberService.insertMember(member);
		return "/member/home";
	}

	// 로그인
	@GetMapping(value = "/member/login")
	public String login(Model model) {
		return "/member/login";
	}

	@PostMapping(value = "/member/login")
	public String login(String id, String password, HttpSession session, Model model) {
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
		return "redirect:/member/home";
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

}
