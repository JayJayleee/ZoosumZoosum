package com.addShot.zoosum.domain.userinfo.service;

import com.addShot.zoosum.domain.common.repository.BadgeRepository;
import com.addShot.zoosum.domain.common.repository.UserBadgeRepository;
import com.addShot.zoosum.domain.userinfo.dto.response.BadgeListItemResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import com.addShot.zoosum.domain.userinfo.repository.UserPlogInfoRepository;
import com.addShot.zoosum.entity.Badge;
import com.addShot.zoosum.entity.UserBadge;
import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.embedded.UserBadgeId;
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

	@Override
	public PlogRecordResponse getPlogRecord(String userId) {
		UserPlogInfo userPlogInfo = userPlogInfoRepository.findById(userId).get();

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
				.userId(userId)
				.badgeName(b.getBadgeName())
				.fileUrl(b.getFileUrl())
				.isHave(isHave)
				.build();

			response.add(badgeListItemResponse);
		}
		return response;
	}
}
