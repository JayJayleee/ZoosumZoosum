package com.addShot.zoosum.domain.animal.service;

import com.addShot.zoosum.domain.animal.dto.request.MyAnimalRequest;
import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.animal.dto.response.NewImageResponse;
import com.addShot.zoosum.domain.animal.dto.response.PlogAnimalResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalDetailResponse;
import com.addShot.zoosum.domain.animal.dto.response.UserAnimalListResponse;
import com.addShot.zoosum.domain.animal.repository.AnimalMotionRepository;
import com.addShot.zoosum.domain.animal.repository.AnimalRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.domain.userinfo.repository.UserPlogInfoRepository;
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserAnimal;
import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.embedded.DivideTime;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.UserAnimalId;
import com.addShot.zoosum.entity.embedded.UserPlogInfoId;
import com.addShot.zoosum.entity.enums.CustomErrorType;
import com.addShot.zoosum.util.DistanceUtil;
import com.addShot.zoosum.util.RandomUtil;
import com.addShot.zoosum.util.TimeUtil;
import com.addShot.zoosum.util.exception.ExceedRequestException;
import com.addShot.zoosum.util.exception.NotExistAnimalException;
import com.addShot.zoosum.util.exception.UserNotFoundException;
import java.time.LocalDate;
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
	private final UserPlogInfoRepository userPlogInfoRepository;

	@Override
	public List<UserAnimalListResponse> getUserAnimalList(String userId) {
		log.info("AnimalService userId : {}", userId);

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		List<UserAnimal> userAnimals = userAnimalRepository.findAllByUserId(userId).get();

		if (userAnimals.size() == 0) {
			throw new NotExistAnimalException(CustomErrorType.NOT_EXIST.getMessage());
		}

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

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		Animal animal = animalRepository.findById(animalId).get();
		UserAnimal userAnimal = userAnimalRepository.findByUserIdAndAnimalId(userId, animalId)
			.get();

		if(userAnimal == null) {
			throw new NotExistAnimalException(CustomErrorType.NOT_EXIST.getMessage());
		}

		List<AnimalMotion> animalMotions = animalMotionRepository.findByAnimalId(animalId).get();
		AnimalMotion randomMotion = RandomUtil.getRandomElement(animalMotions);

		LocalDateTime create = userAnimal.getTime().getCreateTime();
		LocalDate createTime = create.toLocalDate(); //날짜 데이터로 변환
		double meter = userAnimal.getLengthTogether();

		UserAnimalDetailResponse response = UserAnimalDetailResponse.builder()
			.animalId(animalId)
			.userAnimalName(userAnimal.getUserAnimalName())
			.createTime(createTime)
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

	@Transactional
	@Override
	public AnimalDrawResponse getAnimalDraw(String userId) {

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		//해당 유저 알 하나 빼기
		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(userId)).get();
		userPlogInfo.setEgg(userPlogInfo.getEgg()-1);
		userPlogInfoRepository.save(userPlogInfo);

		//해당 유저에게 존재하는 동물 리스트
		List<UserAnimal> userAnimals = userAnimalRepository.findAllByUserId(userId).get();
		List<Long> userAnimalIds = new ArrayList<>();
		for(UserAnimal ua: userAnimals) {
			userAnimalIds.add(ua.getAnimal().getAnimalId());
		}

		//모든 동물 리스트
		List<Animal> animalList = animalRepository.findAll();

		//사용자에게 존재하는 동물은 모든 동물 리스트에서 제거
		for(Long id: userAnimalIds) {
			animalList.removeIf(animal -> animal.getAnimalId() == id);
		}

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
	public List<PlogAnimalResponse> getFlogAnimalList(String userId) {

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		List<UserAnimal> userAnimals = userAnimalRepository.findAllSelectedByUserId(userId).get();

		if(userAnimals.size() == 0) {
			throw new NotExistAnimalException(CustomErrorType.NOT_EXIST.getMessage());
		}

		List<PlogAnimalResponse> responseList = new ArrayList<>();

		for(UserAnimal ua: userAnimals) {
			Long animalId = ua.getAnimal().getAnimalId();

			Optional<Animal> optionalAnimal = animalRepository.findById(animalId);
			Optional<AnimalMotion> optionMotion = animalMotionRepository.findMotion(animalId);

			LocalDateTime create = ua.getTime().getCreateTime();
			LocalDate createTime = create.toLocalDate(); //날짜 데이터로 변환
			double meter = ua.getLengthTogether();

			PlogAnimalResponse response = PlogAnimalResponse.builder()
				.animalId(animalId)
				.userAnimalName(ua.getUserAnimalName())
				.description(optionalAnimal.get().getDescription())
				.createTime(createTime)
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

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		Long animalId = request.getAnimalId();
		UserAnimalId uaId = new UserAnimalId(userId, animalId);
		User user = userRepository.findById(userId).get();
		Animal animal = animalRepository.findById(animalId).get();
		String userAnimalName = request.getUserAnimalName();
		Time time = new Time(LocalDateTime.now(), LocalDateTime.now());
		UserAnimal ua = UserAnimal.toEntity(uaId, user, animal, userAnimalName, time, false);

		userAnimalRepository.save(ua);

	}

	@Override
	@Transactional
	public void registUserAnimalFirst(MyAnimalRequest request, String userId) {

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		Long animalId = request.getAnimalId();
		UserAnimalId uaId = new UserAnimalId(userId, animalId);
		User user = userRepository.findById(userId).get();
		Animal animal = animalRepository.findById(animalId).get();
		String userAnimalName = request.getUserAnimalName();
		Time time = new Time(LocalDateTime.now(), LocalDateTime.now());
		UserAnimal ua = UserAnimal.toEntity(uaId, user, animal, userAnimalName, time, true);

		userAnimalRepository.save(ua);
	}

	@Override
	@Transactional
	public void updateUserAnimal(List<Long> request, String userId) {

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		if(request.size() > 5) {
			throw new ExceedRequestException(CustomErrorType.EXCEED_REQUEST.getMessage());
		}

		userAnimalRepository.updateUserAnimalToOut(userId); //이미 선택되어 있는 애들 false로
		userAnimalRepository.updateUserAnimalToIn(userId, request); //새로운 애들 true로
	}

	@Override
	public NewImageResponse getNewAnimalImage(Long animalId, String fileUrl) {

		List<AnimalMotion> animalMotions = animalMotionRepository.findByAnimalId(animalId).get();
		List<AnimalMotion> forRandom = new ArrayList<>();

		for(int i = 0; i<animalMotions.size(); i++) {
			if(!animalMotions.get(i).getFileUrl().equals(fileUrl)) {
				forRandom.add(animalMotions.get(i));
			}
		}

		AnimalMotion randomMotion = RandomUtil.getRandomElement(forRandom);

		NewImageResponse response = NewImageResponse.builder()
			.animalId(animalId)
			.fileUrl(randomMotion.getFileUrl())
			.build();
		return response;
	}


}
