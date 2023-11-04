package com.addShot.zoosum.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorType {
    USER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    BAD_REQUEST("잘못된 요청입니다."),
    TOKEN_IS_ALREADY_DELETED("유효하지 않은 토큰입니다.");
    private final String message;
}
