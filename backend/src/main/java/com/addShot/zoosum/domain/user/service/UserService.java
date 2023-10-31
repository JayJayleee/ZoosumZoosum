package com.addShot.zoosum.domain.user.service;

import com.addShot.zoosum.domain.user.dto.request.UserInfoUpdateRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserLoginRequestDto;
import com.addShot.zoosum.domain.user.dto.response.UserInfoUpdateResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<?> loginUser(UserLoginRequestDto userLoginRequestDto);

    ResponseEntity<?> logoutUser(HttpServletRequest request);

    String updateUserInfo(UserInfoUpdateRequestDto updateRequestDto, String userId);

    /**
     *
     */

}
