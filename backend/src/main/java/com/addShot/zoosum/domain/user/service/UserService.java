package com.addShot.zoosum.domain.user.service;

import com.addShot.zoosum.domain.user.dto.request.UserInfoUpdateRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserLoginRequestDto;
import com.addShot.zoosum.domain.user.dto.response.UserInfoUpdateResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

    /**
     * 로그인에 필요한 데이터로 로그인 진행하며 access 토큰을 반환*
     * @param userLoginRequestDto
     * @return accessToken
     */
    ResponseEntity<?> loginUser(UserLoginRequestDto userLoginRequestDto);

    /**
     * 로그아웃 accessToken 기반으로 jwtToken 제거
     * @param accessToken
     */
    void logoutUser(String accessToken);

    /**
     * 닉네임으로 userId 찾기
     * @param nickname
     * @return
     */
    String findUserIdByNickname(String nickname);

    /**
     * 회원 정보 수정 후 access 토큰 재발급
     * @param updateRequestDto
     * @param userId
     * @return
     */
    String updateUserInfo(UserInfoUpdateRequestDto updateRequestDto, String userId);


}
