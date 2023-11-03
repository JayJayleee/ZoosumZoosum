package com.addShot.zoosum.domain.animal.service;

import com.addShot.zoosum.domain.animal.dto.request.MyAnimalRequest;
import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.animal.dto.response.FlogAnimalResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.domain.animal.repository.AnimalMotionRepository;
import com.addShot.zoosum.domain.animal.repository.AnimalRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserAnimal;
import com.addShot.zoosum.entity.embedded.DivideTime;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.UserAnimalId;
import com.addShot.zoosum.util.DistanceUtil;
import com.addShot.zoosum.util.RandomUtil;
import com.addShot.zoosum.util.TimeUtil;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
	private final UserRepository userRepository;

	@Override
	public List<UserAnimalListResponse> getUserAnimalList(String userId) {
		log.info("AnimalService userId : {}", userId);

		List<UserAnimal> userAnimals = userAnimalRepository.findAllByUserId(userId).get();
		List<UserAnimalListResponse> responseList = new ArrayList<>();

		for(UserAnimal ua: userAnimals) {
			Long animalId = ua.getAnimal().getAnimalId();

			UserAnimalListResponse response = UserAnimalListResponse.builder()
				.animalId(animalId)
				.animalName(ua.getUserAnimalName())
				.fileUrl(animalMotionRepository.findMotion(animalId).get().getFileUrl())
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
		List<AnimalMotion> animalMotions = animalMotionRepository.findByAnimalId(animalId).get();
		AnimalMotion randomMotion = RandomUtil.getRandomElement(animalMotions);

		double meter = userAnimal.getLengthTogether();
		UserAnimalDetailResponse response = UserAnimalDetailResponse.builder()
			.animalId(animalId)
			.userAnimalName(userAnimal.getUserAnimalName())
			.createTime(userAnimal.getTime().getCreateTime())
			.trashTogether(userAnimal.getTrashTogether())
			.lengthTogether(DistanceUtil.getKilometer(meter))
			.fileUrl(randomMotion.getFileUrl())
			.description(animal.getDescription())
			.build();

		int time = userAnimal.getTimeTogether();
		DivideTime divideTime = TimeUtil.getTime(time);
		response.setHour(divideTime.getHour());
		response.setMinute(divideTime.getMinute());
		response.setSecond(divideTime.getSecond());

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
			.description(animal.getDescription())
			.fileUrl(animalMotionRepository.findMotion(animalId).get().getFileUrl())
			.build();

		return response;
	}

	@Override
	public List<FlogAnimalResponse> getFlogAnimalList(String userId) {
		List<UserAnimal> userAnimals = userAnimalRepository.findAllSelectedByUserId(userId).get();
		List<FlogAnimalResponse> responseList = new ArrayList<>();

		for(UserAnimal ua: userAnimals) {
			Long animalId = ua.getAnimal().getAnimalId();

			Optional<Animal> optionalAnimal = animalRepository.findById(animalId);
			Optional<AnimalMotion> optionMotion = animalMotionRepository.findMotion(animalId);
			double meter = ua.getLengthTogether();

			FlogAnimalResponse response = FlogAnimalResponse.builder()
				.animalId(animalId)
				.userAnimalName(ua.getUserAnimalName())
				.description(optionalAnimal.get().getDescription())
				.createTime(ua.getTime().getCreateTime())
				.trashTogether(ua.getTrashTogether())
				.lengthTogether(DistanceUtil.getKilometer(meter))
				.fileUrl(optionMotion.get().getFileUrl())
				.build();

			int time = ua.getTimeTogether();
			DivideTime divideTime = TimeUtil.getTime(time);
			response.setHour(divideTime.getHour());
			response.setMinute(divideTime.getMinute());
			response.setSecond(divideTime.getSecond());

			responseList.add(response);
		}
		return responseList;
	}

	@Override
	@Transactional
	public void registUserAnimal(MyAnimalRequest request, String userId) {
		//사용자에게 해당 동물이 있는지 판단
		Long animalId = request.getAnimalId();

		userAnimalRepository.findByUserIdAndAnimalId(userId, request.getAnimalId())
			.ifPresentOrElse(userAnimal -> { //이미 존재하는 경우
					UserAnimal ua = userAnimalRepository.findByUserIdAndAnimalId(userId, animalId).get(); //기존꺼 꺼내와서
					ua.setUserAnimalName(request.getUserAnimalName());
					userAnimalRepository.save(ua);
				},
				() -> { //존재하지 않는 경우
					UserAnimalId uaId = new UserAnimalId(userId, animalId);
					User user = userRepository.findById(userId).get();
					Animal animal = animalRepository.findById(animalId).get();
					String userAnimalName = request.getUserAnimalName();
					Time time = new Time(LocalDateTime.now(), LocalDateTime.now());
					UserAnimal ua = UserAnimal.toEntity(uaId, user, animal, userAnimalName, time);

					userAnimalRepository.save(ua);
				}
			);
	}

	@Override
	@Transactional
	public void updateUserAnimal(List<Long> request, String userId) {
		userAnimalRepository.updateUserAnimalToOut(userId); //이미 선택되어 있는 애들 false로
		userAnimalRepository.updateUserAnimalToIn(userId, request); //새로운 애들 true로
	}


}
