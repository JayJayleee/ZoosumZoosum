import React from 'react'
import { View, FlatList, Text, Alert } from 'react-native'
import { useState } from 'react'
import FastImage from 'react-native-fast-image'
import AppText from '@/components/ui/Text'
import { styles } from './styles'
import { activityHistory } from '@/types/profile'
import { getActivityInfo } from '@/apis/profile';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/ui/Spinner'
import { TouchableOpacity } from 'react-native'
import ModalComponent from '@/components/ui/Modal'
import Toast from 'react-native-toast-message'
import { toastConfig } from '@/components/ui/Toast'
import { windowHeight } from '@/constants/styles'

type HistoryProps = {
  nickname: string;
  isMyProfile: boolean;
}

export default function HistoryTab({nickname, isMyProfile}: HistoryProps) {

  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");

  const imageDetailModal = (
    <ModalComponent
      isVisible={isImageModalOpen}
      onClose={() => setImageModalOpen(false)}
      onRequestClose={() => setImageModalOpen(false)}
      buttonInnerText={"확인"}>
      <View>
        <FastImage style={styles.imageModal} source={{ uri: imageURL }} />
      </View>
    </ModalComponent>
  );

  // 화면 섹션 클릭 시 실행하는 함수
  const openModal = async (uri: string) => {
    await setImageURL(uri);
    setImageModalOpen(true);
  }


  const [activityList, setActivityList] = useState<activityHistory>({
    content: [],
    size: 0,
  })
  // 활동내역의 무한 스크롤을 위한 페이지 번호 변수 생성
  const [activityPageNumber, setPageNumber] = useState<number>(0);


  // 활동 변수에 받아온 결과를 저장하는 코드 
  const { isLoading: activityLoading, isError: isActivityError, error: ActivityError, refetch } = useQuery<activityHistory>(
    ["activityList"],
    () => getActivityInfo(nickname, activityPageNumber, 10),
    {
      onSuccess: (data) => {
        setActivityList({
          content: [...activityList.content, ...data.content],
          size: data.size,
        })
        setPageNumber(activityPageNumber + 1)
      },
    }
  );
  
  // toast 함수 호출
  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "모든 활동 내역을 불러왔습니다.",
      visibilityTime: 2000,
      topOffset: -(windowHeight * 0.4),
    })

  }

  // 무한 스크롤 함수(받아온 사이즈가 넣은 값과 같으면 한번 더 요청, 그보다 작으면 멈춤)
  const OnEndReached = () => {
    if (activityList.size === 10) {
      refetch()
    } else {
      showToast()
    }
  }

  return (
  <>
    {isImageModalOpen && imageDetailModal}
    <AppText style={styles.upperTitle} >
      {isMyProfile? "나의 활동 기록" :`${nickname}님의 활동 기록`}
    </AppText>
    <View style={styles.historyBox}>
      <Toast config={toastConfig} />
      <View style={styles.historyInner}>
        {activityList.content.length === 0? <AppText children="아직 활동 기록이 없습니다." style={styles.historyEmpty} />
        : <FlatList 
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center',}}
            onEndReached={OnEndReached}
            data={activityList.content} 
            renderItem={({item}) => {
          const { activityId, userId, activityType, fileUrl, plogging, createTime } = item;
          if (activityType === "PLOG") {
            return (
              <TouchableOpacity onPress={() => openModal(fileUrl)} key={activityId} style={styles.historyBoxSection}>
                <View style={styles.historyBoxLeft}>
                  <View style={styles.historyBoxDate}>
                    <AppText style={styles.historyBoxDateText} children={`${createTime.slice(0, 10).replaceAll("-", ".")}`}/>
                  </View>
                  <FastImage source={{uri: fileUrl}} style={styles.historyBoxImg}/>
                </View>
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
              </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity onPress={() => openModal(fileUrl)} key={activityId} style={styles.historyBoxSection}>
                <View style={styles.historyBoxLeft}>
                  <View style={styles.historyBoxDate}>
                    <AppText style={styles.historyBoxDateText} children={`${createTime.slice(0, 10).replaceAll("-", ".")}`}/>
                  </View>
                  <FastImage source={require("@/assets/profile_image/certificate_img.png")} style={styles.historyBoxAnimal} resizeMode={FastImage.resizeMode.contain}/>
                </View>
                <View style={styles.historyBoxRight}>
                  <FastImage source={require("@/assets/img_icon/medal_icon.png")} style={styles.historyBoxMedal}/>
                  <AppText style={styles.historyBoxTitle}>나의 증서 보기</AppText>
                </View>
              </TouchableOpacity>
            )
          }
        }}/> }
      </View>
    </View>
  </>
  )
}
