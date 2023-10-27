package com.addShot.zoosum.domain.item.controller;

import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.domain.item.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[ITEM]", description = "아이템 정보 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;

    @Operation(summary = "사용자 보유 아이템 목록", description = "사용자가 현재 획득한 아이템들의 목록을 반환합니다.")
    @GetMapping("/{userId}")
    public ResponseEntity<?> userItemList(@PathVariable(name = "userId") String userId, @RequestParam(name = "itemType") String itemType) {
        log.info("ItemController userId, itemType : {}, {}", userId, itemType);
        if (userId == null || itemType == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("잘못된 요청입니다.");
        }

        // userId와 JWT의 userId가 일치하는지 인가 여부 확인해야 한다. 403 반환
        // 1. Header 사용하는 방법, 2. JWT payload와 userId를 비교하는 방법

        // 목록 반환
        List<ItemResponseDto> itemList = itemService.itemList(userId, itemType);
        if (itemList == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("서버에서 문제가 발생하였습니다. 서버 담당자에게 문의 바랍니다."); 
        }

        return ResponseEntity.status(HttpStatus.OK).body(itemList);
    }

    // webhook test 6

}
