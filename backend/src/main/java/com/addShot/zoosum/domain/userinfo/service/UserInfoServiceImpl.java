package com.addShot.zoosum.domain.userinfo.service;

import com.addShot.zoosum.domain.userinfo.dto.response.PlogRecordResponse;
import com.addShot.zoosum.domain.userinfo.repository.UserPlogInfoRepository;
import com.addShot.zoosum.entity.UserPlogInfo;
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

}
