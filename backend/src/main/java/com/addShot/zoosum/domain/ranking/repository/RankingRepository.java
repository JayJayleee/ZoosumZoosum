package com.addShot.zoosum.domain.ranking.repository;

import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.embedded.UserPlogInfoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepository extends JpaRepository<UserPlogInfo, UserPlogInfoId>, RankingCustomRepository {

}
