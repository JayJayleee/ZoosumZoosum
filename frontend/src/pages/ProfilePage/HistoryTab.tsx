import React, { useEffect } from 'react'
import { View, FlatList, Text, Alert } from 'react-native'
import { useState } from 'react'
import FastImage from 'react-native-fast-image'
import AppText from '@/components/ui/Text'
import { styles } from './styles'
import { activityHistory } from '@/types/profile'
import { getActivityInfo, getActivityPlogInfo, getActivityTreeInfo } from '@/apis/profile';
import { useQuery } from '@tanstack/react-query';
import { TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { toastConfig } from '@/constants/toastConfig'
import { windowHeight } from '@/constants/styles'
import { SingleSelect } from '@/components/ui/SelectList'
import { ImageDetailModal } from '@/components/ui/Modal/ImageDetailModal'


type HistoryProps = {
  nickname: string;
  isMyProfile: boolean;
}

export default function HistoryTab({nickname, isMyProfile}: HistoryProps) {
  // 이미지 모달 열기 및 닫기를 위한 변수 생성
  const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");
  
  // 활동 내역을 저장하기 위한 변수 생성
  const [activityList, setActivityList] = useState<activityHistory>({
    content: [],
    size: 0,
  })
  // 활동내역의 무한 스크롤을 위한 페이지 번호 변수 생성
  const [activityPageNumber, setPageNumber] = useState<number>(0);

  // 활동 내역에서 타입 변경을 확인하기 위한 변수 생성
  const [selectType, setSelectType] = useState<string>("전체 활동 내역");

  // 활동 내역에서 타입 지정을 위한 리스트 생성
  const dataList = ["전체 활동 내역", "플로깅 내역", "나무 인증서 내역"];
  
  // 화면 섹션 클릭 시 실행하는 함수
  const openModal = (uri: string) => {
    setImageURL(uri);
    setImageModalOpen(true);
  };
  

  // 활동 변수에 받아온 결과를 저장하는 코드 
  const { isLoading: activityLoading, isError: isActivityError, error: ActivityError} = useQuery<activityHistory>(
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
      type: "end",
      text1: "더 많은 활동을 통해 채워주세요!",
      visibilityTime: 1000,
    })
  };

  // 무한 스크롤 함수(받아온 사이즈가 넣은 값과 같으면 한번 더 요청, 그보다 작으면 멈춤)
  const OnEndReached = () => {
    if (activityList.size === 10) {
      getListByType()
    } else {
      showToast()
    }
  }

  // 타입에 따른 리스트를 받아오는 함수
  const getListByType = async () => {
    if (selectType === "전체 활동 내역") {
      const Result = await getActivityInfo(nickname, activityPageNumber, 10)

      setActivityList({
        content: [...activityList.content, ...Result.content],
        size: Result.size,
      })
    } else if (selectType === "플로깅 내역") {
      const Result = await getActivityPlogInfo(nickname, activityPageNumber, 10)

      setActivityList({
        content: [...activityList.content, ...Result.content],
        size: Result.size,
      })
    } else {
      const Result = await getActivityTreeInfo(nickname, activityPageNumber, 10)

      setActivityList({
        content: [...activityList.content, ...Result.content],
        size: Result.size,
      })
    }
    setPageNumber(activityPageNumber + 1);
  };


  // 타입 변경 시, 실행할 함수
  const changeType = (type: string) => {
    if (type !== selectType) {
      setSelectType(type);
      setActivityList({
        content: [],
        size: 0,
      })
      setPageNumber(activityPageNumber => activityPageNumber - activityPageNumber);
    }
  }

  useEffect(() => {
    getListByType();
  }, [selectType])

  return (
  <>
    {isImageModalOpen && <ImageDetailModal isImageModalOpen={isImageModalOpen} closeFnt={() => setImageModalOpen(false)} imageURL={imageURL} />}
    <AppText style={styles.upperTitle} >
      {isMyProfile? "나의 활동 기록" :`${nickname}님의\n 활동 기록`}
    </AppText>
    <View style={styles.historySelect}>
      <SingleSelect
       dataList={dataList} 
       setSelected={changeType} 
       defalut='전체 활동 내역'
       boxStyle='typebox'
       listStyle='typelist'/>
    </View>
    <Toast config={toastConfig} />
    <View style={styles.historyBox}>
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
