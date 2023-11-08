import React, { View, ImageBackground } from "react-native"
import FastImage from "react-native-fast-image"
import AppText from "@/components/ui/Text"
import { statisticInfo } from "@/types/profile"

type statisticProps = {
  statisticList: statisticInfo;
  nickname: string;
  isMyProfile: boolean;
}

export default function StatisticTab({nickname, isMyProfile, statisticList}: statisticProps) {
  return (
  <>
    <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 40, top:30, color: 'white', justifyContent:'center', textAlign: 'center'}} >
      {isMyProfile? "나의 산책 기록" :`${nickname}님의 산책 기록`}
    </AppText>
    <ImageBackground source={require("@/assets/profile_image/profile_recipe.png")} style={{width: 400, height: 650, top:30, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: 300, height: 130, top: 25, flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
        <View>
          <FastImage source={require("@/assets/img_icon/foot_icon.png")} style={{width:80, height:80}}/>
        </View>
        <View>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 30, color: 'black'}}>
            이동한 거리
          </AppText>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 20, color: 'black'}}>
            {statisticList.sumLength}km
          </AppText>
        </View>
      </View>
      <View style={{borderBottomWidth: 0.5, borderBottomColor: 'black', width: 280, top: 25}}/>
      <View style={{width: 300, height: 130, top: 25, flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
        <View style={{backgroundColor: '#FFE99C', width: 80, height: 80, borderRadius: 50}}>
          <FastImage source={require("@/assets/img_icon/shoe_icon.png")} style={{width:80, height:80}}/>
        </View>
        <View>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 30, color: 'black'}}>
            이동한 거리
          </AppText>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 20, color: 'black'}}>
            {statisticList.sumLength}km
          </AppText>
        </View>
      </View>
      <View style={{borderBottomWidth: 0.5, borderBottomColor: 'black', width: 280, top: 25}}/>
      <View style={{width: 300, height: 130, top: 25, flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
        <View style={{backgroundColor: '#FFE99C', width: 80, height: 80, borderRadius: 50}}>
          <FastImage source={require("@/assets/img_icon/sand_clock_icon.png")} style={{width:80, height:80}}/>
        </View>
        <View>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 30, color: 'black'}}>
            이동한 시간
          </AppText>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 20, color: 'black'}}>
            {statisticList.hour}시간 {statisticList.minute}분 {statisticList.second}초
          </AppText>
        </View>
      </View>
      <View style={{borderBottomWidth: 0.5, borderBottomColor: 'black', width: 280, top: 25}}/>
      <View style={{width: 300, height: 130, top: 25, flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
        <View style={{backgroundColor: '#FFE99C', width: 80, height: 80, borderRadius: 50}}>
          <FastImage source={require("@/assets/img_icon/trash_icon.png")} style={{width:80, height:80}}/>
        </View>
        <View>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 30, color: 'black'}}>
            쓰레기 개수
          </AppText>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 20, color: 'black'}}>
            {statisticList.sumTrash}개
          </AppText>
        </View>
      </View>
    </ImageBackground>
  </>
  )
}
