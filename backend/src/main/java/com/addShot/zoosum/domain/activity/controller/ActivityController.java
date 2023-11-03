package com.addShot.zoosum.domain.activity.controller;

import static com.addShot.zoosum.util.httpstatus.ReturnResponseEntity.*;

import com.addShot.zoosum.domain.activity.dto.request.ActivityRequestDto;
import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDto;
import com.addShot.zoosum.domain.activity.dto.response.ActivityRewardResponseDto;
import com.addShot.zoosum.domain.activity.service.ActivityService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "[ACTIVITY]", description = "플로깅, 나무심기 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@OpenAPIDefinition(
    servers = {
        @Server(url = "/", description = "Default Server URL")
    }
)
@RequestMapping("/activity")
public class ActivityController {

    private final ActivityService activityServicel;

    @Operation(summary = "활동내역(플로깅, 인증서) 목록 조회",
        description = "사용자가 활동한 플로깅 내역과 인증서를 한 화면에서 목록 조회")
    @GetMapping("/{userId}")
    public ResponseEntity<?> activityList(@PathVariable(name = "userId") String userId,
        Pageable pageable) {
        log.info("ActivityController userId : {}", userId);
        // PageNumber: PageSize를 기준으로 잘랐을 때 몇 번째 페이지인지
        // PageSize: 페이지를 나누는 기준이 되는 수
        // Offset: 어디서 시작할 것인지. 시작지점
        log.info("ActivityController PageNumber : {}, PageSize : {}, Offset : {}",
            pageable.getPageNumber(), pageable.getPageSize(), pageable.getOffset());

        if (userId == null || pageable == null) {
            return badRequest400();
        }

        // 다른 사람의 활동 기록도 볼 수 있으므로, 추가적인 인가처리를 하지 않는다.
        
        // 목록 조회
        Page<ActivityResponseDto> list = activityServicel.activityList(userId, pageable);
        if (list == null) {
            return serverError500();
        }
        return ok200(list);
    }

    @Operation(summary = "나무 인증서 상세 조회",
        description = "사용자가 활동한 인증서의 상세 내용을 조회")
    @GetMapping("/detail/{activityId}")
    public ResponseEntity<?> certificateDetail(@PathVariable(name = "activityId") Long activityId) {
        log.info("ActivityController activityId : {}", activityId);
        if (activityId == null) {
            return badRequest400();
        }

        // 마찬가지로, 다른 사람의 활동 기록을 볼 수 있기에, 추가적인 인가처리를 하지 않는다.

        // 상세 조회
        ActivityResponseDto certificateDetail = activityServicel.certificateDetail(activityId);
        if (certificateDetail == null) {
            return serverError500("나무심기만 상세보기가 가능합니다.");
        }
        return ok200(certificateDetail);
    }

    @Operation(summary = "플로깅 기록과 리워드 반환",
        description = "플로깅 정보를 입력하는 동시에, 리워드를 제공")
    @PostMapping("/{userId}")
    public ResponseEntity<?> writeActivity(@PathVariable(name = "userId") String userId,
        @RequestPart(name = "activityImg") MultipartFile activityImg,
        @RequestPart(name = "activityRequestDto") ActivityRequestDto activityRequestDto){
        if (userId == null || activityRequestDto == null || activityImg == null) {
            return badRequest400();
        }
        log.info("ActivityController userId : {}, activityImg : {}", userId, activityImg);

        // 입력
        ActivityRewardResponseDto responseDto = activityServicel.writeActivityAndReward(userId, activityImg, activityRequestDto);
        if (responseDto == null) {
            return serverError500("입력에 실패했습니다.");
        }
        return ok200(responseDto);
    }

}
