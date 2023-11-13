package com.addShot.zoosum.domain.user.service;

import com.addShot.zoosum.domain.activity.service.ActivityService;
import com.addShot.zoosum.domain.animal.repository.AnimalRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.domain.animal.service.AnimalService;
import com.addShot.zoosum.domain.item.repository.ItemRepository;
import com.addShot.zoosum.domain.item.service.ItemService;
import com.addShot.zoosum.domain.jwt.service.JwtTokenService;
import com.addShot.zoosum.domain.user.dto.request.UserInfoUpdateRequestDto;
import com.addShot.zoosum.domain.user.dto.request.UserLoginRequestDto;
import com.addShot.zoosum.domain.user.dto.response.NicknameDuplicatedResponseDto;
import com.addShot.zoosum.domain.user.dto.response.UserInfoUpdateResponseDto;
import com.addShot.zoosum.domain.user.dto.response.UserLoginResponseDto;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.JwtToken;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.enums.CustomErrorType;
import com.addShot.zoosum.entity.enums.ItemType;
import com.addShot.zoosum.entity.enums.Social;
import com.addShot.zoosum.util.exception.UnsatisfiedUserLoginDataException;
import com.addShot.zoosum.util.exception.UserNotFoundException;
import com.addShot.zoosum.util.jwt.HeaderUtils;
import com.addShot.zoosum.util.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
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
    private final ActivityService activityService;
    private final ItemService itemService;
    private final ItemRepository itemRepository;
    private final AnimalRepository animalRepository;
    private final AnimalService animalService;
    private final UserAnimalRepository userAnimalRepository;

    private final String DEFAULT_TREE = "그냥나무";
    private final String DEFAULT_ISLAND = "주섬주섬";
    private final String DEFAULT_ANIMAL = "송송이";


    @Override
    @Transactional
    public ResponseEntity<?> loginUser(UserLoginRequestDto userLoginRequestDto) {

        Optional<User> findUser = userRepository.findById(userLoginRequestDto.getId());
        UserLoginResponseDto userLoginResponseDto = new UserLoginResponseDto();

        //기존 유저가 아니라면 유저를 저장하고 반환하며, 다음 닉네임, 지역 입력을 위한 임시 토큰 발급
        if (findUser.isEmpty()){
            User user = userLoginRequestDto.toEntity();
            userRepository.save(user);
            userLoginResponseDto.setIsFirst("Y");

            //그냥나무
            Item tree = itemRepository.findItemByItemName(DEFAULT_TREE);

            //주섬주섬
            Item island = itemRepository.findItemByItemName(DEFAULT_ISLAND);

            activityService.saveUserItem(user, tree);
            activityService.saveUserItem(user, island);

            itemService.itemUpdate(user.getUserId(), ItemType.TREE, tree.getItemId());
            itemService.itemUpdate(user.getUserId(), ItemType.ISLAND, island.getItemId());
            // 기존 유저라면 기존에 보관 중인 jwtToken 제거해야 하는데 이걸 제거할 수가 없음
            // 근데 logout 과정에서 token을 삭제할 거기 때문에 여기서 삭제할 필요는 없음
        } else {
            User user = findUser.get();

            //email, 소셜 타입 추가 확인
            if(!user.getEmail().equals(userLoginRequestDto.getEmail())
                || !user.getSocialType().name().equals(userLoginRequestDto.getSocialType())){
                throw new UnsatisfiedUserLoginDataException(CustomErrorType.UNSATISFIED_USER_LOGIN_DATA.getMessage());
            }

            userLoginResponseDto.setIsFirst("N");
            userLoginResponseDto.setNickname(user.getNickname());
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
    public NicknameDuplicatedResponseDto findDuplicateNickname(String nickname){
        User findUser = userRepository.findUserByNickname(nickname);


        if(findUser == null){
            return new NicknameDuplicatedResponseDto(false);
        }

        return new NicknameDuplicatedResponseDto(true);
    }



//    @Override
//    public String findUserIdByNickname(String nickname){
//        User findUser = userRepository.findUserByNickname(nickname);
//
//        if(findUser == null){
//            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
//        }
//
//        return findUser.getUserId();
//
//
//    }

    @Override
    @Transactional
    public String updateUserInfo(String accessToken, UserInfoUpdateRequestDto updateResponseDto, String userId) {

        String token = accessToken.substring(7);

        Optional<User> findUser = userRepository.findById(userId);

        //유저 정보가 부정확
        if (findUser.isEmpty()){
            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        }

        User user = findUser.get();

        User updatedUser = updateResponseDto.toEntity(user);
        userRepository.save(updatedUser);

        //access token, jwt token 재발급
        JwtToken jwtToken = jwtTokenProvider.generateNewToken(updateResponseDto);

        jwtTokenService.deleteJwtToken(token);
        jwtTokenService.saveJwtToken(jwtToken.getAccessToken(), userId);

        return jwtToken.getAccessToken();
    }
}
