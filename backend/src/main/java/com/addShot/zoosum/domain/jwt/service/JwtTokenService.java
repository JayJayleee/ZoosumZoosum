package com.addShot.zoosum.domain.jwt.service;

import com.addShot.zoosum.entity.JwtToken;
import io.jsonwebtoken.Jwt;

public interface JwtTokenService {

    String findUserId(String accessToken);

    void deleteJwtToken(String accessToken);

    JwtToken findJwtToken(String accessToken);

    void saveJwtToken(JwtToken jwtToken);

    void saveJwtToken(String accessToken, String userId);
}
