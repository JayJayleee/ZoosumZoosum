package com.addShot.zoosum.domain.activity.repository;

import com.addShot.zoosum.domain.activity.dto.request.ActivityRequestDto;
import com.addShot.zoosum.entity.ActivityHistory;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ActivityCustomRepository {

    /**
     * 사용자가 활동한 플로깅 내역과 인증서 목록을 조회한다.
     * @param nickname 사용자 닉네임
     * @param activityType 활동 유형
     * @param pageable 페이지네이션 정보
     * @return
     */
    Page<ActivityHistory> findAllByUserNickname(String nickname, String activityType, Pageable pageable);

    /**
     * activityId를 통해 활동 내역을 조회한다.
     * @param activityId 활동 ID
     * @return 활동내역 상세
     */
    Optional<ActivityHistory> findByActivityId(Long activityId);
}
