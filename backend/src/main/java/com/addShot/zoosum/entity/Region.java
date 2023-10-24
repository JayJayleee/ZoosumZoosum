package com.addShot.zoosum.entity;

public enum Region {
    SEOUL("서울"), DAEJEON("대전"), SEJONG("세종"), GWANGJU("광주"), INCHEON("인천"), DAEGU("대구")
    , BUSAN("부산"), ULSAN("울산"), JEJU("제주"), GYEONGGI("경기"), KANGWON("강원"), CHUNGCUNG("층청")
    , JEONLA("전라"), GYEONGSANG("경상");

    private String region;

    private Region(String region) {
        this.region = region;
    }

    public String getRegion() {
        return region;
    }
}
