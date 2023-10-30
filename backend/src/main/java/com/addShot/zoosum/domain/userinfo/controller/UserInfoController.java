package com.addShot.zoosum.domain.userinfo.controller;

import com.addShot.zoosum.domain.userinfo.dto.response.BadgeListItemResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import com.addShot.zoosum.domain.userinfo.service.UserInfoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/userinfo")
public class UserInfoController {

	private final UserInfoService userInfoService;

	//userinfo 3번 - 나의 산책 기록 조회
	@GetMapping("/plog/{userId}")
	public ResponseEntity<?> findUserPlogRecord(@PathVariable String userId) {
		try {
			//@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
			//String userId = headerUtils.getUserId(authorizationHeader); //규성이가 user부분 하면 @RequestHeader넣고 이거 주석 풀기
			PlogRecordResponse record = userInfoService.getPlogRecord(userId);
			return ResponseEntity.ok(record);
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}

	//userinfo 4번 - 내 뱃지 조회
	@GetMapping("/badge/{userId}")
	public ResponseEntity<?> findUserBadge(@PathVariable String userId) {
		try {
			//@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
			//String userId = headerUtils.getUserId(authorizationHeader); //규성이가 user부분 하면 @RequestHeader넣고 이거 주석 풀기
			List<BadgeListItemResponse> userBadgeList = userInfoService.getUserBadgeList(userId);
			return ResponseEntity.ok(userBadgeList);
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}


}
