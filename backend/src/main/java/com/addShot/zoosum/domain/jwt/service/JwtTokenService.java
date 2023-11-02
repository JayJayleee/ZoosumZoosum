package com.addShot.zoosum.domain.jwt.service;

import com.addShot.zoosum.entity.JwtToken;
import io.jsonwebtoken.Jwt;

public interface JwtTokenService {

    /**
     * *
     * access 토큰을 기반으로 userId 를 반환*
     * @param accessToken
     * @return userId
     */
    String findUserId(String accessToken);

    /**
     * access 토큰을 기반으로 jwt 토큰을 삭제*
     * @param accessToken
     */
    void deleteJwtToken(String accessToken);

    /**
     * access 토큰을 기반으로 jwt 토큰을 반환 *
     * userId 등을 얻는 데에 활용 *
     * @param accessToken
     * @return
     */
    JwtToken findJwtToken(String accessToken);

    /**
     * jwt 토큰을 db에 저장
     * *
     * @param jwtToken
     */
    void saveJwtToken(JwtToken jwtToken);

    /**
     * access 토큰과 userId 로 jwt 토큰을 생성하고 저장
     * @param accessToken
     * @param userId
     */
    void saveJwtToken(String accessToken, String userId);
}
