package com.addShot.zoosum.domain.ranking;

import com.addShot.zoosum.domain.ranking.dto.response.RankingResponseDto;
import com.addShot.zoosum.domain.ranking.service.RankingService;
import com.addShot.zoosum.entity.enums.Region;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[RANKING] API", description = "사용자들의 점수와 닉네임을 기준으로 순위를 정렬해서 보여줍니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("ranking")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    public ResponseEntity<Page<RankingResponseDto>> ploggingRankingList(
        @RequestParam(name = "region", required = false) String region
        , Pageable pageable) {
        // 매개변수가 제대로 넘어왔는지 확인 - 지역 데이터, page 조건
        log.info("controller region : {}, pageable : {}", region, pageable);

        // pageable 내부의 값을 확인
        pageable.getSort().get().forEach(sort -> {
            log.info("sort.getProperty() = {}", sort.getProperty());
            log.info("sort.getDirection() = {}", sort.getDirection());
        });
        
        // service 호출, Page 형식으로 데이터 반환
        Page<RankingResponseDto> rankingResponseDto = rankingService.ploggingRankingList(region, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(rankingResponseDto);

    }
}
