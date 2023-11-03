package com.addShot.zoosum.domain.userinfo.controller;

import com.addShot.zoosum.domain.userinfo.dto.request.TreeCampaignRequest;
import com.addShot.zoosum.domain.userinfo.dto.response.BadgeListItemResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import com.addShot.zoosum.domain.userinfo.service.UserInfoService;
import com.addShot.zoosum.util.Response;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@OpenAPIDefinition(
	servers = {
		@Server(url = "/api", description = "Default Server URL")
	}
)
@RequestMapping("/userinfo")
public class UserInfoController {

	private final UserInfoService userInfoService;

	//userinfo 1번 - 메인페이지 (동물, 섬, 나무)
	@GetMapping("/main/{userId}")
	public ResponseEntity<?> findUserMain(@PathVariable String userId) {
		try {
			//@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
			//String userId = headerUtils.getUserId(authorizationHeader); //규성이가 user부분 하면 @RequestHeader넣고 이거 주석 풀기
			return ResponseEntity.ok(userInfoService.getUserMain(userId));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}

	//userinfo 2번 - 메인페이지 (미션 현황, 씨앗 수, 나무 수)
	@GetMapping("/mission/{userId}")
	public ResponseEntity<?> findUserMainInfo(@PathVariable String userId) {
		try {
			//@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
			//String userId = headerUtils.getUserId(authorizationHeader); //규성이가 user부분 하면 @RequestHeader넣고 이거 주석 풀기
			return ResponseEntity.ok(userInfoService.getUserInfoMain(userId));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}

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
			e.printStackTrace();
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
			return ResponseEntity.ok(new Response(userBadgeList));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}

	//userinfo 5번 - 나무 캠페인 참여 데이터 입력
	@PostMapping("/tree/{userId}")
	public ResponseEntity<?> findUserTree(@RequestBody TreeCampaignRequest request, @PathVariable String userId) {
		try {
			userInfoService.insertTreeCampaignData(request, userId);
			return ResponseEntity.ok("완료되었습니다.");
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}


}
