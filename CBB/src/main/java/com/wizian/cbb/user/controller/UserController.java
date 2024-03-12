package com.wizian.cbb.user.controller;

import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.cbb.user.model.UserVO;
import com.wizian.cbb.user.service.IUserService;

@RestController
public class UserController {
	@Autowired
	@Qualifier("userService")
	IUserService userService;

	@PostMapping("/user/login")
	public ResponseEntity<?> login(@RequestBody String loginData, HttpSession session) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {
			});
			String loginId = loginMap.get("loginId");
			String pswd = loginMap.get("password");
			UserVO userVo = userService.selectUser(loginId);
			if (userVo != null && userVo.getPswd().equals(pswd) && userVo.getUserCloseYn().equals("N")) {
				session.setMaxInactiveInterval(600);
				session.setAttribute("loginId", loginId);
				session.setAttribute("memberGroup", userVo.getUserGroupCd());
				// 최근 로그인 시간 저장
				userService.updateRcntLoginDt(loginId);
				// React 페이지에 아이디, 그룹 리턴
				Map<String, String> responseMap = new HashMap<String, String>();
				responseMap.put("loginId", loginId);
				responseMap.put("userGroupCd", userVo.getUserGroupCd());
				return ResponseEntity.ok(responseMap);
			} else {
				// 비밀번호 틀린 횟수 +1
				userService.updatePswdErrCnt(loginId);
				userVo = userService.selectUser(loginId);
				int pswdErrCnt = userVo.getPswdErrCnt();
				// 비밀번호 5회 틀릴시 계정 잠금
				if (pswdErrCnt >= 5) {
					userService.updateUserCloseYn(loginId, "Y");
				}
				// 결과 리턴
				Map<String, Object> errorResponse = new HashMap<String, Object>();
				errorResponse.put("error", "아이디 또는 비밀번호가 틀립니다.\n" + "비밀번호 오류 횟수 : " + pswdErrCnt);
				return ResponseEntity.badRequest().body(errorResponse);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}

	@PostMapping("/user/logout")
	public ResponseEntity<String> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("Logged out successfully");
	}
}
