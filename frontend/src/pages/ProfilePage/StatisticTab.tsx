import React, { View, ImageBackground } from "react-native"
import FastImage from "react-native-fast-image"
import AppText from "@/components/ui/Text"
import { statisticInfo } from "@/types/profile"
import { styles } from "./styles"

type statisticProps = {
  statisticList: statisticInfo;
  nickname: string;
  isMyProfile: boolean;
}

export default function StatisticTab({nickname, isMyProfile, statisticList}: statisticProps) {
  return (
  <>
    <AppText style={styles.upperTitle} >
      {isMyProfile? "나의 산책 기록" :`${nickname}님의\n 산책 기록`}
    </AppText>
    <ImageBackground source={require("@/assets/profile_image/profile_recipe.png")} style={styles.staNoteImg}>
      <View style={styles.staNoteSection}>
        <FastImage source={require("@/assets/img_icon/foot_icon.png")} style={styles.staNoteIconFoot}/>
        <View>
          <AppText style={styles.staNoteTitle}>
            플로깅 횟수
          </AppText>
          <AppText style={styles.staNoteContent}>
            {statisticList.plogCount}회
          </AppText>
        </View>
      </View>
      <View style={styles.staNoteLine}/>
      <View style={styles.staNoteSection}>
        <FastImage source={require("@/assets/img_icon/shoe_icon.png")} style={styles.staNoteIcon}/>
        <View>
          <AppText style={styles.staNoteTitle}>
            이동한 거리
          </AppText>
          <AppText style={styles.staNoteContent}>
            {statisticList.sumLength}km
          </AppText>
        </View>
      </View>
      <View style={styles.staNoteLine}/>
      <View style={styles.staNoteSection}>
        <FastImage source={require("@/assets/img_icon/sand_clock_icon.png")} style={styles.staNoteIcon}/>
        <View>
          <AppText style={styles.staNoteTitle}>
            이동한 시간
          </AppText>
          <AppText style={styles.staNoteContent}>
            {statisticList.hour}시간 {statisticList.minute}분 {statisticList.second}초
          </AppText>
        </View>
      </View>
      <View style={styles.staNoteLine}/>
      <View style={styles.staNoteSection}>
        <FastImage source={require("@/assets/img_icon/trash_icon.png")} style={styles.staNoteIcon}/>
        <View>
          <AppText style={styles.staNoteTitle}>
            쓰레기 개수
          </AppText>
          <AppText style={styles.staNoteContent}>
            {statisticList.sumTrash}개
          </AppText>
        </View>
      </View>
    </ImageBackground>
  </>
  )
}
