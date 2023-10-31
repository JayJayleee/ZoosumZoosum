package com.addShot.zoosum.domain.activity.repository;

import com.addShot.zoosum.entity.ActivityHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<ActivityHistory, Long>, ActivityCustomRepository {

}
