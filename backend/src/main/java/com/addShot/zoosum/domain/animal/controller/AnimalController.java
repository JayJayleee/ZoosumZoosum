package com.addShot.zoosum.domain.animal.controller;

import com.addShot.zoosum.domain.animal.dto.request.MyAnimalRequest;
import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.animal.dto.response.NewImageResponse;
import com.addShot.zoosum.domain.animal.dto.response.PlogAnimalResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.domain.animal.service.AnimalService;
import com.addShot.zoosum.entity.UserAnimal;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[ANIMAL]", description = "동물 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@OpenAPIDefinition(
	servers = {
		@Server(url = "/api", description = "Default Server URL")
	}
)
@RequestMapping("/animal")
public class AnimalController {

	private final AnimalService animalService;
	private final HeaderUtils headerUtils;

	//animal 1번 - 내 동물 리스트 조회 (도감용)
	@GetMapping
	public ResponseEntity<?> findUserAnimal(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);
		List<UserAnimalListResponse> userAnimalList = animalService.getUserAnimalList(userId);
		return ResponseEntity.ok(new Response(userAnimalList));
	}

	//animal 2번 - 내 동물 상세 조회
	@GetMapping("/{animalId}")
	public ResponseEntity<?> findUserAnimalDetail(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable Long animalId) {
		log.info("AnimalController animalId : {}", animalId);

		String userId = headerUtils.getUserId(authorizationHeader);
		UserAnimalDetailResponse response = animalService.getUserAnimalDetail(userId, animalId);
		return ResponseEntity.ok(response);
	}

	//animal 3번 - 동물 뽑기
	@GetMapping("/draw")
	public ResponseEntity<?> findAnimalDraw(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);
		AnimalDrawResponse response = animalService.getAnimalDraw(userId);
		return ResponseEntity.ok(response);
	}

	//animal 4번 - 산책 나갈 동물 리스트
	@GetMapping("/plog")
	public ResponseEntity<?> findFlogAnimalList(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);
		List<PlogAnimalResponse> flogAnimalList = animalService.getFlogAnimalList(userId);
		return ResponseEntity.ok(new Response(flogAnimalList));
	}

	//animal 5번 - 내 동물로 등록
	@PostMapping()
	public ResponseEntity<?> registUserAnimal(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody MyAnimalRequest myAnimalRequest) {
		String userId = headerUtils.getUserId(authorizationHeader);
		animalService.registUserAnimal(myAnimalRequest, userId);
		return ResponseEntity.ok("완료되었습니다.");
	}

	//animal 5-1번 - 내 동물로 등록 (최초)
	@PostMapping("/first")
	public ResponseEntity<?> registUserAnimalFirst(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody MyAnimalRequest myAnimalRequest) {
		String userId = headerUtils.getUserId(authorizationHeader);
		animalService.registUserAnimalFirst(myAnimalRequest, userId);
		return ResponseEntity.ok("완료되었습니다.");
	}

	//animal 6번 - 섬에 내보낼 동물 선택
	@PutMapping("/island")
	public ResponseEntity<?> updateUserAnimal(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody List<Long> request) {
		String userId = headerUtils.getUserId(authorizationHeader);
		animalService.updateUserAnimal(request, userId);
		return ResponseEntity.ok("완료되었습니다.");
	}

	//animal 8번 - 섬에 내보낸 동물 이미지 바꾸기
	@GetMapping("/new")
	public ResponseEntity<?> getNewAnimalImage(@RequestParam("animalId") Long animalId, @RequestParam("fileUrl") String fileUrl) {
		NewImageResponse response = animalService.getNewAnimalImage(animalId, fileUrl);
		return ResponseEntity.ok(response);
	}

}
