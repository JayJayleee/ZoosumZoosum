package com.addShot.zoosum.domain.userinfo.service;

import com.addShot.zoosum.domain.activity.repository.ActivityRepository;
import com.addShot.zoosum.domain.animal.repository.AnimalMotionRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.domain.common.repository.BadgeRepository;
import com.addShot.zoosum.domain.common.repository.UserBadgeRepository;
import com.addShot.zoosum.domain.item.repository.UserItemRepository;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.domain.userinfo.dto.request.TreeCampaignRequest;
import com.addShot.zoosum.domain.userinfo.dto.response.BadgeListItemResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.MainInfoResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.MainResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.SelectedAnimalResponse;
import com.addShot.zoosum.domain.userinfo.repository.UserPlogInfoRepository;
import com.addShot.zoosum.entity.ActivityHistory;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.Badge;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserAnimal;
import com.addShot.zoosum.entity.UserBadge;
import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.embedded.DivideTime;
import com.addShot.zoosum.entity.embedded.Mission;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.Tree;
import com.addShot.zoosum.entity.embedded.UserBadgeId;
import com.addShot.zoosum.entity.embedded.UserPlogInfoId;
import com.addShot.zoosum.entity.enums.ActivityType;
import com.addShot.zoosum.entity.enums.CustomErrorType;
import com.addShot.zoosum.entity.enums.ItemType;
import com.addShot.zoosum.util.DistanceUtil;
import com.addShot.zoosum.util.RandomUtil;
import com.addShot.zoosum.util.TimeUtil;
import com.addShot.zoosum.util.exception.NotEnoughInputException;
import com.addShot.zoosum.util.exception.NotEnoughSeedException;
import com.addShot.zoosum.util.exception.NotExistAnimalException;
import com.addShot.zoosum.util.exception.NotExistIslandException;
import com.addShot.zoosum.util.exception.NotExistTreeException;
import com.addShot.zoosum.util.exception.UserNotFoundException;
import com.addShot.zoosum.util.s3.S3Service;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserInfoServiceImpl implements UserInfoService {

	private final UserPlogInfoRepository userPlogInfoRepository;
	private final BadgeRepository badgeRepository;
	private final UserBadgeRepository userBadgeRepository;
	private final UserAnimalRepository userAnimalRepository;
	private final AnimalMotionRepository animalMotionRepository;
	private final UserItemRepository userItemRepository;
	private final ActivityRepository activityRepository;
	private final UserRepository userRepository;
	private final S3Service s3Service;

	@Autowired
	private ResourceLoader resourceLoader;

	@Override
	public MainResponse getUserMain(String userId) {

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		List<UserAnimal> userAnimals = userAnimalRepository.findAllSelectedByUserId(userId).get();
		List<SelectedAnimalResponse> animalResponses = new ArrayList<>();

		if (userAnimals.size() == 0) {
			throw new NotExistAnimalException(CustomErrorType.NOT_EXIST.getMessage());
		}

		for (UserAnimal ua : userAnimals) {
			Long animalId = ua.getAnimal().getAnimalId();
			List<AnimalMotion> animalMotions = animalMotionRepository.findByAnimalId(animalId).get();
			AnimalMotion randomMotion = RandomUtil.getRandomElement(animalMotions);

			SelectedAnimalResponse response = SelectedAnimalResponse.builder()
				.animalId(animalId)
				.fileUrl(randomMotion.getFileUrl())
				.build();

			animalResponses.add(response);
		}
		//섬에 나와있는 동물 리스트 조회

		UserItem islandItem = userItemRepository.findSelectedItem(userId, ItemType.ISLAND);

		if (islandItem == null) {
			throw new NotExistIslandException(CustomErrorType.NOT_EXIST.getMessage());
		}
		//섬 테마 조회

		UserItem treeItem = userItemRepository.findSelectedItem(userId, ItemType.TREE);
		//나무 조회

		if(treeItem == null) {
			throw new NotExistTreeException(CustomErrorType.NOT_EXIST.getMessage());
		}

		MainResponse response = MainResponse.builder()
			.islandUrl(islandItem.getItem().getFileUrl())
			.treeUrl(treeItem.getItem().getFileUrl())
			.animalList(animalResponses)
			.build();

		return response;
	}

	@Override
	public MainInfoResponse getUserInfoMain(String userId) {

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(userId)).get();
		List<ActivityHistory> all = activityRepository.findAll();
		List<ActivityHistory> userActivities = activityRepository.findByUserIdAndActivityType(
			userId, ActivityType.TREE);

		Mission mission = userPlogInfo.getMission();
		double kilometer = DistanceUtil.getKilometer(mission.getMissionLength());
		System.out.println(kilometer);

		MainInfoResponse response = MainInfoResponse.builder()
			.missionLength(kilometer)
			.missionTrash(mission.getMissionTrash())
			.seed(userPlogInfo.getSeed())
			.treeAllCount(all.size())
			.treeCount(userActivities.size())
			.egg(userPlogInfo.getEgg())
			.build();

		int missionTime = mission.getMissionTime();
		DivideTime divideTime = TimeUtil.getTime(missionTime);
		response.setHour(divideTime.getHour());
		response.setMinute(divideTime.getMinute());
		response.setSecond(divideTime.getSecond());

		return response;
	}

	@Override
	public PlogRecordResponse getPlogRecord(String nickname) {

		String userId = userRepository.findUserByNickname(nickname).getUserId();

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(userId)).get();
		double meter = userPlogInfo.getSumPloggingData().getSumLength();

		PlogRecordResponse response = PlogRecordResponse.builder()
			.plogCount(userPlogInfo.getPlogCount())
			.sumLength(DistanceUtil.getKilometer(meter))
			.sumTrash(userPlogInfo.getSumPloggingData().getSumTrash())
			.nickname(userPlogInfo.getUser().getNickname())
			.build();

		int missionTime = userPlogInfo.getSumPloggingData().getSumTime();
		DivideTime divideTime = TimeUtil.getTime(missionTime);
		response.setHour(divideTime.getHour());
		response.setMinute(divideTime.getMinute());
		response.setSecond(divideTime.getSecond());

		return response;
	}

	@Override
	public List<BadgeListItemResponse> getUserBadgeList(String nickname) {

		User user = userRepository.findUserByNickname(nickname);

		if(user == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		List<UserBadge> userBadges = userBadgeRepository.findBadgeByUserId(user);
		List<BadgeListItemResponse> response = new ArrayList<>();

		for (UserBadge ub : userBadges) {

			BadgeListItemResponse badgeListItemResponse = BadgeListItemResponse.builder()
				.badgeId(ub.getBadge().getBadgeId())
				.badgeName(ub.getBadge().getBadgeName())
				.fileUrl(ub.getBadge().getFileUrl())
				.isHave(ub.getBadgeGet())
				.badgeCondition(ub.getBadge().getBadgeCondition())
				.build();

			response.add(badgeListItemResponse);
		}
		return response;
	}

	@Transactional
	@Override
	public void insertTreeCampaignData(TreeCampaignRequest request, String userId) {

		if(userId == null) {
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		String userName = request.getUserName();
		String treeName = request.getTreeName();
		String userPhone = request.getUserPhone();
		String userBirth = request.getUserBirth();

		if(userName == null || treeName == null || userPhone == null || userBirth == null) { //작성 안한 항목이 있다면
			throw new NotEnoughInputException(CustomErrorType.UNSATISFIED_ALL_INPUT.getMessage());
		}

		//씨앗 갯수 차감
		User user = userRepository.findById(userId).get();
		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(user.getUserId())).get();

		if(userPlogInfo.getSeed() < 100) { //씨앗 갯수가 100개 미만이라면 예외 발생
			throw new NotEnoughSeedException(CustomErrorType.UNSATISFIED_SEED_COUNT.getMessage());
		}

		userPlogInfo.setSeed(userPlogInfo.getSeed()-100);
		userPlogInfoRepository.save(userPlogInfo);

		String fileUrl = "";
		//이미지 생성
		try {
			InputStream inputStream = UserInfoServiceImpl.class.getResourceAsStream("/certificate.png");
			BufferedImage image = ImageIO.read(inputStream);

			//이미지 위에 그릴 Graphics2D 객체 가져오기
			Graphics2D g2d = image.createGraphics();

			//폰트 파일을 로드합니다.
			Resource resource = resourceLoader.getResource("classpath:SKYBORI.ttf");
			InputStream fontStream = resource.getInputStream();
			Font customFont =  Font.createFont(Font.TRUETYPE_FONT, fontStream).deriveFont(55f);

			Resource resource2 = resourceLoader.getResource("classpath:SOYO Maple Bold.ttf");
			InputStream fontStream2 = resource2.getInputStream();
			Font customFont2 =  Font.createFont(Font.TRUETYPE_FONT, fontStream2).deriveFont(60f);

			//로드한 폰트를 시스템 폰트로 등록
			GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
			ge.registerFont(customFont);

			g2d.setFont(customFont);
			g2d.setColor(Color.BLACK);

			//받은 데이터로 텍스트 그리기
			//1) 이름
			g2d.drawString(userName, 650, 895); //위치 지정
			//2) 나무이름
			g2d.drawString(treeName, 650, 1045);
			//3) 전화번호
			String tmpPhone = "";
			tmpPhone = userPhone.replace(userPhone.substring(9, userPhone.length()), "****");
			g2d.drawString(tmpPhone, 650, 1200);
			//4) 생년월일
			g2d.drawString(userBirth, 650, 1375);

			//날짜용 폰트로 다시 지정
			g2d.setFont(customFont2);
			g2d.setColor(Color.BLACK);

			//5) 오늘날짜
			LocalDate today = LocalDate.now();
			int year = today.getYear();
			int month = today.getMonth().getValue();
			int day = today.getDayOfMonth();
			String todayDate = year + "년 "  + month + "월 " + day + "일";
			g2d.drawString(todayDate, 440, 1550);

			//Graphics2D 리소스 해제
			g2d.dispose();

			//s3에 업로드
			fileUrl = s3Service.uploadBufferedImageToAWS(image, "Activity/", userId);

		}
		catch (Exception e) {
			e.printStackTrace();
		}

		//나무 등록
		ActivityHistory activity = ActivityHistory.builder()
			.user(user)
			.tree(new Tree(treeName, userName, userPhone, userBirth))
			.activityType(ActivityType.TREE)
			.fileUrl(fileUrl)
			.time(new Time(LocalDateTime.now(), LocalDateTime.now()))
			.build();

		activityRepository.save(activity);
	}


}
