package com.addShot.zoosum.domain.userinfo.service;

import com.addShot.zoosum.domain.userinfo.dto.response.BadgeListItemResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import java.util.List;

public interface UserInfoService {

	/**
	 * userinfo 3번 - 나의 산책 기록 조회
	 * @param userId
	 * @return PlogRecordResponse
	 */
	PlogRecordResponse getPlogRecord(String userId);

	/**
	 * userinfo 4번 - 내 뱃지 조회 (전체 뱃지 조회 후, 가지고 있는 여부 반환)
	 * @param userId
	 * @return List<BadgeListItemResponse>
	 */
	List<BadgeListItemResponse> getUserBadgeList(String userId);

}
