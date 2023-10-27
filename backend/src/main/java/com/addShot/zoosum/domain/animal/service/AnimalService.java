package com.addShot.zoosum.domain.animal.service;

import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.animal.dto.response.FlogAnimalResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.entity.UserAnimal;
import java.util.List;

public interface AnimalService {

	/**
	 * animal 1번 - 내 동물 리스트 조회 (도감용)
	 * @param userId
	 * @return List<UserAnimalListResponse>
	 */
	List<UserAnimalListResponse> getUserAnimalList(String userId);

	/**
	 * animal 2번 - 내 동물 상세 조회
	 * @param userId
	 * @param animalId
	 * @return UserAnimalDetailResponse
	 */
	UserAnimalDetailResponse getUserAnimalDetail(String userId, Long animalId);

	/**
	 * animal 3번 - 동물 뽑기
	 * @return AnimalDrawResponse
	 */
	AnimalDrawResponse getAnimalDraw();

	/**
	 * animal 4번 - 산책 나갈 동물 리스트
	 * @param userId
	 * @return List<FlogAnimalResponse>
	 */
	List<FlogAnimalResponse> getFlogAnimalList(String userId);

}
