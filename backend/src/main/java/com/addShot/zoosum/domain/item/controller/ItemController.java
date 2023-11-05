package com.addShot.zoosum.domain.item.controller;

import com.addShot.zoosum.domain.item.dto.request.ItemRequestDto;
import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.domain.item.service.ItemService;
import com.addShot.zoosum.entity.enums.ItemType;
import com.addShot.zoosum.util.Response;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[ITEM]", description = "아이템 정보 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@OpenAPIDefinition(
    servers = {
        @Server(url = "/api", description = "Default Server URL")
    }
)
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;

    @Operation(summary = "사용자 보유 아이템 목록",
        description = "사용자가 현재 획득한 아이템들의 목록을 반환합니다.")
    @GetMapping() // GET은 HTTP Body가 없기 때문에, URI에 파라미터를 넣는다.
    public ResponseEntity<?> userItemList(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
        @RequestParam(name = "itemType") String itemType) {
        String userId = headerUtils.getUserId(authorizationHeader);
        String message = "";

        log.info("ItemController userId, itemType : {}, {}", userId, itemType);
        if (userId == null || itemType == null) {
            message = "잘못된 요청입니다.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

        // userId와 JWT의 userId가 일치하는지 인가 여부 확인해야 한다. 403 반환
        // 1. Header 사용하는 방법, 2. JWT payload와 userId를 비교하는 방법

        // 목록 반환
        List<ItemResponseDto> itemList = itemService.itemList(userId, itemType);
        if (itemList == null) {
            message = "서버에서 문제가 발생하였습니다. 서버 담당자에게 문의 바랍니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Response(itemList));
    }

    @Operation(summary = "사용자 아이템 변경",
        description = "사용자가 현재 획득한 아이템 중, 섬이나 나무를 선택하여 변경합니다.")
    @PutMapping() // 위와 같은 형식을 사용하되, itemId는 Body에 넣는다.
    public ResponseEntity<?> userItemUpdate(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
        @RequestParam(name = "itemType") String itemType,
        @RequestBody ItemRequestDto item) {
        String userId = headerUtils.getUserId(authorizationHeader);
        String message = "";

        log.info("ItemController userId, itemType, itemId : {}, {}, {}", userId, itemType, item.getItemId());
        if (userId == null || itemType == null || item == null || item.getItemId() == null) {
            message = "잘못된 요청입니다.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

        // userId와 JWT의 userId가 일치하는지 인가 여부 확인해야 한다. 403 반환
        // 1. Header 사용하는 방법, 2. JWT payload와 userId를 비교하는 방법

        // 아이템 선택 반영
        Long result = itemService.itemUpdate(userId, ItemType.valueOf(itemType), item.getItemId());
        if (result == null || result == 0L) { // 데이터 수정이 안 되었을 때
            message = "서버에서 문제가 발생하였습니다. 서버 담당자에게 문의 바랍니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }

        message = "설정 완료되었습니다."; // 데이터 수정이 잘 되었을 때
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }
}
