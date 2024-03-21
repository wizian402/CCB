package com.wizian.cbb.user.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
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
			Map<String, Object> errorResponse = new HashMap<String, Object>();

			if (userVo != null && userVo.getPswd().equals(pswd) && userVo.getUserCloseYn().equals("N")) {
				session.setMaxInactiveInterval(600);
				session.setAttribute("loginId", loginId);
				session.setAttribute("memberGroup", userVo.getUserGroupCd());
				// 최근 로그인 시간 저장
				userService.updateRcntLoginDt(loginId);
				// 비밀 번호 오류 횟수 초기화
				userService.updatePswdErrCnt(loginId, 0);
				// React 페이지에 아이디, 그룹 리턴
				Map<String, String> responseMap = new HashMap<String, String>();
				responseMap.put("loginId", loginId);
				responseMap.put("userGroupCd", userVo.getUserGroupCd());
				// 학생 취업상태 조회 위해 추가 by 송양민
				responseMap.put("userNo", userVo.getUserNo());
				return ResponseEntity.ok(responseMap);
			} else if (userVo.getPswdErrCnt() < 5 && userVo.getUserCloseYn().equals("N")) {
				// 비밀번호 틀린 횟수 +1
				userService.updatePswdErrCnt(loginId, userVo.getPswdErrCnt() + 1);
				userVo = userService.selectUser(loginId);
				int pswdErrCnt = userVo.getPswdErrCnt();
				// 비밀번호 5회 틀릴시 계정 잠금
				if (pswdErrCnt >= 5) {
					userService.updateUserCloseYn(loginId, "Y");
				}
				// 결과 리턴
				errorResponse.put("error", "아이디 또는 비밀번호가 틀립니다.\n" + "5회 이상 틀릴시 계정이 잠깁니다. ");
				return ResponseEntity.badRequest().body(errorResponse);
			} else if (userVo.getUserCloseYn().equals("Y")) {
				errorResponse.put("error", "비밀번호 찾기로 계정 잠금을 해제하세요.");
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

	@PostMapping("/user/findPswd")
	public ResponseEntity<?> findPswd(@RequestBody String findPswdData, HttpSession session) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> findPswdMap = objectMapper.readValue(findPswdData,
					new TypeReference<Map<String, String>>() {
					});
			String tableNm = null;
			String nameSql = null;
			String telNoSql = null;

			UserVO userVo = userService.selectUser(findPswdMap.get("loginId"));
			if (userVo.getUserGroupCd().equals("10")) {
				tableNm = "ADMINISTRATOR";
				nameSql = "NM";
				telNoSql = "ADMIN_TELNO";
			} else if (userVo.getUserGroupCd().equals("20")) {
				tableNm = "STDNT";
				nameSql = "STDNT_NM";
				telNoSql = "STDNT_TELNO";
			} else if (userVo.getUserGroupCd().equals("30")) {
				tableNm = "ACAVSR";
				nameSql = "ACAVSR_NM";
				telNoSql = "ACAVSR_TELNO";
			} else if (userVo.getUserGroupCd().equals("40")) {
				tableNm = "SCSBJT_USER";
				nameSql = "SCSBJT_PIC_NM";
				telNoSql = "STDNT_PIC_TELNO";
			} else if (userVo.getUserGroupCd().equals("50")) {
				tableNm = "BZENTY_USER";
				nameSql = "BZENTY_USER_NM";
				telNoSql = "BZENTY_USER_TELNO";
			} else if (userVo.getUserGroupCd().equals("60")) {
				tableNm = "COUNSELOR";
				nameSql = "NAME";
				telNoSql = "MBL_TELNO";
			}

			Map<String, Object> userInfo = userService.getUserInfo(findPswdMap.get("loginId"), tableNm, nameSql,
					telNoSql);
			if (userInfo != null) {
				if (findPswdMap.get("userNm").equals((String) userInfo.get("Nm"))
						&& findPswdMap.get("telNo").equals((String) userInfo.get("TelNo"))) {
					return ResponseEntity.ok("success");
				} else {
					return ResponseEntity.ok("fail");
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("일치하는 정보를 찾을 수 없습니다.");
	}

	@PostMapping("/user/changePswd")
	public ResponseEntity<?> changePswd(@RequestBody String changePswdData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> changePswdMap = objectMapper.readValue(changePswdData,
					new TypeReference<Map<String, String>>() {
					});
			String userId = changePswdMap.get("userId");
			String newPswd = changePswdMap.get("newPswd");
			userService.updatePswd(userId, newPswd);
			userService.updateUserCloseYn(userId, "N");
			userService.updatePswdErrCnt(userId, 0);
			userService.updatePswdChgDt(userId);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}
}
