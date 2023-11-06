import React, { useState } from 'react';
import { View, ImageBackground, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SingleSelect } from '@/components/ui/SelectList';
import ModalComponent from '@/components/ui/Modal';
import { UserInfoscreenProps } from '@/types/path';
import { setStorage } from '@/apis/index';
import { setUserInfoFtn, nicknameDuplicate } from '@/apis/login';
import { regionObj } from '@/types/login';


export default function UserInfoPage({navigation}: UserInfoscreenProps) {

  // 에러 메세지를 표시한 모달창 on/off 상태 표시 변수 생성
  const [isModalVisible, setModalVisible] = useState(false);

  // 첫번째 입력창이 끝나고 다음 입력창으로 넘어가기 위한 변수 생성
  const [isRegionOk, setRegionOk] = useState(false);

  // 유저가 입력한 닉네임과 지역을 저장할 변수 생성
  const [userNickname, setUserNickname] = useState<string>('');
  const [nickDuplicated, setNickDuplicated] = useState<boolean>(false);

  const [userRegion, setUserRegion] = useState<string>('');

  // 지역 리스트 생성
  const regionList = ["서울", "부산", "인천", "대구", "대전", "광주", "울산", "세종",
   "경기도", "충청도", "전라도", "경상도", "강원도", "제주도"]

  const regionDict:regionObj = {
    "서울" : "SEOUL", "부산": "BUSAN", "인천": "INCHEON", "대구": "DAEGU", "대전": "DAEJEON", "광주": "GWANGJU", "울산": "ULSAN", "세종": "SEJONG",
    "경기도": "GYEONGGI", "충청도": "CHUNGCUNG", "전라도": "JEONLA", "경상도": "GYEONGSANG", "강원도": "KANGWON", "제주도": "JEJU"
  }

  // 닉네임 창에서 버튼 클릭 시 발생할 이벤트
  const NicknameButton = async () => {
    if(userNickname !== "") {
      const res = await nicknameDuplicate({nickname: userNickname});
      const nickDu = await res.json();

      if (nickDu.isDuplicate !== false) {
        setModalVisible(false);
        setNickDuplicated(true);

        await setStorage("Nickname", userNickname)

        await LastLoginFtn();
      } else {
        setModalVisible(true);
      }
    } else {
      setModalVisible(true);
    }
  };

  // 백엔드에 새로운 토큰 발급 받기
  const LastLoginFtn = async () => {
    if (nickDuplicated === true) {
      const response = await setUserInfoFtn({nickname: userNickname, region: regionDict[userRegion]});
      const result = await response.json();

      await setStorage("AccessToken", result.token);

      navigation.navigate('Main');
    } else {
      setModalVisible(true);
    }
  }

  // 지역 창에서 버튼 클릭 시 발생할 이벤트
  const RegionButton = async () => {
    if(userRegion !== "") {
      setModalVisible(false);
      setRegionOk(true);
    } else {
      setModalVisible(true);
    }
  };

  // 닉네임 창
  const NicknameInputModal = <View>
    <Text>닉네임을 정해주세요</Text>
    <TextInput
     value={userNickname}
     onChangeText={(text) => {setUserNickname(text)}}
     placeholder='닉네임을 입력해주세요' />
     <TouchableOpacity onPress={NicknameButton}>
      <Text>내 섬으로 가기</Text>
     </TouchableOpacity>
  </View>

  // 지역 창
  const RegionInputModal = <View>
    <Text>사는 지역을 선택해주세요</Text>
    <SingleSelect
     dataList={regionList}
     setSelected={setUserRegion} />
      <TouchableOpacity onPress={RegionButton}>
        <Text>닉네임 정하러 가기</Text>
     </TouchableOpacity>
  </View>

  // 에러 문구를 띄울 모달 창 생성
  const ErrorModal = <ModalComponent
    isVisible={isModalVisible}
    onClose={() => setModalVisible(false)}
    onRequestClose={() => setModalVisible(false)}
    buttonInnerText={"닫기"}>
      <View>
        <Text>입력해주세요</Text>
      </View>
    </ModalComponent>


  return (
  <ImageBackground 
  style={StyleSheet.absoluteFill}
  source={require('@/assets/loginpage_image/login_background.png')}
  resizeMode='cover'>
    {ErrorModal}
    <Image source={require("@/assets/loginpage_image/zooisland_logo.png")}/>
    <ImageBackground source={require("@/assets/loginpage_image/login_inputbox.png")}>
      {!isRegionOk? RegionInputModal : NicknameInputModal}
    </ImageBackground>
  </ImageBackground>
  );
}
