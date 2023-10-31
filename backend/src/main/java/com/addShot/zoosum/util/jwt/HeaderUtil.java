package com.addShot.zoosum.util.jwt;

import com.addShot.zoosum.domain.jwt.service.JwtTokenService;
import org.springframework.stereotype.Component;

@Component
public class HeaderUtil {
    private final JwtTokenService jwtTokenService;

    public HeaderUtil(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    public String getUserId(String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        return jwtTokenService.findUserId(accessToken);
    }
}
