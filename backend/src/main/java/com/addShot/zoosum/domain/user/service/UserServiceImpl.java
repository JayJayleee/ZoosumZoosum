package com.addShot.zoosum.domain.user.service;

import com.addShot.zoosum.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

    @Override
    public ResponseEntity<?> loginUser(HttpServletResponse response) {
        return null;
    }

    @Override
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        return null;
    }
}
