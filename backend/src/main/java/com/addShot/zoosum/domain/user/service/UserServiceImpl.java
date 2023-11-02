package com.addShot.zoosum.domain.user.service;

import com.addShot.zoosum.domain.jwt.service.JwtTokenService;
import com.addShot.zoosum.domain.user.dto.request.UserInfoUpdateRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserLoginRequestDto;
import com.addShot.zoosum.domain.user.dto.response.UserInfoUpdateResponseDto;
import com.addShot.zoosum.domain.user.dto.response.UserLoginResponseDto;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.entity.JwtToken;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.util.jwt.HeaderUtils;
import com.addShot.zoosum.util.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;

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
        UserLoginResponseDto userLoginResponseDto = new UserLoginResponseDto();

        //기존 유저가 아니라면 유저를 저장하고 반환하며, 다음 닉네임, 지역 입력을 위한 임시 토큰 발급
        if (findUser.isEmpty()){
            User user = userLoginRequestDto.toEntity();
//            userRepository.
            userRepository.save(user);
            userLoginResponseDto.setIsFirst("Y");

            // 기존 유저라면 기존에 보관 중인 jwtToken 제거해야 하는데 이걸 제거할 수가 없음
            // 근데 logout 과정에서 token을 삭제할 거기 때문에 여기서 삭제할 필요는 없음
        } else {
//            User user = findUser.get();
//            jwtTokenService.
//            user.getUserId()
//
//            jwtTokenService.deleteJwtToken();
            userLoginResponseDto.setIsFirst("N");
        }

        //access 토큰, jwt 토큰 발급 후 저장
        JwtToken jwtToken = jwtTokenProvider.generateToken(userLoginRequestDto.getId());
        jwtTokenService.saveJwtToken(jwtToken);
        userLoginResponseDto.setAccessToken(jwtToken.getAccessToken());

        //access 토큰 반환
        return ResponseEntity.ok(userLoginResponseDto);
    }

    @Override
    @Transactional
    public void logoutUser(String accessToken) {

        jwtTokenService.deleteJwtToken(accessToken);
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

        //jwtToken 삭제
        //access token, jwt token 재발급
        JwtToken jwtToken = jwtTokenProvider.generateNewToken(updateResponseDto);
        jwtTokenService.saveJwtToken(jwtToken);

        return jwtToken.getAccessToken();
    }
}
