package com.addShot.zoosum.domain.ranking.service;

import com.addShot.zoosum.domain.ranking.dto.response.RankingResponseDto;
import com.addShot.zoosum.domain.ranking.repository.RankingRepository;
import com.addShot.zoosum.entity.UserPlogInfo;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankingServiceImpl implements RankingService {

    private final RankingRepository rankingRepository;

    @Override
    public Page<RankingResponseDto> ploggingRankingList(Pageable pageable) {
        log.info("RankingService pageable: {}", pageable);

        Page<UserPlogInfo> rankingPages = rankingRepository.selectAllUserPlogInfo(pageable);
        List<UserPlogInfo> RankingList = rankingPages.getContent();

        log.info("RankingService rankingPages: {}", rankingPages);

        List<RankingResponseDto> RankingResponseList = new ArrayList<>();

        for (UserPlogInfo userPlogInfo : RankingList) {
            RankingResponseDto rankingResponse = userPlogInfo.toResponse();

            //리스트에 저장하기
            RankingResponseList.add(rankingResponse);
        }

        log.info("RankingService RankingResponseList : {}", RankingResponseList);

        return new PageImpl<>(RankingResponseList, rankingPages.getPageable(), rankingPages.getTotalElements());
    }
}
