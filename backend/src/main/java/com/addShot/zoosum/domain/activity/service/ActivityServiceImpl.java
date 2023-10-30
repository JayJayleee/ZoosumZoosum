package com.addShot.zoosum.domain.activity.service;

import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDto;
import com.addShot.zoosum.domain.activity.repository.ActivityRepository;
import com.addShot.zoosum.entity.ActivityHistory;
import com.addShot.zoosum.entity.enums.ActivityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;

    @Override
    public Page<ActivityResponseDto> activityList(String userId, Pageable pageable) {

        Page<ActivityHistory> activityHistoryList = activityRepository.findAllByUserId(userId, pageable);
        List<ActivityHistory> getList = activityHistoryList.getContent();
        List<ActivityResponseDto> resultList = new ArrayList<>();

        for(ActivityHistory ah : getList) {
            ActivityResponseDto dto = null;
            if (ah.getActivityType().equals(ActivityType.TREE)) {
                dto = ah.toTreeResponse(ah);
            } else {
                dto = ah.toPloggingResponse(ah);
            }
            resultList.add(dto);
        }
        log.info("resultList : {}", resultList);

        return new PageImpl<>(resultList, activityHistoryList.getPageable(), activityHistoryList.getTotalElements());
    }

    @Override
    public ActivityResponseDto certificateDetail(Long activityId) {
        Optional<ActivityHistory> activityHistory = activityRepository.findByActivityId(activityId);
        ActivityResponseDto dto = null;
        if (activityHistory.isPresent()) {
            ActivityHistory ah = activityHistory.get();
            if (ah.getActivityType().equals(ActivityType.TREE)) {
                dto = ah.toTreeResponse(ah);
            }
        }
        return dto;
    }
}
