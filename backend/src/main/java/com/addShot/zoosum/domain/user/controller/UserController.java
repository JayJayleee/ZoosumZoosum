package com.addShot.zoosum.domain.user.controller;

import com.addShot.zoosum.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[USER]", description = "USER 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Operation(summary = "로그인 기능", description = "줘야 하는 값 : UserLoginDTO, 프론트로 넘겨주는 값 : Access-Token, Refresh-Token(Cookie) \n" +
        "    LOGIN_HAVE_NO_ACCOUT(-1101, \"일치하는 계정이 없습니다.\"),\n" +
        "    LOGIN_GET_TOKEN_ERROR(-1102, \"토큰 발급 과정에서 문제가 발생했습니다.\"),\n" +
        "    LOGIN_SAVE_TOKEN_ERROR(-1103, \"토큰을 Redis로 저장하는 과정에서 문제가 발생했습니다.\"),\n" +
        "    LOGIN_IS_OK(1100, \"해당 계정이 존재합니다. (로그인 가능)\"),\n" +
        "    LOGIN_ACCOUT_IS_REMOVED(1101, \"탈퇴한 회원입니다. (로그인 불가)\"),\n" +
        "\n" +
        "네 가지 경우의 결과가 나옵니다. 200OK 받으면 성공적으로 로그아웃 된 것.\n")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(HttpServletResponse response) {
        return userService.loginUser(response);
    }

    @Operation(summary = "로그아웃 기능", description = "로그아웃 시 Header에 `Access-Token`을 주어야 합니다. HttpHeaders.AUTHORIZATION로 받을 예정입니다. \n LOGOUT_TOKEN_ERR(-1201, \"토큰 헤더가 없거나 유효하지 않습니다.\"),\n" +
        "JWT_TOKEN_INVALID(-1302, \"유효하지 않은 토큰입니다.\"),\n" +
        "LOGOUT_IS_OK(1200, \"로그아웃이 성공적으로 이루어졌습니다.\"),\n" +
        "세 가지 경우의 결과가 나옵니다. 200OK 받으면 성공적으로 로그아웃 된 것.")
    @GetMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) throws IOException {
        return userService.logoutUser(request);
    }


}
