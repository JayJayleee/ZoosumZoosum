package com.addShot.zoosum.domain.ranking.repository;

import static com.addShot.zoosum.entity.QUserPlogInfo.userPlogInfo;

import com.addShot.zoosum.entity.UserPlogInfo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class RankingCustomRepositoryImpl implements RankingCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public RankingCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<UserPlogInfo> selectAllUserPlogInfo(Pageable pageable) {
        List<UserPlogInfo> userPlogInfos = jpaQueryFactory.selectFrom(userPlogInfo).fetch();
        return new PageImpl<>(userPlogInfos);
    }
}
