package com.addShot.zoosum.domain.animal.service;

import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.domain.animal.repository.AnimalMotionRepository;
import com.addShot.zoosum.domain.animal.repository.AnimalRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.UserAnimal;
import com.addShot.zoosum.util.RandomUtil;
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
	private final AnimalRepository animalRepository;

	@Override
	public List<UserAnimalListResponse> getUserAnimalList(String userId) {
		log.info("AnimalService userId : {}", userId);

		List<UserAnimal> userAnimals = userAnimalRepository.findAllByUserId(userId).get();
		List<UserAnimalListResponse> responseList = new ArrayList<>();

		for(UserAnimal ua: userAnimals) {
			UserAnimalListResponse response = UserAnimalListResponse.builder()
				.animalName(ua.getUserAnimalName())
				.fileUrl(animalMotionRepository.findMotion(ua.getAnimal().getAnimalId()).get().getFileUrl())
				.selected(ua.isSelected())
				.build();
			responseList.add(response);
		}
		return responseList;
	}

	@Override
	public UserAnimalDetailResponse getUserAnimalDetail(String userId, Long animalId) {

		Animal animal = animalRepository.findById(animalId).get();
		UserAnimal userAnimal = userAnimalRepository.findByUserIdAndAnimalId(userId, animalId)
			.get();
		AnimalMotion animalMotion = animalMotionRepository.findMotion(animalId).get();

		UserAnimalDetailResponse response = UserAnimalDetailResponse.builder()
			.userAnimalName(userAnimal.getUserAnimalName())
			.createTime(userAnimal.getTime().getCreateTime())
			.timeTogether(userAnimal.getTimeTogether())
			.trashTogether(userAnimal.getTrashTogether())
			.lengthTogether(userAnimal.getLengthTogether())
			.fileUrl(animalMotion.getFileUrl())
			.description(animal.getDescription())
			.build();

		return response;
	}

	@Override
	public AnimalDrawResponse getAnimalDraw() {
		List<Animal> animalList = animalRepository.findAll();
		Animal animal = RandomUtil.getRandomElement(animalList);
		Long animalId = animal.getAnimalId();

		AnimalDrawResponse response = AnimalDrawResponse.builder()
			.animalId(animalId)
			.animalName(animal.getAnimalName())
			.fileUrl(animalMotionRepository.findMotion(animalId).get().getFileUrl())
			.build();

		return response;
	}


}
