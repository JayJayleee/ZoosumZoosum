package com.addShot.zoosum.domain.activity.repository;

import com.addShot.zoosum.entity.ActivityHistory;
import com.addShot.zoosum.entity.enums.ActivityType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityRepository extends JpaRepository<ActivityHistory, Long>, ActivityCustomRepository {

	@Query("select ah from ActivityHistory ah where ah.user.userId =:userId and ah.activityType =:activityType")
	List<ActivityHistory> findByUserIdAndActivityType(@Param("userId") String userId, @Param("activityType") ActivityType activityType);

}
