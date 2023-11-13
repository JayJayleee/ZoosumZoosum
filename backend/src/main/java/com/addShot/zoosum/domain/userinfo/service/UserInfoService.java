package com.addShot.zoosum.domain.userinfo.service;

import com.addShot.zoosum.domain.userinfo.dto.request.TreeCampaignRequest;
import com.addShot.zoosum.domain.userinfo.dto.response.BadgeListItemResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.MainInfoResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.MainResponse;
import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import java.util.List;

public interface UserInfoService {

	/**
	 * userinfo 1번 - 메인페이지 (동물, 섬, 나무)
	 * @param userId
	 * @return MainResponse
	 */
	MainResponse getUserMain(String userId);

	/**
	 * userinfo 2번 - 메인페이지 (미션 현황, 씨앗 수, 나무 수)
	 * @param userId
	 * @return
	 */
	MainInfoResponse getUserInfoMain(String userId);

	/**
	 * userinfo 3번 - 산책 기록 조회
	 * @param nickname
	 * @return PlogRecordResponse
	 */
	PlogRecordResponse getPlogRecord(String nickname);

	/**
	 * userinfo 4번 - 내 뱃지 조회 (전체 뱃지 조회 후, 가지고 있는 여부 반환)
	 * @param nickname
	 * @return List<BadgeListItemResponse>
	 */
	List<BadgeListItemResponse> getUserBadgeList(String nickname);

	/**
	 * userinfo 5번 - 나무 캠페인 참여 데이터 입력
	 * @param userId
	 */
	void insertTreeCampaignData(TreeCampaignRequest request, String userId);


}
