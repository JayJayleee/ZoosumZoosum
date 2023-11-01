package com.addShot.zoosum.entity.enums;

public enum BadgeType {
    ANML("동물 획득 수"),
    LAND("섬 획득 수"),
    LCRN("지역랭킹"),
    TPRN("전체랭킹"),
    PTCT("플로깅 참여 횟수"),
    LGTH("플로깅 거리"),
    TIME("플로깅 활동 시간"),
    TRSH("쓰레기 주운 개수");

    private final String badgeType;

    private BadgeType(String badgeType) {
        this.badgeType = badgeType;
    }

    public String getBadgeType() {
        return badgeType;
    }
}
