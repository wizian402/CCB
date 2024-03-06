package com.wizian.wlms.user.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizian.wlms.user.model.UserVO;
import com.wizian.wlms.user.service.IUserService;

@RestController
public class UserController {

	@Autowired
	@Qualifier("userService")
	IUserService userService;

	@PostMapping("/user/signIn")
	public void signIn(@RequestBody UserVO userVO) {
		userService.insertUser(userVO);
	}

	@PostMapping("/user/login")
	public void login(@RequestBody String loginData, HttpSession session) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> loginMap = objectMapper.readValue(loginData, new TypeReference<Map<String, String>>() {
			});
			String id = loginMap.get("id");
			String pswd = loginMap.get("password");
			UserVO userVo = userService.selectUser(id);
			if (userVo == null) {

			} else {
				if (userVo.getPswd().equals(pswd)) {
					session.setMaxInactiveInterval(600);
					session.setAttribute("id", id);
					session.setAttribute("memberGroup", userVo.getUserGroupCd());
				} else {

				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
