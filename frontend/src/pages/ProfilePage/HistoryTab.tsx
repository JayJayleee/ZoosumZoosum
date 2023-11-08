import React, { View, FlatList, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import AppText from '@/components/ui/Text'
import { activityHistory } from '@/types/profile'

type HistoryProps = {
  nickname: string;
  isMyProfile: boolean;
  activityList: activityHistory
}

export default function HistoryTab({nickname, isMyProfile, activityList}: HistoryProps) {
  return (
  <>
    <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 40, top:30, color: 'white', justifyContent:'center', textAlign: 'center'}} >
      {isMyProfile? "나의 활동 기록" :`${nickname}님의 활동 기록`}
    </AppText>
    <View style={{width: 400, height: 650, top:30, justifyContent: 'center', alignItems: 'center'}}>
      {activityList.content.length === 0? <AppText children="아직 활동 기록이 없습니다." style={{justifyContent: 'center', textAlign: 'center', color: 'white', fontSize: 40}} />
       : <FlatList style={{}} data={activityList.content} renderItem={({item}) => {
        const { activityId, userId, activityType, fileUrl, plogging, createTime } = item;
        if (activityType === "PLOG") {
          return (
            <View style={{flexDirection: 'row', width:370, height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <FastImage source={{uri: fileUrl}} style={{width: 200, height: 200,}}/>
              <View>
                <AppText>이동한 거리 {plogging?.ploggingLength}</AppText>
                <AppText>이동한 시간{plogging?.ploggingTime}</AppText>
                <AppText>쓰레기 개수{plogging?.ploggingTrash}</AppText>
              </View>
            </View>
          )
        } else {
          return (
            <View style={{flexDirection: 'row', width:370, height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <FastImage source={{uri: fileUrl}} style={{width: 200, height: 200,}}/>
              <View>
                <AppText>활동 증서 보기</AppText>
              </View>
            </View>
          )
        }
       }}/> }
    </View>
  </>
  )
}
