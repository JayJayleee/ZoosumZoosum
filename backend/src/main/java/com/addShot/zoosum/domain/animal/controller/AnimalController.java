package com.addShot.zoosum.domain.animal.controller;

import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.domain.animal.service.AnimalService;
import com.addShot.zoosum.entity.UserAnimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/animal")
public class AnimalController {

	private final AnimalService animalService;

	//animal 1번 - 내 동물 리스트 조회 (도감용)
//	@GetMapping
	@GetMapping("/{userId}")
	public ResponseEntity<?> findUserAnimal(@PathVariable String userId) {
		log.info("AnimalController userId : {}", userId);
		try {
			//@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
			//String userId = headerUtils.getUserId(authorizationHeader); //규성이가 user부분 하면 @RequestHeader넣고 이거 주석 풀기
			List<UserAnimalListResponse> userAnimalList = animalService.getUserAnimalList(userId);
			return ResponseEntity.ok(userAnimalList);
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}



}
