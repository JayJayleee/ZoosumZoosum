import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Text } from 'react-native';
import { ProfilescreenProps } from '@/types/path';
import { ImageBackground } from 'react-native';
import AppText from '@/components/ui/Text';
import { getStorage } from '@/apis';
// import styles from './styles';

type statisticInfo = {
  plogCount: number;
  sumLength: number;
  sumTime: number;
  sumTrash: number;
}

type badgeInfo = {
  badgeId: string;
  badgeName: string;
  fileUrl: string;
  badgeCondition: string;
  isHave: boolean;
}

type treeObj = {
  treeName: string;
  userName: string;
  userPhone: string; 
  userEmail: string;
}

type plogObj = {
  ploggingLength: number;
  ploggingTime: number;
  ploggingTrash: number;
}

type contentList = {
  activityId: number;
  userId: string;
  activityType: string;
  fileUrl: string;
  plogging: null | plogObj;
  tree: null | treeObj;
  createTime: string;
}

type activityHistory = {
  content: contentList[];
  last: boolean;
  empty: boolean;
}

export default function ProfilePage({navigation, route}: ProfilescreenProps) {
  // 페이지 이동 시 받을 변수를 저장할 변수 생성
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true);
  const [badgeList, setBadgeList] = useState<badgeInfo[]>([]);
  const [statisticList, setStatisticList] = useState<statisticInfo>({
    plogCount: 0,
    sumLength: 0,
    sumTime: 0,
    sumTrash: 0,
  })
  const [activityList, setActivityList] = useState<activityHistory>({
    content: [],
    last: true,
    empty: true,
  })

  // 들어온 프로필 페이지가 자신인지 타인인지 판단하는 코드
  useEffect(() => {
    const compareNickname = async () => {
      const myNickName = await getStorage("Nickname")
      if (myNickName !== route.params.nickname) {
        setIsMyProfile(false)
      } else {
        setIsMyProfile(true)
      }
      return true
    }
    
    compareNickname();
  }, [])

  // 뱃지 변수에 받아온 결과를 저장하는 코드
  useEffect(() => {
    let tmp = []
    for(let i=0; i<10; i++) {
      tmp.push({
        "badgeId": "1",
        "badgeName": "줍기왕1",
        "fileUrl": "https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/71366f53-057d-4c65-945d-348db7cb889e-blobtofile.png",
        "badgeCondition": "산책 5회 달성",
        "isHave": true
      })
    }
    setBadgeList(tmp);
  }, [])

  // 활동 변수에 받아온 결과를 저장하는 코드 
  useEffect(() => {
    setActivityList({"content": [
      {
        "activityId": 1,
        "userId": "id001",
        "activityType": "PLOG",
        "fileUrl": "https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/71366f53-057d-4c65-945d-348db7cb889e-blobtofile.png",
        "plogging": {
          "ploggingLength": 10,
          "ploggingTime": 20,
          "ploggingTrash": 30
        },
        "tree": null,
        "createTime": "2023-10-30T20:42:47.299588"
      },
      {
        "activityId": 1,
        "userId": "id001",
        "activityType": "PLOG",
        "fileUrl": "https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/71366f53-057d-4c65-945d-348db7cb889e-blobtofile.png",
        "plogging": {
          "ploggingLength": 10,
          "ploggingTime": 20,
          "ploggingTrash": 30
        },
        "tree": null,
        "createTime": "2023-10-30T20:42:47.299588"
      },
      {
        "activityId": 1,
        "userId": "id001",
        "activityType": "PLOG",
        "fileUrl": "https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/71366f53-057d-4c65-945d-348db7cb889e-blobtofile.png",
        "plogging": {
          "ploggingLength": 10,
          "ploggingTime": 20,
          "ploggingTrash": 30
        },
        "tree": null,
        "createTime": "2023-10-30T20:42:47.299588"
      },
      {
        "activityId": 1,
        "userId": "id001",
        "activityType": "PLOG",
        "fileUrl": "https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/71366f53-057d-4c65-945d-348db7cb889e-blobtofile.png",
        "plogging": {
          "ploggingLength": 10,
          "ploggingTime": 20,
          "ploggingTrash": 30
        },
        "tree": null,
        "createTime": "2023-10-30T20:42:47.299588"
      },
      {
        "activityId": 10,
        "userId": "id001",
        "activityType": "TREE",
        "fileUrl": "https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/71366f53-057d-4c65-945d-348db7cb889e-blobtofile.png",
        "plogging": null,
        "tree": {
          "treeName": "나무이름444",
          "userName": "내이름444",
          "userPhone": "010-1111-3333",
          "userEmail": "email444"
        },
        "createTime": "2023-10-30T20:42:41.583785"
      },
    ],
    "last": true,
    "empty": false,
  })
  }, [])

  // 하단 페이지 탭 변화 저장을 위한 변수 생성
  const [pageNumber, setPageNumber] = useState<number>(0);

  // 산책 통계 페이지
  const statisticPage = <>
    <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 40, top:30, color: 'white', justifyContent:'center', textAlign: 'center'}} >
      {isMyProfile? "나의 산책 기록" :`${route.params.nickname}님의 산책 기록`}
    </AppText>
    <ImageBackground source={require("@/assets/profile_image/profile_recipe.png")} style={{width: 400, height: 650, top:30, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: 300, height: 130, top: 25, flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
        <View>
          <Image source={require("@/assets/img_icon/foot_icon.png")} style={{width:80, height:80}}/>
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
          <Image source={require("@/assets/img_icon/shoe_icon.png")} style={{width:80, height:80}}/>
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
          <Image source={require("@/assets/img_icon/sand_clock_icon.png")} style={{width:80, height:80}}/>
        </View>
        <View>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 30, color: 'black'}}>
            이동한 시간
          </AppText>
          <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 20, color: 'black'}}>
            {statisticList.sumTime}분
          </AppText>
        </View>
      </View>
      <View style={{width: 300, height: 130, top: 25, flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
        <View style={{backgroundColor: '#FFE99C', width: 80, height: 80, borderRadius: 50}}>
          <Image source={require("@/assets/img_icon/trash_icon.png")} style={{width:80, height:80}}/>
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

  // 뱃지 페이지
  const badgePage = <>
    <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 40, top:30, color: 'white', justifyContent:'center', textAlign: 'center'}} >
      {isMyProfile? "내가 모은 뱃지" :`${route.params.nickname}님이 모은 뱃지`}
    </AppText>
    <View style={{width: 400, height: 500, top:50, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        {badgeList.map((badge, index) => {
          return (
            <View style={{width:370, height:90, backgroundColor: 'white', flexDirection: 'row', borderRadius: 10, marginTop: 10, marginBottom: 10, justifyContent:'space-evenly', alignItems: 'center'}} key={index}>
              <Image source={{uri: badge.fileUrl}} style={{width: 60, height: 60,}}/>
              <View>
                <AppText children={badge.badgeName} style={{fontSize: 20}}/>
                <AppText children={badge.badgeCondition} style={{fontSize: 12}}/>
                <AppText children={badge.isHave ? "보유" : "미보유"} style={{fontSize: 12}}/>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  </>

  // 활동 내역 페이지
  const historyPage = <>
    <AppText style={{fontFamily: 'NPSfont_bold',fontSize: 40, top:30, color: 'white', justifyContent:'center', textAlign: 'center'}} >
      {isMyProfile? "나의 활동 기록" :`${route.params.nickname}님의 활동 기록`}
    </AppText>
    <View style={{width: 400, height: 650, top:30, justifyContent: 'center', alignItems: 'center'}}>
      {activityList.empty? <AppText children="아직 활동 기록이 없습니다." style={{justifyContent: 'center', textAlign: 'center', color: 'white', fontSize: 40}} />
       : <FlatList style={{}} data={activityList.content} renderItem={({item}) => {
        const { activityId, userId, activityType, fileUrl, plogging, tree, createTime } = item;
        if (tree === null) {
          return (
            <View style={{flexDirection: 'row', width:370, height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <Image source={{uri: fileUrl}} style={{width: 200, height: 200,}}/>
              <View>
                <Text>이동한 거리 {plogging?.ploggingLength}</Text>
                <Text>이동한 시간{plogging?.ploggingTime}</Text>
                <Text>쓰레기 개수{plogging?.ploggingTrash}</Text>
              </View>
            </View>
          )
        } else {
          return (
            <View style={{flexDirection: 'row', width:370, height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <Image source={{uri: fileUrl}} style={{width: 200, height: 200,}}/>
              <View>
                <Text>나무 이름 {tree.treeName}</Text>
                <Text>내 이름 {tree.userName}</Text>
                <Text>등록한 이메일 {tree.userEmail}</Text>
                <Text>등록한 전화번호 {tree.userPhone}</Text>
              </View>
            </View>
          )
        }
       }}/> }
    </View>
  </>

  return (
  <ImageBackground source={require("@/assets/profile_image/profile_background.png")} style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center'}]}>
    {pageNumber == 0? statisticPage : (pageNumber == 1 ? badgePage : historyPage)}
    <View style={{flexDirection: 'row', backgroundColor: '#A5DCA0', borderRadius: 15, width: 390, height: 80, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => {setPageNumber(0)}} style={{alignItems: 'center'}}>
        <Image source={require("@/assets/img_icon/statistic_icon.png")} style={{width: 50, height: 50}}/> 
        <AppText children="통계 보기" style={{fontSize: 14}}/>         
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setPageNumber(1)}} style={{alignItems: 'center'}}>
        <Image source={require("@/assets/img_icon/badge_icon.png")} style={{width: 50, height: 50}}/>
        <AppText children="나의 뱃지" style={{fontSize: 14}}/>         
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setPageNumber(2)}} style={{alignItems: 'center'}}>
        <Image source={require("@/assets/img_icon/history_icon.png")} style={{width: 50, height: 50}}/>
        <AppText children="활동 내역" style={{fontSize: 14}}/>         
      </TouchableOpacity>
    </View>
  </ImageBackground>
  );
}
