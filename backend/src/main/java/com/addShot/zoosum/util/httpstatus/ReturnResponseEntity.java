package com.addShot.zoosum.util.httpstatus;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ReturnResponseEntity {

    /**
     * 200 응답을 반환하는 메소드
     * @return Ok
     */
    public static ResponseEntity<?> ok200() {
        return ResponseEntity.status(HttpStatus.OK).body("성공적으로 수행하였습니다.");
    }

    /**
     * 200 응답을 반환하는 메소드
     * @param obj 반환하고 싶은 객체
     * @return Ok
     */
    public static ResponseEntity<?> ok200(Object obj) {
        return ResponseEntity.status(HttpStatus.OK).body(obj);
    }

    /**
     * 400 에러를 반환하는 메소드
     * @return BAD_REQUEST
     */
    public static ResponseEntity<?> badRequest400() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청입니다.");
    }

    /**
     * 400 에러를 반환하는 메소드
     * @param message 반환하고 싶은 문장
     * @return BAD_REQUEST
     */
    public static ResponseEntity<?> badRequest400(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

    /**
     * 401 에러를 반환하는 메소드
     * @return UNAUTHORIZED
     */
    public static ResponseEntity<?> unauthorized401() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("접근 권한이 없습니다.");
    }

    /**
     * 401 에러를 반환하는 메소드
     * @param message 반환하고 싶은 문장
     * @return UNAUTHORIZED
     */
    public static ResponseEntity<?> unauthorized401(String message) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
    }

    /**
     * 500 에러를 반환하는 메소드
     * @return INTERNAL_SERVER_ERROR
     */
    public static ResponseEntity<?> serverError500() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버에서 에러가 발생했습니다. 서버 개발자에게 문의 바랍니다.");
    }

    /**
     * 500 에러를 반환하는 메소드
     * @param message 반환하고 싶은 문장
     * @return INTERNAL_SERVER_ERROR
     */
    public static ResponseEntity<?> serverError500(String message) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
    }


}
