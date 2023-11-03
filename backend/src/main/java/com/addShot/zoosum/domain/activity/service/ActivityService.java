package com.addShot.zoosum.domain.activity.service;

import com.addShot.zoosum.domain.activity.dto.request.ActivityRequestDto;
import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDto;
import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDtoAndSize;
import com.addShot.zoosum.domain.activity.dto.response.ActivityRewardResponseDto;
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.User;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ActivityService {

    /**
     * 사용자가 활동한 플로깅 내역과 인증서 목록 조회
     * TREE 테이블과 PLOGGING 테이블을 활용한다.
     * @param userId 사용자 ID
     * @param pageable 페이징 정보, 몇번째 페이지인지, 얼만큼 조회할 것인지
     * @return List<ActivityResponseDto>
     */
    ActivityResponseDtoAndSize activityList(String userId, Pageable pageable);

    /**
     * 인증서 상세 조회
     * @param activityId 활동 ID
     * @return ActivityResponseDto
     */
    ActivityResponseDto certificateDetail(Long activityId);

    /**
     * 플로깅 기록 및 리워드 반환
     * @param userId 사용자 ID
     * @param activityImg 활동 이미지
     * @param activityRequestDto 플로깅 객체
     * @return 리워드 객체 반환
     */
    ActivityRewardResponseDto writeActivityAndReward(String userId, MultipartFile activityImg, ActivityRequestDto activityRequestDto);

    void saveUserItem(User user, Item item);
    void saveUserAnimal(User user, AnimalMotion animal);
    void saveUserAnimal(User user, Animal animal);
}
