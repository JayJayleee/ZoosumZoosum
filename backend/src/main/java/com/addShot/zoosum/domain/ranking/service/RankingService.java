package com.addShot.zoosum.domain.ranking.service;

import com.addShot.zoosum.domain.ranking.dto.response.RankingResponseDto;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

public interface RankingService {

    /**
     * pageable 입력에 따라 플로깅 랭킹을 보여준다.
     *
     * @param region 지역 랭킹을 조회하기 위한 지역 데이터
     * @param pageable 정렬의 기준이 되는 column, 오름차순과 내림차순 여부, 데이터의 개수가 들어있는 객체
     * @return 조건에 맞는 플로깅 랭킹 반환
     */
    List<RankingResponseDto> ploggingRankingList(String region, Pageable pageable);
}
