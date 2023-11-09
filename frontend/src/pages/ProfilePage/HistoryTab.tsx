import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { useState } from 'react'
import FastImage from 'react-native-fast-image'
import AppText from '@/components/ui/Text'
import { styles } from './styles'
import { activityHistory } from '@/types/profile'
import { getActivityInfo } from '@/apis/profile';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/ui/Spinner'

type HistoryProps = {
  nickname: string;
  isMyProfile: boolean;
}

export default function HistoryTab({nickname, isMyProfile}: HistoryProps) {

  const [activityList, setActivityList] = useState<activityHistory>({
    content: [],
    size: 0,
  })
  // 활동내역의 무한 스크롤을 위한 페이지 번호 변수 생성
  const [activityPageNumber, setPageNumber] = useState<number>(0);


  // 활동 변수에 받아온 결과를 저장하는 코드 
  const { isLoading: activityLoading, isError: isActivityError, error: ActivityError } = useQuery<activityHistory>(
    ["activityList"],
    () => getActivityInfo(nickname, activityPageNumber, 25),
    {
      onSuccess: (data) => {
        setActivityList({
          content: data.content,
          size: data.size,
        })
      },
    }
  );

  // if (activityLoading) {
  //   return <Spinner />
  // }

  return (
  <>
    <AppText style={styles.upperTitle} >
      {isMyProfile? "나의 활동 기록" :`${nickname}님의 활동 기록`}
    </AppText>
    <View style={styles.historyBox}>
      <View style={styles.historyInner}>
        {activityList.content.length === 0? <AppText children="아직 활동 기록이 없습니다." style={styles.historyEmpty} />
        : <FlatList contentContainerStyle={{justifyContent: 'center', alignItems: 'center',}} data={activityList.content} renderItem={({item}) => {
          const { activityId, userId, activityType, fileUrl, plogging, createTime } = item;
          if (activityType === "PLOG") {
            return (
              <View key={activityId} style={styles.historyBoxSection}>
                <FastImage source={{uri: fileUrl}} style={styles.historyBoxImg}/>
                <View style={styles.historyBoxRight}>
                  <View style={styles.historyBoxDetail}>
                    <FastImage source={require("@/assets/img_icon/shoe_icon.png")} style={styles.historyBoxIcon}/>
                    <View style={styles.historyBoxDetailText}>
                      <AppText style={styles.historyBoxTitle}>
                        이동한 거리
                      </AppText>
                      <AppText style={styles.historyBoxContent}>
                        {plogging?.ploggingLength}km
                      </AppText>
                    </View>
                  </View>
                  <View style={styles.historyBoxLine}/>
                  <View style={styles.historyBoxDetail}>
                    <FastImage source={require("@/assets/img_icon/sand_clock_icon.png")} style={styles.historyBoxIcon}/>
                    <View style={styles.historyBoxDetailText}>
                      <AppText style={styles.historyBoxTitle}>
                        이동한 시간
                      </AppText>
                      <AppText style={styles.historyBoxContent}>
                        {plogging?.ploggingTime? 
                        `${Math.floor(plogging.ploggingTime/3600)}시간 ${Math.floor((plogging.ploggingTime%3600)/60)}분 ${plogging.ploggingTime%60}초` : 
                        "0시간 0분 0초"}
                      </AppText>
                    </View>
                  </View>
                  <View style={styles.historyBoxLine}/>
                  <View style={styles.historyBoxDetail}>
                    <FastImage source={require("@/assets/img_icon/trash_icon.png")} style={styles.historyBoxIcon}/>
                    <View style={styles.historyBoxDetailText}>
                      <AppText style={styles.historyBoxTitle}>
                        쓰레기 개수
                      </AppText>
                      <AppText style={styles.historyBoxContent}>
                        {plogging?.ploggingTrash}개
                      </AppText>
                    </View>
                  </View>
                </View>
              </View>
            )
          } else {
            return (
              <View style={styles.historyBoxSection}>
                <FastImage source={{uri: fileUrl}} style={styles.historyBoxImg}/>
                <View style={styles.historyBoxRight}>
                  <FastImage source={require("@/assets/img_icon/medal_icon.png")} style={styles.historyBoxMedal}/>
                  <AppText style={styles.historyBoxTitle}>나의 증서 보기</AppText>
                </View>
              </View>
            )
          }
        }}/> }
      </View>
    </View>
  </>
  )
}
