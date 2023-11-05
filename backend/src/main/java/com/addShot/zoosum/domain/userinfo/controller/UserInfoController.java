package com.addShot.zoosum.domain.userinfo.controller;

import com.addShot.zoosum.domain.userinfo.dto.request.TreeCampaignRequest;
import com.addShot.zoosum.domain.userinfo.dto.response.BadgeListItemResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import com.addShot.zoosum.domain.userinfo.service.UserInfoService;
import com.addShot.zoosum.util.Response;
import com.addShot.zoosum.util.jwt.HeaderUtils;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[USERINFO]", description = "메인화면과 프로필 관련 API")
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
	private final HeaderUtils headerUtils;

	//userinfo 1번 - 메인페이지 (동물, 섬, 나무)
	@GetMapping("/main")
	public ResponseEntity<?> findUserMain(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);
		return ResponseEntity.ok(userInfoService.getUserMain(userId));
	}

	//userinfo 2번 - 메인페이지 (미션 현황, 씨앗 수, 나무 수)
	@GetMapping("/mission")
	public ResponseEntity<?> findUserMainInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader); //규성이가 user부분 하면 @RequestHeader넣고 이거 주석 풀기
		return ResponseEntity.ok(userInfoService.getUserInfoMain(userId));
	}

	//userinfo 3번 - 나의 산책 기록 조회
	@GetMapping("/plog/{nickname}")
	public ResponseEntity<?> findUserPlogRecord(@PathVariable String nickname) {
		PlogRecordResponse record = userInfoService.getPlogRecord(nickname);
		return ResponseEntity.ok(record);
	}

	//userinfo 4번 - 내 뱃지 조회
	@GetMapping("/badge/{nickname}")
	public ResponseEntity<?> findUserBadge(@PathVariable String nickname) {
		List<BadgeListItemResponse> userBadgeList = userInfoService.getUserBadgeList(nickname);
		return ResponseEntity.ok(new Response(userBadgeList));
	}

	//userinfo 5번 - 나무 캠페인 참여 데이터 입력
	@PostMapping("/tree")
	public ResponseEntity<?> findUserTree(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody TreeCampaignRequest request) {
		String userId = headerUtils.getUserId(authorizationHeader);
		userInfoService.insertTreeCampaignData(request, userId);
		return ResponseEntity.ok("완료되었습니다.");
	}


}
