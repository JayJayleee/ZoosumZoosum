package com.addShot.zoosum.domain.activity.service;

import com.addShot.zoosum.domain.activity.dto.request.ActivityRequestDto;
import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDto;
import com.addShot.zoosum.domain.activity.dto.response.ActivityResponseDtoAndSize;
import com.addShot.zoosum.domain.activity.dto.response.ActivityRewardResponseDto;
import com.addShot.zoosum.domain.activity.dto.response.MissionResponseDto;
import com.addShot.zoosum.domain.activity.dto.response.ScoreResponseDto;
import com.addShot.zoosum.domain.activity.dto.response.SeedResponseDto;
import com.addShot.zoosum.domain.activity.repository.ActivityRepository;
import com.addShot.zoosum.domain.animal.dto.response.AnimalDrawResponse;
import com.addShot.zoosum.domain.animal.repository.AnimalRepository;
import com.addShot.zoosum.domain.animal.repository.UserAnimalRepository;
import com.addShot.zoosum.domain.common.dto.response.UserBadgeResponseDto;
import com.addShot.zoosum.domain.common.repository.UserBadgeRepository;
import com.addShot.zoosum.domain.item.dto.response.ItemResponseDto;
import com.addShot.zoosum.domain.item.repository.ItemRepository;
import com.addShot.zoosum.domain.item.repository.UserItemRepository;
import com.addShot.zoosum.domain.ranking.repository.RankingRepository;
import com.addShot.zoosum.domain.user.repository.UserRepository;
import com.addShot.zoosum.domain.userinfo.repository.UserPlogInfoRepository;
import com.addShot.zoosum.entity.ActivityHistory;
import com.addShot.zoosum.entity.Animal;
import com.addShot.zoosum.entity.AnimalMotion;
import com.addShot.zoosum.entity.Item;
import com.addShot.zoosum.entity.User;
import com.addShot.zoosum.entity.UserAnimal;
import com.addShot.zoosum.entity.UserBadge;
import com.addShot.zoosum.entity.UserItem;
import com.addShot.zoosum.entity.UserPlogInfo;
import com.addShot.zoosum.entity.embedded.Mission;
import com.addShot.zoosum.entity.embedded.SumPlogging;
import com.addShot.zoosum.entity.embedded.Time;
import com.addShot.zoosum.entity.embedded.UserAnimalId;
import com.addShot.zoosum.entity.embedded.UserItemId;
import com.addShot.zoosum.entity.embedded.UserPlogInfoId;
import com.addShot.zoosum.entity.enums.ActivityType;
import com.addShot.zoosum.entity.enums.BadgeType;
import com.addShot.zoosum.entity.enums.ItemType;
import com.addShot.zoosum.util.activity.ActivityLimit;
import com.addShot.zoosum.util.activity.MissionReward;
import com.addShot.zoosum.util.activity.Score;
import com.addShot.zoosum.util.s3.S3Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final UserPlogInfoRepository userPlogInfoRepository;
    private final ItemRepository itemRepository;
    private final AnimalRepository animalRepository;
    private final UserItemRepository userItemRepository;
    private final UserAnimalRepository userAnimalRepository;
    private final RankingRepository rankingRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    @Override
    public ActivityResponseDtoAndSize activityList(String nickname, Pageable pageable) {

        Page<ActivityHistory> activityHistoryList = activityRepository.findAllByUserNickname(nickname, pageable);
        if (activityHistoryList == null) {
            return null;
        }
        List<ActivityHistory> getList = activityHistoryList.getContent();
        List<ActivityResponseDto> resultList = new ArrayList<>();

        for(ActivityHistory ah : getList) {
            ActivityResponseDto dto;
            if (ah.getActivityType().equals(ActivityType.TREE)) {
                dto = ah.toTreeResponse(ah);
            } else {
                dto = ah.toPloggingResponse(ah);
            }
            resultList.add(dto);
        }
        log.info("resultList : {}", resultList);

        return new ActivityResponseDtoAndSize(resultList, resultList.size());
    }

    @Override
    public ActivityResponseDto certificateDetail(Long activityId) {
        Optional<ActivityHistory> findActivityHistory = activityRepository.findByActivityId(activityId);
        ActivityResponseDto responseDto;

        // ++ activityId에 해당하는 데이터를 찾지 못하면 예외를 발생시키는 코드를 작성하자.
        if (findActivityHistory.isEmpty()) return null;

        // ++ 나무에 대한 데이터를 조회한 것이 아니라면, 예외를 발생시키는 코드를 작성하자.
        ActivityHistory activityHistory = findActivityHistory.get();
        if (!activityHistory.getActivityType().equals(ActivityType.TREE)) return null;

        responseDto = activityHistory.toTreeResponse(activityHistory);

        return responseDto;
    }

    @Override
    @Transactional
    public ActivityRewardResponseDto writeActivityAndReward(String userId, MultipartFile activityImg,
        ActivityRequestDto activityRequestDto) {
        // User Entity 구하기
        log.info("User Entity 구하기");
        User user = userRepository.findUser(userId);

        // 플로깅 데이터 저장
        log.info("플로깅 데이터 저장");
        Long id = insertActivity(user, activityImg, activityRequestDto);
        log.info("writeActivityAndReward insert : {}", id);

        Map<String, Object> resultMap = new HashMap<>();

        // 누적/미션/점수 데이터 수정, 리워드 지급
        log.info("누적/미션/점수 데이터 수정, 리워드 지급");
        updateUserPlogInfo(user, activityRequestDto, resultMap);

        // 뱃지 업데이트
        log.info("뱃지 업데이트");
        updateBadge(user, resultMap);

        log.info("writeActivityAndReward result : {}", resultMap);

        log.info("DTO 변환");
        List<MissionResponseDto> missionList = new ArrayList<>();
        missionList.add((MissionResponseDto) resultMap.get("missionResponseDto"));

        MissionReward missionReward = (MissionReward) resultMap.get("missionReward");

        List<ItemResponseDto> islandList = new ArrayList<>();
        for (Item item : missionReward.getIslandList()) {
            islandList.add(item.toResponseDto());
        }

        List<ItemResponseDto> treeList = new ArrayList<>();
        for (Item item : missionReward.getTreeList()) {
            treeList.add(item.toResponseDto());
        }

        List<AnimalDrawResponse> animalList = new ArrayList<>();
        for (AnimalMotion animalMotion : missionReward.getAnimalList()) {
            animalList.add(animalMotion.toResponseDto());
        }

        List<SeedResponseDto> seedList = new ArrayList<>();
        List<ScoreResponseDto> scoreList = new ArrayList<>();
        seedList.add(new SeedResponseDto((Integer) resultMap.get("addSeed")));
        scoreList.add(new ScoreResponseDto((Integer) resultMap.get("addScore")));

        List<UserBadgeResponseDto> userBadgeList = new ArrayList<>();
        for (UserBadge userBadge : (List<UserBadge>) resultMap.get("newBadgeList")) {
            userBadgeList.add(userBadge.toResponseDto());
        }

        // ResponseDto 로 변환
        ActivityRewardResponseDto responseDto = ActivityRewardResponseDto.builder()
            .missionList(missionList)
            .islandList(islandList)
            .treeList(treeList)
            .animalList(animalList)
            .seedList(seedList)
            .scoreList(scoreList)
            .userBadgeList(userBadgeList)
            .build();
        return responseDto;
    }

    /**
     * ACTIVITY_HISTORY 에 플로깅 데이터를 저장
     * @param user 사용자 Entity
     * @param activityImg 활동 이미지
     * @param activityRequestDto 활동 데이터
     * @return 새롭게 생긴 활동 ID
     */
    @Transactional
    public Long insertActivity(User user, MultipartFile activityImg, ActivityRequestDto activityRequestDto) {
        // S3에 이미지를 저장하고, 이미지 URL 을 반환
        String fileUrl = s3Service.S3ImageUploadToAWS(activityImg, "Activity/", user.getUserId());

        // 플로깅 데이터 저장
        ActivityHistory activityHistoryEntity = ActivityRequestDto
            .toEntity(user.getUserId(), fileUrl, activityRequestDto);
        return activityRepository.save(activityHistoryEntity).getActivityId();
    }

    /**
     * USER_PLOG_INFO 에 플로깅 데이터를 누적 및 수정, 그리고 리워드 반환
     * @param user 사용자 Entity
     * @param activityRequestDto 활동 데이터
     * @return Map<String, Object> 리워드 관련 데이터
     */
    @Transactional
    public void updateUserPlogInfo(User user, ActivityRequestDto activityRequestDto, Map<String, Object> resultMap) {
        log.info("updateUserPlogInfo 사용자 엔티티 찾기");
        Optional<UserPlogInfo> optionalUserPlogInfo = userPlogInfoRepository.findById(new UserPlogInfoId(
            user.getUserId()));
        if (optionalUserPlogInfo.isEmpty()) return; // ++ userId에 해당하는 데이터를 찾지 못하면 예외를 발생시키는 코드를 작성하자.
        UserPlogInfo originUserPlogInfo = optionalUserPlogInfo.get();

        if (activityRequestDto == null) return;

        // 중복 매개변수 단순화
        Integer requestLength = activityRequestDto.getLength();
        Integer requestTime = activityRequestDto.getTime();
        Integer requestTrash = activityRequestDto.getTrash();

        // 플로깅 누적 데이터 갱신
        SumPlogging originPlogging = originUserPlogInfo.getSumPloggingData();
        SumPlogging sumPlog = SumPlogging.builder()
            .sumLength(originPlogging.getSumLength() + requestLength)
            .sumTime(originPlogging.getSumTime() + requestTime)
            .sumTrash(originPlogging.getSumTrash() + requestTrash)
            .build();

        // 미션 데이터 갱신
        Mission originMission = originUserPlogInfo.getMission();
        Integer missionLength = originMission.getMissionLength() + requestLength;
        Integer missionTime = originMission.getMissionTime() + requestTime;
        Integer missionTrash = originMission.getMissionTrash() + requestTrash;
        log.info("updateUserPlogInfo missionLength : {}, missionTime : {}, missionTrash : {}",
            missionLength, missionTime, missionTrash);
        Mission mission = updateMission(missionLength, missionTime, missionTrash);

        MissionResponseDto missionResponseDto = MissionResponseDto.builder()
            .missionLength(missionLength / ActivityLimit.LENGTH_DIVIDE / ActivityLimit.TEN)
            .missionTime(missionTime / ActivityLimit.TIME_DIVIDE / ActivityLimit.HUNDRED)
            .missionTrash(missionTrash / ActivityLimit.HUNDRED)
            .build();

        // 리워드 계산
        int mTrashQ = missionTrash / ActivityLimit.TRASH;   // 쓰레기 수 몫

        resultMap.put("mission", mission);
        resultMap.put("missionResponseDto", missionResponseDto);
        resultMap.put("missionReward", missionReward(user, missionLength, missionTime, missionTrash));
        resultMap.put("addSeed", mTrashQ);

        // 추가 점수 계산
        Integer score = addScore(activityRequestDto);
        resultMap.put("addScore", score);

        // 플로깅 누적, 미션, 점수, 씨앗, 수정일 UPDATE
        log.info("updateUserPlogInfo 플로깅 누적, 미션, 점수, 씨앗, 수정일 UPDATE");
        UserPlogInfo newUserPlogInfo = UserPlogInfo.builder()
            .id(new UserPlogInfoId(user.getUserId()))
            .user(user)
            .plogCount(originUserPlogInfo.getPlogCount() + 1)
            .sumPloggingData(sumPlog)
            .mission(mission)
            .score(originUserPlogInfo.getScore() + score)
            .seed(originUserPlogInfo.getSeed() + mTrashQ)
            .time(new Time(originUserPlogInfo.getTime().getCreateTime(), LocalDateTime.now()))
            .build();
        UserPlogInfo save = userPlogInfoRepository.save(newUserPlogInfo);
        log.info("updateUserPlogInfo save : {}", save);
        resultMap.put("userPlogInfo", newUserPlogInfo);
    }

    /**
     * 미션 데이터 갱신
     * @param missionLength 계산 전 미션 거리
     * @param missionTime 계산 전 미션 시간
     * @param missionTrash 계산 전 미션 쓰레기 수
     * @return 갱신된 Mission 객체
     */
    public Mission updateMission(Integer missionLength, Integer missionTime, Integer missionTrash) {
        log.info("미션 데이터 갱신");
        int mLenR = missionLength % ActivityLimit.LENGTH;    // 길이 나머지
        int mTimeR = missionTime % ActivityLimit.TIME;     // 시간 나머지
        int mTrashR = missionTrash % ActivityLimit.TRASH;   // 쓰레기 수 나머지
        return new Mission(mLenR, mTimeR, mTrashR);
    }

    /**
     * 추가 점수 계산:
     * @param activityRequestDto 활동 데이터
     * @return 추가 점수
     */
    public Integer addScore(ActivityRequestDto activityRequestDto) {
        log.info("추가 점수 계산");
        return Score.BASE + Math.round(activityRequestDto.getLength() / Score.LENGTH_DIVIDE)
            + Math.round(activityRequestDto.getTime() / Score.TIME_DIVIDE)
            + activityRequestDto.getTrash() * Score.TRASH;
    }

    /**
     * 섬(ITEM), 나무(ITEM), 동물정령(ANIMAL) 리워드를 지급한다.
     * DB의 Table에 데이터를 삽입하고, 그 값을 Client에게 반환한다.
     * @param missionLength 거리(분) -> 섬
     * @param missionTime 시간(초) -> 나무
     * @param missionTrash 쓰레기 수 -> 동물정령
     * @return
     */
    @Transactional
    public MissionReward missionReward(User user, Integer missionLength, Integer missionTime, Integer missionTrash) {
        log.info("미션 리워드 지급");
        MissionReward missionReward = new MissionReward();

        int mLenQ = missionLength / ActivityLimit.LENGTH;
        int mTimeQ = missionTime / ActivityLimit.TIME;
        int mTrashQ = missionTrash / ActivityLimit.TRASH;

        log.info("섬 리워드 지급");
        while (mLenQ-- > 0) { // 섬 리워드
            Item item = itemRepository.findRandomItem(ItemType.ISLAND);
            log.info("item ; {}", item);
            saveUserItem(user, item);
            missionReward.getIslandList().add(item);
        }
        log.info("나무 리워드 지급");
        while (mTimeQ-- > 0) { // 나무 리워드
            Item item = itemRepository.findRandomItem(ItemType.TREE);
            log.info("item ; {}", item);
            saveUserItem(user, item);
            missionReward.getTreeList().add(item);
        }
        log.info("동물 리워드 지급");
        while (mTrashQ-- > 0) { // 동물 리워드
            AnimalMotion animal = animalRepository.findRandomAnimal();
            log.info("animal ; {}", animal);
            saveUserAnimal(user, animal);
            missionReward.getAnimalList().add(animal);
        }
        log.info("missionReward : {}", missionReward);
        return missionReward;
    }

    /**
     * USER_ITEM 테이블에 리워드 저장
     * @param user 사용자 Entity
     * @param item 아이템 Entity
     */
    @Override
    @Transactional
    public void saveUserItem(User user, Item item) {
        log.info("USER_ITEM 테이블에 리워드 저장");
        UserItem userItem = UserItem.builder()
            .id(new UserItemId(user.getUserId(), item.getItmeId()))
            .user(user)
            .item(item)
            .selected(false)
            .time(new Time(LocalDateTime.now(), LocalDateTime.now()))
            .build();
        UserItem save = userItemRepository.save(userItem);
        log.info("USER_ITEM 테이블에 리워드 저장 save : {}", save);
    }

    /**
     * USER_ANIMAL 테이블에 리워드 저장
     * @param user 사용자 Entity
     * @param animal 동물 Entity
     */
    @Override
    @Transactional
    public void saveUserAnimal(User user, AnimalMotion animal) {
        log.info("USER_ANIMAL 테이블에 리워드 저장");
        UserAnimal userAnimal = UserAnimal.builder()
            .id(new UserAnimalId(user.getUserId(), animal.getAnimal().getAnimalId()))
            .user(user)
            .animal(animal.getAnimal())
            .selected(false)
            .userAnimalName(animal.getAnimal().getAnimalName())
            .time(new Time(LocalDateTime.now(), LocalDateTime.now()))
            .build();
        UserAnimal save = userAnimalRepository.save(userAnimal);
        log.info("USER_ANIMAL 테이블에 리워드 저장 save : {}", save);
    }

    /**
     * USER_ANIMAL 테이블에 리워드 저장
     * @param user 사용자 Entity
     * @param animal 동물 Entity
     */
    @Override
    @Transactional
    public void saveUserAnimal(User user, Animal animal) {
        log.info("USER_ANIMAL 테이블에 리워드 저장");
        UserAnimal userAnimal = UserAnimal.builder()
            .id(new UserAnimalId(user.getUserId(), animal.getAnimalId()))
            .user(user)
            .animal(animal)
            .selected(false)
            .userAnimalName(animal.getAnimalName())
            .time(new Time(LocalDateTime.now(), LocalDateTime.now()))
            .build();
        UserAnimal save = userAnimalRepository.save(userAnimal);
        log.info("USER_ANIMAL 테이블에 리워드 저장 save : {}", save);
    }

    /**
     * 뱃지 업데이트
     *  - (ANML) 동물획득 10, 20, 30마리
     *  - (LAND) 섬획득 3, 6, 9개
     *  - (LCRN) 지역랭킹 1, 3, 5위
     *  - (TPRN) 전체랭킹 1, 20, 50위
     *  - (PTCT) 플로깅참여 1, 10, 20회
     *  - (LGTH) 플로깅거리 10, 20, 30km
     *  - (TIME) 플로깅시간 100, 200, 300분
     *  - (TRSH) 주운쓰레기 100, 200, 300개
     * @param user 사용자 Entity
     * @param resultMap 결과 데이터 map
     */
    @Transactional
    public void updateBadge(User user, Map<String, Object> resultMap) {
        // User Entity
        log.info("User Entity: {}", user);

        // UserPlogInfo 확보
        log.info("UserPlogInfo 확보");
        UserPlogInfo userInfo = (UserPlogInfo) resultMap.get("userPlogInfo");
        log.info("UserPlogInfo 확보 : {}", userInfo);

        // 내가 갖고 있지 않은 뱃지 목록
        log.info("내가 갖고 있지 않은 뱃지 목록");
        List<UserBadge> dontHaveBadgeList = userBadgeRepository.findDontHaveBadge(user);
        log.info("내가 갖고 있지 않은 뱃지 목록 : {}", dontHaveBadgeList);

        // 새로 얻은 뱃지 목록
        List<UserBadge> newBadgeList = new ArrayList<>();

        // 1. 동물 획득 수
        log.info("1. 동물 획득 수");
        int myAnimalCount = 0;
        Optional<List<UserAnimal>> myAnimalList = userAnimalRepository.findAllByUserId(
            user.getUserId());
        if (myAnimalList.isPresent()) {
            myAnimalCount = myAnimalList.get().size();
        }
        log.info("1. 동물 획득 수 : {}", myAnimalCount);

        // 2. 섬 획득 수
        log.info("2. 섬 획득 수");
        int myIslandCount = userItemRepository.findAllByUserId(user.getUserId(), ItemType.ISLAND).size();
        log.info("2. 섬 획득 수 : {}", myIslandCount);

        // 3. 지역 랭킹
        log.info("3. 지역 랭킹");
        int myLocalRank = rankingRepository.findMyLocalRank(user);
        log.info("3. 지역 랭킹 : {}", myLocalRank);

        // 4. 전체 랭킹
        log.info("4. 전체 랭킹");
        int myAllRank = rankingRepository.findMyAllRank(user);
        log.info("4. 전체 랭킹 : {}", myAllRank);

        // 5. 플로깅 참여횟수
        log.info("5. 플로깅 참여횟수");
        int plogCount = userInfo.getPlogCount();
        log.info("5. 플로깅 참여횟수 : {}", plogCount);

        // 6, 7, 8. 플로깅 거리, 플로깅 시간, 주운 쓰레기 수
        log.info("6, 7, 8. 플로깅 거리, 플로깅 시간, 주운 쓰레기 수");
        int sumLength = userInfo.getSumPloggingData().getSumLength() / ActivityLimit.LENGTH_DIVIDE;
        int sumTime = userInfo.getSumPloggingData().getSumTime() / ActivityLimit.TIME_DIVIDE;
        int sumTrash = userInfo.getSumPloggingData().getSumTrash();
        log.info("{}km, {}분, {}개", sumLength, sumTime, sumTrash);


        // 내가 갖지 않은 뱃지를 순회하며, 내가 가질 자격이 있는 뱃지는 badgeGet을 1로 바꾸고, resultMap에 저장한다.
        // ANML, LAND, LCRN, TPRN, PTCT, LGTH, TIME, TRSH
        try {
            for (UserBadge badge : dontHaveBadgeList) {
                BadgeType type = BadgeType.valueOf(badge.getBadge().getBadgeId().substring(0, 4));
                switch (type) {
                    case ANML:
                        if (myAnimalCount < badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    case LAND:
                        if (myIslandCount < badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    case LCRN:
                        if (myLocalRank != badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    case TPRN:
                        if (myAllRank != badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    case PTCT:
                        if (plogCount < badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    case LGTH:
                        if (sumLength < badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    case TIME:
                        if (sumTime < badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    case TRSH:
                        if (sumTrash < badge.getBadge().getBadgeValue()) break;
                        getBadge(newBadgeList, badge);
                        break;
                    default:
                        throw new IllegalStateException("존재하지 않는 뱃지 타입입니다. type: " + type);
                }
            }
        } catch (IllegalStateException e) {
            e.printStackTrace();
        }
        log.info("새로 얻은 뱃지 목록 : {}", newBadgeList);
        resultMap.put("newBadgeList", newBadgeList);
    }

    private static void getBadge(List<UserBadge> newBadgeList, UserBadge userBadge) {
        userBadge.setBadgeGet(true);
        userBadge.setTime(new Time(userBadge.getTime().getCreateTime(), LocalDateTime.now()));
        newBadgeList.add(userBadge);
    }
}
