package com.addShot.zoosum.domain.activity.controller;

import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDto;
import com.addShot.zoosum.domain.activity.service.ActivityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[ACTIVITY]", description = "플로깅, 나무심기 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/activity")
public class ActivityController {

    private final ActivityService activityServicel;

    @Operation(summary = "활동내역(플로깅, 인증서) 목록 조회",
        description = "사용자가 활동한 플로깅 내역과 인증서를 한 화면에서 목록으로 보여준다.")
    @GetMapping("/{userId}")
    public ResponseEntity<?> activityList(@PathVariable(name = "userId") String userId,
        Pageable pageable) {
        String message = "";

        log.info("ActivityController userId : {}", userId);
        // PageNumber: PageSize를 기준으로 잘랐을 때 몇 번째 페이지인지
        // PageSize: 페이지를 나누는 기준이 되는 수
        // Offset: 어디서 시작할 것인지. 시작지점
        log.info("ActivityController PageNumber : {}, PageSize : {}, Offset : {}",
            pageable.getPageNumber(), pageable.getPageSize(), pageable.getOffset());

        if (userId == null || pageable == null) {
            message = "잘못된 요청입니다.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

        // 다른 사람의 활동 기록도 볼 수 있으므로, 추가적인 인가처리를 하지 않는다.
        
        // 목록 조회
        Page<ActivityResponseDto> list = activityServicel.activityList(userId, pageable);
        if (list == null) {
            message = "서버에서 에러가 발생했습니다. 서버 개발자에게 문의 바랍니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @Operation(summary = "나무 인증서 상세 조회", description = "사용자가 활동한 인증서의 상세 내용을 조회")
    @GetMapping("/detail/{activityId}")
    public ResponseEntity<?> certificateDetail(@PathVariable(name = "activityId") Long activityId) {
        String message = "";

        log.info("ActivityController activityId : {}", activityId);
        if (activityId == null) {
            message = "잘못된 요청입니다.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

        // 마찬가지로, 다른 사람의 활동 기록을 볼 수 있기에, 추가적인 인가처리를 하지 않는다.

        // 상세 조회
        ActivityResponseDto certificateDetail = activityServicel.certificateDetail(activityId);
        if (certificateDetail == null) {
            message = "나무심기만 상세보기가 가능합니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
        return ResponseEntity.status(HttpStatus.OK).body(certificateDetail);
    }
}
