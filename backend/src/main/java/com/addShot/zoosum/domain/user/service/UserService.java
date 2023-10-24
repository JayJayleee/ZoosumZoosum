package com.addShot.zoosum.domain.user.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<?> loginUser(HttpServletResponse response);

    ResponseEntity<?> logoutUser(HttpServletRequest request);

    /**
     *
     */

}
