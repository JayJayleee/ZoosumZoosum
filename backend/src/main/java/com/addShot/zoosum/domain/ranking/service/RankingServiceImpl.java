package com.addShot.zoosum.domain.ranking.service;

import com.addShot.zoosum.domain.ranking.dto.response.RankingResponseDto;
import com.addShot.zoosum.domain.ranking.repository.RankingRepository;
import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.enums.Region;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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
    private Map<String, String> map = Stream.of(new String[][]{
        {"서울", "SEOUL"},
        {"대전", "DAEJEON"},
        {"세종", "SEJONG"},
        {"광주", "GWANGJU"},
        {"인천", "INCHEON"},
        {"대구", "DAEGU"},
        {"부산", "BUSAN"},
        {"울산", "ULSAN"},
        {"제주", "JEJU"},
        {"경기", "GYEONGGI"},
        {"강원", "KANGWON"},
        {"층청", "CHUNGCUNG"},
        {"전라", "JEONLA"},
        {"경상", "GYEONGSANG"}
    }).collect(Collectors.toMap(item -> item[0], item -> item[1]));

    @Override
    public Page<RankingResponseDto> ploggingRankingList(String region, Pageable pageable) {
        log.info("RankingService region: {}, pageable: {}", region, pageable);

        // 한글 지역을 영어로 변환
        if (region != null) {
            region = convertKoreanToEnglish(region);
            log.info("service convert region : {}", region);
        }

        // 영어 지역과 pageable 변수를 사용해 UserPlogInfo 조회. 이때 User 정보도 일단 다 가져온다.
        Page<UserPlogInfo> rankingPages = rankingRepository.selectAllUserPlogInfo(region, pageable);
        // Page 데이터 중, content 데이터만 따로 가져온다.
        List<UserPlogInfo> RankingList = rankingPages.getContent();
        // content의 데이터들을 Dto로 변환하여 저장할 새로운 List 생성
        List<RankingResponseDto> RankingResponseList = new ArrayList<>();

        log.info("RankingService rankingPages: {}", rankingPages);

        for (UserPlogInfo userPlogInfo : RankingList) {
            // UserPlogInfo에서 만들어 둔 Builder 메소드를 활용하여 빠르게 변환
            RankingResponseDto rankingResponseDto = userPlogInfo.toResponse();

            // Dto로 변환한 데이터를 리스트에 추가하기
            RankingResponseList.add(rankingResponseDto);
        }

        log.info("RankingService RankingResponseList : {}", RankingResponseList);

        // Page 데이터로 다시 변환하여 반환
        return new PageImpl<>(RankingResponseList, rankingPages.getPageable(), rankingPages.getTotalElements());
    }

    public String convertKoreanToEnglish(String korRegion) {
        return map.get(korRegion);
    }
}
