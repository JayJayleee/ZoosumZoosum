package com.addShot.zoosum.domain.ranking;

import com.addShot.zoosum.domain.ranking.dto.response.RankingResponseDto;
import com.addShot.zoosum.domain.ranking.service.RankingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

    /**
     * Query Parameter를 통해 넘어온 데이터를 통해, 사용자들의 플로깅 랭킹을 보여준다.
     *
     * @param region 지역 데이터 (한글)
     * @param pageable 정렬과 페이징의 기준
     * @return 랭킹 목록을 보여준다. Page 형태
     */
    @Operation(summary = "플로깅 랭킹 리스트", description = "일반 랭킹 조회 : ?sort=score,desc&size=50, "
        + "지역 랭킹 조회 : ?region=울산&sort=score,desc&size=")
    @GetMapping
    public ResponseEntity<Page<RankingResponseDto>> ploggingRankingList(
        @RequestParam(name = "region", required = false) String region, Pageable pageable) {
        // 지역 데이터, page 조건 확인
        log.info("controller region : {}, pageable : {}", region, pageable);

        // 페이지 정보를 넘겨주지 않으면, 400 Error 반환
        if (pageable == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // pageable 내부의 값을 확인
        pageable.getSort().get().forEach(sort -> {
            log.info("sort.getProperty() = {}", sort.getProperty());
            log.info("sort.getDirection() = {}", sort.getDirection());
        });
        
        // service 호출, Page 형식으로 데이터 반환
        Page<RankingResponseDto> rankingResponseDto = rankingService.ploggingRankingList(region, pageable);

        // 데이터가 저장되어 있지 않으면, 500 Error 반환
        if (rankingResponseDto == null || rankingResponseDto.isEmpty() == true) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(rankingResponseDto);
    }
}
