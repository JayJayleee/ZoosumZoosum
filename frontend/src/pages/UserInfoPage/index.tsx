import React, { useState } from 'react';
import { View, ImageBackground, Image, TextInput, StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native';
import { SingleSelect } from '@/components/ui/SelectList';
import ModalComponent from '@/components/ui/Modal';
import { UserInforscreenProps } from '@/types/path';
import { setStorage } from '@/apis/index';

export default function UserInfoPage({navigation}: UserInforscreenProps) {

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
   "경기도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "강원도", "제주도"]

  // 닉네임 창에서 버튼 클릭 시 발생할 이벤트
  const NicknameButton = async () => {
    if(userNickname !== "") {
      setModalVisible(false);
      setNickDuplicated(true);
      if (nickDuplicated === true) {
        await setStorage("Accesstoken", "loginSuccess");
        navigation.navigate('Main');
      } else {
        setModalVisible(true);
      }
    } else {
      setModalVisible(true);
    }
  };

  // 지역 창에서 버튼 클릭 시 발생할 이벤트
  const RegionButton = () => {
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
  const ErrorModal = () => <ModalComponent
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
    <Image source={require("@/assets/loginpage_image/zooisland_logo.png")}/>
    <ImageBackground source={require("@/assets/loginpage_image/login_inputbox.png")}>
      {!isRegionOk? RegionInputModal : NicknameInputModal}
    </ImageBackground>
  </ImageBackground>
  );
}
