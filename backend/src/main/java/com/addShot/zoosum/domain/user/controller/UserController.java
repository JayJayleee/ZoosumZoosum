package com.addShot.zoosum.domain.user.controller;

import com.addShot.zoosum.domain.jwt.service.JwtTokenService;
import com.addShot.zoosum.domain.user.dto.request.NicknameDuplicatedRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserInfoUpdateRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserLoginRequestDto;
import com.addShot.zoosum.domain.user.dto.response.NicknameDuplicatedResponseDto;
import com.addShot.zoosum.domain.user.dto.response.UserInfoUpdateResponseDto;
import com.addShot.zoosum.domain.user.service.UserService;
import com.addShot.zoosum.util.exception.UserException;
import com.addShot.zoosum.util.jwt.HeaderUtils;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[USER]", description = "USER 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@OpenAPIDefinition(
    servers = {
        @Server(url = "/api", description = "Default Server URL")
    }
)
@RequestMapping("user")
public class UserController {

    private final UserService userService;
    private final HeaderUtils headerUtils;

    @Operation(summary = "로그인 기능", description = "줘야 하는 값 : id, email, socialType, 프론트로 넘겨주는 값 : Access-Token \n" +
        "    LOGIN_HAVE_NO_ACCOUT(-1101, \"일치하는 계정이 없습니다.\"),\n" +
        "    LOGIN_GET_TOKEN_ERROR(-1102, \"토큰 발급 과정에서 문제가 발생했습니다.\"),\n" +
        "    LOGIN_SAVE_TOKEN_ERROR(-1103, \"토큰을 Redis로 저장하는 과정에서 문제가 발생했습니다.\"),\n" +
        "    LOGIN_IS_OK(1100, \"해당 계정이 존재합니다. (로그인 가능)\"),\n" +
        "    LOGIN_ACCOUT_IS_REMOVED(1101, \"탈퇴한 회원입니다. (로그인 불가)\"),\n" +
        "\n" +
        "네 가지 경우의 결과가 나옵니다. 200OK 받으면 성공적으로 로그인 된 것.\n")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        //내부에서 처음 방문이면 User 생성하고 access 토큰, jwt 토큰 발급하고 저장하고 access 토큰 리턴

        return userService.loginUser(userLoginRequestDto);
    }

    @Operation(summary = "로그아웃 기능", description = "로그아웃 시 Header에 `Access-Token`을 주어야 합니다. HttpHeaders.AUTHORIZATION로 받을 예정입니다. \n LOGOUT_TOKEN_ERR(-1201, \"토큰 헤더가 없거나 유효하지 않습니다.\"),\n" +
        "JWT_TOKEN_INVALID(-1302, \"유효하지 않은 토큰입니다.\"),\n" +
        "LOGOUT_IS_OK(1200, \"로그아웃이 성공적으로 이루어졌습니다.\"),\n" +
        "세 가지 경우의 결과가 나옵니다. 200OK 받으면 성공적으로 로그아웃 된 것.")
    @GetMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader){
        userService.logoutUser(authorizationHeader);

        return ResponseEntity.status(HttpStatus.OK).body("정상적으로 로그아웃되었습니다.");
    }

    //닉네임 중복 검사 - 유저 6번
    @PostMapping("/duplicate")
    public ResponseEntity<NicknameDuplicatedResponseDto> checkDuplicateNickname(@RequestBody NicknameDuplicatedRequestDto request) {
        NicknameDuplicatedResponseDto nicknameDuplicatedResponseDto = userService.findDuplicateNickname(request.getNickname());
        return ResponseEntity.status(HttpStatus.OK).body(nicknameDuplicatedResponseDto);
    }

    //유저 정보 수정 - 유저 5, 6번
    @PutMapping("/info")
    public ResponseEntity<UserInfoUpdateResponseDto> UserInfoUpdate(@RequestBody UserInfoUpdateRequestDto updateRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String userId = headerUtils.getUserId(authorizationHeader);

        String token = userService.updateUserInfo(authorizationHeader, updateRequest, userId);

        String message = "유저 정보 업데이트에 성공했습니다.";

        return ResponseEntity.ok(new UserInfoUpdateResponseDto(token, message));
    }

    @DeleteMapping("/{nickname}")
    public ResponseEntity<String> deleteUser(@PathVariable String nickname) {
        long result = userService.deleteUser(nickname);
        if (result == 0) {
            return ResponseEntity.ok("삭제 실패");
        }
        return ResponseEntity.ok("삭제 성공");
    }
}
