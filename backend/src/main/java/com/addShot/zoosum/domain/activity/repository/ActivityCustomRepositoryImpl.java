package com.addShot.zoosum.domain.activity.repository;

import static com.addShot.zoosum.entity.QActivityHistory.activityHistory;

import com.addShot.zoosum.entity.ActivityHistory;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class ActivityCustomRepositoryImpl implements ActivityCustomRepository {

    private final JPAQueryFactory queryFactory;

    public ActivityCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<ActivityHistory> findAllByUserId(String userId, Pageable pageable) {
        QueryResults<ActivityHistory> result = queryFactory.selectFrom(activityHistory)
            .where(activityHistory.user.userId.eq(userId))
            .orderBy(activityHistory.activityId.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetchResults();

        List<ActivityHistory> list = result.getResults();
        long total = result.getTotal();

        return new PageImpl<>(list, pageable, total);
    }
}
