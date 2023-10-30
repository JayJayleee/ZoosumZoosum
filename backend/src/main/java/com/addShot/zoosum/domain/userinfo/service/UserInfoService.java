package com.addShot.zoosum.domain.userinfo.service;

import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;

public interface UserInfoService {

	/**
	 * userinfo 3번 - 나의 산책 기록 조회
	 * @param userId
	 * @return PlogRecordResponse
	 */
	PlogRecordResponse getPlogRecord(String userId);

}
