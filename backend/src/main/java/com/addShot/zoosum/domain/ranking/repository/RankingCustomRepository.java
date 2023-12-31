package com.addShot.zoosum.domain.ranking.repository;

import com.addShot.zoosum.entity.User;
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

    /**
     * 내가 있는 지역에서의 내 랭크 조회
     * @param user 사용자 Entity
     * @return 지역 중 사용자 랭크
     */
    Integer findMyLocalRank(User user);

    /**
     * 사용자 전체 중에 내 랭크 조회
     * @param user 사용자 Entity
     * @return 전체 중 사용자 랭크
     */
    Integer findMyAllRank(User user);
}
