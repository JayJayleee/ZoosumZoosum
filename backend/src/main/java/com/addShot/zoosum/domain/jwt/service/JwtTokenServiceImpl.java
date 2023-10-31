package com.addShot.zoosum.domain.jwt.service;

import com.addShot.zoosum.domain.jwt.repository.JwtTokenRepository;
import com.addShot.zoosum.entity.JwtToken;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
public class JwtTokenServiceImpl implements JwtTokenService {

    private final String AUTHENTICATION_PREFIX;

    private final JwtTokenRepository jwtTokenRepository;

    public JwtTokenServiceImpl(@Value("${spring.jwt.prefix}") String AUTHENTICATION_PREFIX, JwtTokenRepository jwtTokenRepository) {
        this.AUTHENTICATION_PREFIX = AUTHENTICATION_PREFIX;
        this.jwtTokenRepository = jwtTokenRepository;
    }

    public String findUserId(String accessToken) {
        JwtToken jwtToken = findJwtToken(accessToken);
        return jwtToken.getUserId();
    }

    @Transactional
    public void deleteJwtToken(String accessToken) {
        JwtToken jwtToken = findJwtToken(accessToken);
        jwtTokenRepository.delete(jwtToken);
    }

    public JwtToken findJwtToken(String accessToken) {
        Optional<JwtToken> jwtToken = jwtTokenRepository.findById(accessToken);
//        if (jwtToken.isEmpty())
//            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        return jwtToken.get();
    }

    @Transactional
    public void saveJwtToken(JwtToken jwtToken){
        jwtTokenRepository.save(jwtToken);

    }

    @Transactional
    public void saveJwtToken(String accessToken, String userId) {
        JwtToken jwtToken = JwtToken.builder()
            .grantType(AUTHENTICATION_PREFIX)
            .accessToken(accessToken)
            .userId(userId)
            .build();
        jwtTokenRepository.save(jwtToken);
    }
}
