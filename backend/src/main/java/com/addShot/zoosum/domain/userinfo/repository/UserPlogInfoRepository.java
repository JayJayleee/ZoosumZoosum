package com.addShot.zoosum.domain.userinfo.repository;

import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.embedded.UserPlogInfoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPlogInfoRepository extends JpaRepository<UserPlogInfo, UserPlogInfoId> {

}
