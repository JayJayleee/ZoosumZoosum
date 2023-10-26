package com.addShot.zoosum.domain.ranking.repository;

import com.addShot.zoosum.entity.UserPlogInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RankingCustomRepository {

    /**
     * pageable의 sort, size 조건을 기준으로 데이터를 조회하여 목록을 Page 형태로 반환해준다.
     *
     * @param pageable sort, size 정보가 저장되어 있다.
     * @return 랭킹 정보들을 Page 형태로 반환한다.
     */
    Page<UserPlogInfo> selectAllUserPlogInfo(String region, Pageable pageable);
}
