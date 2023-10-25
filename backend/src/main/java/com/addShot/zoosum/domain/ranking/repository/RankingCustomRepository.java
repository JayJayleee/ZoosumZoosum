package com.addShot.zoosum.domain.ranking.repository;

import com.addShot.zoosum.entity.UserPlogInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RankingCustomRepository {
    Page<UserPlogInfo> selectAllUserPlogInfo(Pageable pageable);
}
