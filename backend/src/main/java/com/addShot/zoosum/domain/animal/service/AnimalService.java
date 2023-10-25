package com.addShot.zoosum.domain.animal.service;

import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.entity.UserAnimal;
import java.util.List;

public interface AnimalService {

	List<UserAnimalListResponse> getUserAnimalList(String userId);
	//animal 1번 - 내 동물 리스트 조회 (도감용)

	UserAnimalDetailResponse getUserAnimalDetail(String userId, String animalId);
	//animal 2번 - 내 동물 상세 조회

}
