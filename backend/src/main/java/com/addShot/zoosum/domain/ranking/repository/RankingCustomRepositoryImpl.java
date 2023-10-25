package com.addShot.zoosum.domain.ranking.repository;

import static com.addShot.zoosum.entity.QUser.user;
import static com.addShot.zoosum.entity.QUserPlogInfo.userPlogInfo;

import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.enums.Region;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@Slf4j
public class RankingCustomRepositoryImpl implements RankingCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public RankingCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<UserPlogInfo> selectAllUserPlogInfo(String region, Pageable pageable) {

        BooleanBuilder builder = new BooleanBuilder();

        // 삭제되지 않은 데이터만 조회한다.
        builder.and(userPlogInfo.time.deleteTime.isNull());
        builder.and(userPlogInfo.user.userId.eq(user.userId));

        if (region != null) {
            builder.and(userPlogInfo.user.region.eq(Region.valueOf(region)));
        }

        QueryResults<UserPlogInfo> usedProductQueryResults = jpaQueryFactory
            .selectFrom(userPlogInfo)
            .join(userPlogInfo.user, user).fetchJoin()
            .where(builder)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(userPlogInfo.score.desc(), user.nickname.asc())
            .fetchResults();

        List<UserPlogInfo> results = usedProductQueryResults.getResults();

        log.info("Ranking Repository results : {}", results);

        long total = usedProductQueryResults.getTotal();

        return new PageImpl<>(results, pageable, total);

    }
}
