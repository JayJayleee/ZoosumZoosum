package com.addShot.zoosum.domain.ranking.repository;

import static com.addShot.zoosum.entity.QUser.user;
import static com.addShot.zoosum.entity.QUserPlogInfo.userPlogInfo;

import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.enums.Region;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Slf4j
public class RankingCustomRepositoryImpl implements RankingCustomRepository {

    private final JPAQueryFactory queryFactory;

    public RankingCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<UserPlogInfo> selectAllUserPlogInfo(String region, Pageable pageable) {

        BooleanBuilder builder = new BooleanBuilder();

        // 삭제되지 않은 데이터만 조회한다.
        builder.and(userPlogInfo.time.deleteTime.isNull())
            .and(userPlogInfo.user.userId.eq(user.userId))
            .and(user.nickname.isNotNull())
            .and(user.region.isNotNull())
            .and(userPlogInfo.score.ne(0));

        if (region != null) {
            builder.and(userPlogInfo.user.region.eq(Region.valueOf(region)));
        }

        List<UserPlogInfo> results = queryFactory
            .selectFrom(userPlogInfo)
            .join(userPlogInfo.user, user).fetchJoin()
            .where(builder)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(getOrderSpecifiers(pageable).toArray(new OrderSpecifier[0]))
            .fetch();

        log.info("Ranking Repository results : {}", results);
        long total = results.size();
        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Integer findMyLocalRank(User user) {
        List<UserPlogInfo> localRanking = queryFactory
            .selectFrom(userPlogInfo)
            .where(userPlogInfo.user.region.eq(user.getRegion()))
            .orderBy(userPlogInfo.score.desc())
            .fetch();

        UserPlogInfo userInfo = queryFactory
            .selectFrom(userPlogInfo)
            .where(userPlogInfo.user.eq(user))
            .fetchOne();

        int index = localRanking.indexOf(userInfo) + 1;
        return index;
    }

    @Override
    public Integer findMyAllRank(User user) {
        List<UserPlogInfo> allRanking = queryFactory
            .selectFrom(userPlogInfo)
            .orderBy(userPlogInfo.score.desc())
            .fetch();

        UserPlogInfo userInfo = queryFactory
            .selectFrom(userPlogInfo)
            .where(userPlogInfo.user.eq(user))
            .fetchOne();

        int index = allRanking.indexOf(userInfo) + 1;
        return index;
    }

    private List<OrderSpecifier<?>> getOrderSpecifiers(Pageable pageable) {
        List<OrderSpecifier<?>> specifiers = new ArrayList<>();

        if (pageable != null && pageable.getSort().isSorted()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "score":
                        specifiers.add(new OrderSpecifier<>(direction, userPlogInfo.score));
                        break;
                    case "plogCount":
                        specifiers.add(new OrderSpecifier<>(direction, userPlogInfo.plogCount));
                        break;
                    case "sumLength":
                        specifiers.add(new OrderSpecifier<>(direction, userPlogInfo.sumPloggingData.sumLength));
                        break;
                    case "sumTime":
                        specifiers.add(new OrderSpecifier<>(direction, userPlogInfo.sumPloggingData.sumTime));
                        break;
                    case "sumTrash":
                        specifiers.add(new OrderSpecifier<>(direction, userPlogInfo.sumPloggingData.sumTrash));
                        break;
                    // 추가적인 필드에 대한 정렬 조건을 여기에 추가
                }
            }
        }
        // 항상 마지막에 'no'를 기준으로 내림차순 정렬 조건을 추가
        specifiers.add(new OrderSpecifier<>(Order.ASC, userPlogInfo.user.nickname));
        return specifiers;
    }

}
