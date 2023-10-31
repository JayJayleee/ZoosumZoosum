package com.addShot.zoosum.util.jwt;


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

    public JwtToken generateToken(UserLoginRequestDto userLoginRequestDto) {

        Optional<User> optionalUser = userRepository.findById(userLoginRequestDto.getId());
        if (optionalUser.isEmpty()) {
//            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        }
        User user = optionalUser.get();
        //accessToken 생성
        String accessToken = Jwts.builder()
            .setSubject(user.getNickname())
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

//    public JwtToken generateNewToken(Authentication authentication) {
//
//        String userId = userDetails.getUsername();
//        Optional<String> nickname = userRepository.findNicknameByUserId(userId);
//        if (nickname.isEmpty()) {
//            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
//        }
//
//        //accessToken 생성
//        String accessToken = Jwts.builder()
//            .setSubject(nickname.get())
//            .claim("auth", authorities)
//            .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
//            .signWith(key, SignatureAlgorithm.HS256)
//            .compact();
//
//        //JwtToken 생성
//        return JwtToken.builder()
//            .grantType(AUTHENTICATION_PREFIX)
//            .accessToken(accessToken)
//            .userId("userId")
//            .build();
//    }
}
