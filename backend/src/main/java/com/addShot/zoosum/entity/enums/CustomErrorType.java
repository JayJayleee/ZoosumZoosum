package com.addShot.zoosum.entity.enums;

import com.addShot.zoosum.util.exception.UnsatisfiedUserLoginDataException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorType {
    USER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    BAD_REQUEST("잘못된 요청입니다."),
    TOKEN_IS_ALREADY_DELETED("유효하지 않은 토큰입니다."),
    UNSATISFIED_USER_LOGIN_DATA("유저 로그인 정보가 충분하지 않습니다. email, 소셜 타입을 확인하세요."),
    UNSATISFIED_SEED_COUNT("씨앗 갯수가 충분하지 않습니다."),
    UNSATISFIED_ALL_INPUT("모든 항목을 입력하지 않았습니다. 다시 입력해주세요."),
    NOT_EXIST("존재하지 않습니다."),
    EXCEED_REQUEST("요청 데이터의 개수가 초과되었습니다.");
    private final String message;
}
