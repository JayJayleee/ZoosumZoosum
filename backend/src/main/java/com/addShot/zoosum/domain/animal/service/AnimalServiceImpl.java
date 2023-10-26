package com.addShot.zoosum.domain.animal.service;

import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.domain.animal.repository.AnimalMotionRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.entity.UserAnimal;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnimalServiceImpl implements AnimalService {

	private final UserAnimalRepository userAnimalRepository;
	private final AnimalMotionRepository animalMotionRepository;

	@Override
	public List<UserAnimalListResponse> getUserAnimalList(String userId) {
		log.info("AnimalService userId : {}", userId);

		List<UserAnimal> userAnimals = userAnimalRepository.findAllByUserId(userId).get();
		List<UserAnimalListResponse> responseList = new ArrayList<>();

		for(UserAnimal ua: userAnimals) {
			UserAnimalListResponse response = UserAnimalListResponse.builder()
				.animalName(ua.getUserAnimalName())
				.selected(ua.isSelected())
				.build();
			responseList.add(response);
		}

		return responseList;
	}


	@Override
	public UserAnimalDetailResponse getUserAnimalDetail(String userId, String animalId) {


		return null;
	}


}
