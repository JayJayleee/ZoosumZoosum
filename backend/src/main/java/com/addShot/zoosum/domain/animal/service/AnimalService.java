package com.addShot.zoosum.domain.animal.service;

import com.addShot.zoosum.domain.animal.dto.request.MyAnimalRequest;
import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.animal.dto.response.PlogAnimalResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
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
	List<PlogAnimalResponse> getFlogAnimalList(String userId);

	/**
	 * animal 5 - 내 동물로 등록
	 * @param request
	 */
	void registUserAnimal(MyAnimalRequest request, String userId);

	/**
	 * animal 6 - 섬에 내보낼 동물 선택
	 * @param List<Long> 동물 번호 리스트
	 * @param String userId
	 */
	void updateUserAnimal(List<Long> request, String userId);

}
