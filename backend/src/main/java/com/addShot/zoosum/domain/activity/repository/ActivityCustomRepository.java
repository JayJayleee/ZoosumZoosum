package com.addShot.zoosum.domain.activity.repository;

import com.addShot.zoosum.entity.ActivityHistory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ActivityCustomRepository {

    /**
     * 사용자가 활동한 플로깅 내역과 인증서 목록을 조회한다.
     * @param userId 사용자 ID
     * @param pageable 페이지네이션 정보
     * @return
     */
    Page<ActivityHistory> findAllByUserId(String userId, Pageable pageable);
}
