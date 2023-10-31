package com.addShot.zoosum.domain.activity.service;

import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ActivityService {

    /**
     * 사용자가 활동한 플로깅 내역과 인증서 목록 조회
     * TREE 테이블과 PLOGGING 테이블을 활용한다.
     * @param userId 사용자 ID
     * @param pageable 페이징 정보, 몇번째 페이지인지, 얼만큼 조회할 것인지
     * @return List<ActivityResponseDto>
     */
    Page<ActivityResponseDto> activityList(String userId, Pageable pageable);

    /**
     * 인증서 상세 조회
     * @param activityId 활동 ID
     * @return ActivityResponseDto
     */
    ActivityResponseDto certificateDetail(Long activityId);
}
