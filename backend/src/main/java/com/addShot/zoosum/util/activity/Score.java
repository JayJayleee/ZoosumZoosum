package com.addShot.zoosum.util.activity;

public class Score {

    /**
     * 기본 점수: 플로깅 1회 = 10점
     */
    public static final int BASE = 10;

    /**
     * 거리 점수: 100m = 1점
     */
    public static final float LENGTH_DIVIDE = 100.0f;;

    /**
     * 시간 점수: 1분 = 1점
     * 초 단위로 시간 데이터를 사용하므로, 60으로 나눈다.
     */
    public static final float TIME_DIVIDE = 60.0f;

    /**
     * 쓰레기 점수: 1개 = 5점
     */
    public static final int TRASH = 5;

}
