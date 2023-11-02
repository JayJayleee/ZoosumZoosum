package com.addShot.zoosum.util.jwt;


import com.addShot.zoosum.domain.user.dto.request.UserInfoUpdateRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserLoginRequestDto;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.entity.JwtToken;
import com.addShot.zoosum.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenProvider {

    private final String AUTHENTICATION_PREFIX;

    private final long ACCESS_TOKEN_EXPIRATION_TIME;

    private final Key key;
    private final UserRepository userRepository;

    public JwtTokenProvider(
        @Value("${spring.jwt.secret}") String secretKey,
        @Value("${spring.jwt.prefix}") String authenticationPrefix,
        @Value("${spring.jwt.token.access-expiration-time}") long accessExpirationTime,
        UserRepository userRepository
    ) {
        byte[] secretByteKey = DatatypeConverter.parseBase64Binary(secretKey);
        this.key = Keys.hmacShaKeyFor(secretByteKey);
        this.AUTHENTICATION_PREFIX = authenticationPrefix;
        this.ACCESS_TOKEN_EXPIRATION_TIME = accessExpirationTime;
        this.userRepository = userRepository;
    }

    public JwtToken generateToken(String userId) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
//            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        }
        User user = optionalUser.get();

        //초기 값을 결정할 수가 없음...
        String nickname = "newUser";
        if(user.getNickname() != null && !user.getNickname().equals("")){
            nickname = user.getNickname();
        }

        //accessToken 생성
        String accessToken = Jwts.builder()
            .setSubject(nickname)
            .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        //JwtToken 생성
        return JwtToken.builder()
            .grantType(AUTHENTICATION_PREFIX)
            .accessToken(accessToken)
            .userId(user.getUserId())
            .build();
    }

    //처음 입력인지 수정인지 고려해서 진행..?
    public JwtToken generateNewToken(UserInfoUpdateRequestDto updateResponseDto) {

        Optional<User> optionalUser = userRepository.findById(updateResponseDto.getNickname());
        if (optionalUser.isEmpty()) {
//            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        }



        //accessToken 생성
        String accessToken = Jwts.builder()
//            .setSubject(nickname.get())
            .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        //JwtToken 생성
        return JwtToken.builder()
            .grantType(AUTHENTICATION_PREFIX)
            .accessToken(accessToken)
            .userId("userId")
            .build();
    }
}
