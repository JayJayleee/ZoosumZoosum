package com.addShot.zoosum.domain.animal.controller;

import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.domain.animal.service.AnimalService;
import com.addShot.zoosum.entity.UserAnimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/animal")
public class AnimalController {

	private final AnimalService animalService;

	@GetMapping
	public ResponseEntity<Response> findUserAnimal(@PathVariable String userId) {
		try {
			//@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
			//String userId = headerUtils.getUserId(authorizationHeader); //규성이가 user부분 하면 @RequestHeader넣고 이거 주석 풀기
			List<UserAnimalListResponse> userAnimalList = animalService.getUserAnimalList(userId);
			return ResponseEntity.ok(new Response(userAnimalList));
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body(new Response("잘못된 요청입니다."));
		}
	}
	//animal 1번 - 내 동물 리스트 조회 (도감용)


	@Data
	@AllArgsConstructor
	static class Response<T> {
		private T data;
	}
	//리스트 반환용 클래스

}
