package com.addShot.zoosum.domain.user.service;

import com.addShot.zoosum.domain.jwt.service.JwtTokenService;
import com.addShot.zoosum.domain.user.dto.request.UserInfoUpdateRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserLoginRequestDto;
import com.addShot.zoosum.domain.user.dto.response.UserInfoUpdateResponseDto;
import com.addShot.zoosum.domain.user.dto.response.UserLoginResponseDto;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.entity.JwtToken;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.util.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;

    @Override
    @Transactional
    public ResponseEntity<?> loginUser(UserLoginRequestDto userLoginRequestDto) {

        Optional<User> findUser = userRepository.findById(userLoginRequestDto.getId());

        //기존 유저가 아니라면 저장
        if (findUser.isEmpty()){
            User user = userLoginRequestDto.toEntity();
//            userRepository.
            userRepository.save(user);

            // 기존 access token 제거
        } else {

        }

        //access 토큰, jwt 토큰 발급 후 저장
        JwtToken jwtToken = jwtTokenProvider.generateToken(userLoginRequestDto);
        jwtTokenService.saveJwtToken(jwtToken);

        //access 토큰 반환
        return ResponseEntity.ok(new UserLoginResponseDto(jwtToken.getAccessToken()));
    }

    @Override
    @Transactional
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        return null;
    }

    @Override
    @Transactional
    public String updateUserInfo(UserInfoUpdateRequestDto updateResponseDto, String userId) {

        Optional<User> findUser = userRepository.findById(userId);

        //기존 유저가 아니라면..?
        if (findUser.isEmpty()){
            //throw exception
        }


        User user = findUser.get();

        User updatedUser = updateResponseDto.toEntity(user);
        userRepository.save(updatedUser);

        //access token, jwt token 재발급


        return null;
    }
}
