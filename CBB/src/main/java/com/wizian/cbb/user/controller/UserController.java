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
	public ResponseEntity<Map<String, String>> login(@RequestBody String loginData, HttpSession session) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {});
			String id = loginMap.get("id");
			String pswd = loginMap.get("password");
			UserVO userVo = userService.selectUser(id);
			if (userVo != null && userVo.getPswd().equals(pswd)) {
				session.setMaxInactiveInterval(600);
				session.setAttribute("id", id);
				session.setAttribute("memberGroup", userVo.getUserGroupCd());
				userService.updateRcntLoginDt(id);
				Map<String, String> responseMap = new HashMap<String, String>();
				responseMap.put("id", id);
				responseMap.put("userGroupCd", userVo.getUserGroupCd());
				return ResponseEntity.ok(responseMap);
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
