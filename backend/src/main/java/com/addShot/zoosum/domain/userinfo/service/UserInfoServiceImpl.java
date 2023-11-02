package com.addShot.zoosum.domain.userinfo.service;

import com.addShot.zoosum.domain.activity.repository.ActivityRepository;
import com.addShot.zoosum.domain.animal.repository.AnimalMotionRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.domain.common.repository.BadgeRepository;
import com.addShot.zoosum.domain.common.repository.UserBadgeRepository;
import com.addShot.zoosum.domain.item.repository.ItemRepository;
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
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.Badge;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserAnimal;
import com.addShot.zoosum.entity.UserBadge;
import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.embedded.Mission;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.Tree;
import com.addShot.zoosum.entity.embedded.UserBadgeId;
import com.addShot.zoosum.entity.embedded.UserPlogInfoId;
import com.addShot.zoosum.entity.enums.ActivityType;
import com.addShot.zoosum.entity.enums.ItemType;
import com.addShot.zoosum.util.RandomUtil;
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
public class UserInfoServiceImpl implements UserInfoService {

	private final UserPlogInfoRepository userPlogInfoRepository;
	private final BadgeRepository badgeRepository;
	private final UserBadgeRepository userBadgeRepository;
	private final UserAnimalRepository userAnimalRepository;
	private final AnimalMotionRepository animalMotionRepository;
	private final UserItemRepository userItemRepository;
	private final ActivityRepository activityRepository;
	private final UserRepository userRepository;

	@Override
	public MainResponse getUserMain(String userId) {
		List<UserAnimal> userAnimals = userAnimalRepository.findAllSelectedByUserId(userId).get();
		List<SelectedAnimalResponse> animalResponses = new ArrayList<>();

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
		//섬 테마 조회

		UserItem treeItem = userItemRepository.findSelectedItem(userId, ItemType.TREE);
		//나무 조회

		MainResponse response = MainResponse.builder()
			.userId(userId)
			.islandUrl(islandItem.getItem().getFileUrl())
			.treeUrl(treeItem.getItem().getFileUrl())
			.animalList(animalResponses)
			.build();

		return response;
	}

	@Override
	public MainInfoResponse getUserInfoMain(String userId) {
		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(userId)).get();
		List<ActivityHistory> all = activityRepository.findAll();
		List<ActivityHistory> userActivities = activityRepository.findByUserIdAndActivityType(
			userId, ActivityType.TREE);

		Mission mission = userPlogInfo.getMission();
		MainInfoResponse response = MainInfoResponse.builder()
			.missionLength(mission.getMissionLength())
			.missionTime(mission.getMissionTime())
			.missionTrash(mission.getMissionTrash())
			.seed(userPlogInfo.getSeed())
			.treeAllCount(all.size())
			.treeCount(userActivities.size())
			.build();

		return response;
	}

	@Override
	public PlogRecordResponse getPlogRecord(String userId) {
		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(userId)).get();

		PlogRecordResponse response = PlogRecordResponse.builder()
			.plogCount(userPlogInfo.getPlogCount())
			.sumLength(userPlogInfo.getSumPloggingData().getSumLength())
			.sumTime(userPlogInfo.getSumPloggingData().getSumTime())
			.sumTrash(userPlogInfo.getSumPloggingData().getSumTrash())
			.build();

		return response;
	}

	@Override
	public List<BadgeListItemResponse> getUserBadgeList(String userId) {
		List<Badge> all = badgeRepository.findAll();
		List<BadgeListItemResponse> response = new ArrayList<>();

		for (Badge b : all) {
			UserBadgeId id = new UserBadgeId(userId, b.getBadgeId());
			Optional<UserBadge> badge = userBadgeRepository.findById(id);
			boolean isHave = false;
			if (badge.isPresent()) { //사용자에게 존재하는 뱃지라면
				isHave = true;
			}

			BadgeListItemResponse badgeListItemResponse = BadgeListItemResponse.builder()
				.badgeId(b.getBadgeId())
				.badgeName(b.getBadgeName())
				.fileUrl(b.getFileUrl())
				.isHave(isHave)
				.build();

			response.add(badgeListItemResponse);
		}
		return response;
	}

	@Transactional
	@Override
	public void insertTreeCampaignData(TreeCampaignRequest request, String userId) {
		String treeName = request.getTreeName();
		String userName = request.getUserName();
		String userPhone = request.getUserPhone();
		String userEmail = request.getUserEmail();

		//씨앗 갯수 차감
		User user = userRepository.findById(userId).get();
		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(user.getUserId())).get();
		userPlogInfo.setSeed(userPlogInfo.getSeed()-100);
		userPlogInfoRepository.save(userPlogInfo);

		//나무 등록
		ActivityHistory activity = ActivityHistory.builder()
			.user(user)
			.tree(new Tree(treeName, userName, userPhone, userEmail))
			.activityType(ActivityType.TREE)
			.fileUrl("추가 예정")
			.time(new Time(LocalDateTime.now(), LocalDateTime.now()))
			.build();

		activityRepository.save(activity);
	}


}
