import React, { useLayoutEffect, useState } from 'react';
import { ImageBackground,  TextInput, Keyboard, View } from 'react-native';
import { SingleSelect } from '@/components/ui/SelectList';
import { UserInfoscreenProps } from '@/types/path';
import { setStorage } from '@/apis/index';
import { setUserInfoFtn, nicknameDuplicate } from '@/apis/login';
import { regionObj } from '@/types/login';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';
import AppButton from '@/components/ui/Button';
import { style } from './styles';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/components/ui/Toast';
import { windowHeight } from '@/constants/styles';


export default function UserInfoPage({navigation}: UserInfoscreenProps) {

  // 첫번째 입력창이 끝나고 다음 입력창으로 넘어가기 위한 변수 생성
  const [isRegionOk, setRegionOk] = useState(false);

  // 유저가 입력한 닉네임과 지역을 저장할 변수 생성
  const [userNickname, setUserNickname] = useState<string>('');
  const [nickDuplicated, setNickDuplicated] = useState<boolean>(false);

  const [userRegion, setUserRegion] = useState<string>('');

  // 키보드 상태 확인
  const [keyUp, setKeyUp] = useState<boolean>(false);

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
      
      if (nickDu.duplicated === false) {
        setNickDuplicated(true);

        await setStorage("Nickname", userNickname)

        await LastLoginFtn();
      } else {
        showToast("중복된 닉네임입니다")
      }
    } else {
      showToast("닉네임을 입력해주세요")
    }
  };

  // 백엔드에 새로운 토큰 발급 받기
  const LastLoginFtn = async () => {
    const response = await setUserInfoFtn({nickname: userNickname, region: regionDict[userRegion]});
    const result = await response.json();

    await setStorage("AccessToken", result.token);

    navigation.navigate('Tutorial');
  }

  // 지역 창에서 버튼 클릭 시 발생할 이벤트
  const RegionButton = async () => {
    if(userRegion !== "") {
      setRegionOk(true);
    } else {
      showToast("지역을 선택해주세요")
    }
  };

  // 지역 창
  const RegionInputModal = <>
    <AppText style={style.inputTitleText}>사는 지역을 선택해주세요</AppText>
    <FastImage source={require("@/assets/loginpage_image/login_inputbox.png")} style={style.inputBox}>
      <SingleSelect
      dataList={regionList}
      setSelected={setUserRegion} 
      maxHeight={windowHeight*0.22}
      placeholder='지역을 선택해주세요' />
      <AppButton children='닉네임 정하러 가기' onPress={RegionButton} variant='region' />
    </FastImage>
  </>

  const saveNickname = (text: string) => {
    if (text.length > 6) {
      setUserNickname(text.slice(0,6));
    } else {
      setUserNickname(text)
    }
  }

  // 닉네임 창
  const NicknameInputModal = <>
    <AppText style={style.inputTitleText}>닉네임을 정해주세요</AppText>
    <FastImage source={require("@/assets/loginpage_image/login_inputbox.png")} style={style.inputBox}>
        <TextInput
        value={userNickname}
        textContentType='name'
        onChangeText={saveNickname}
        placeholder='닉네임을 입력해주세요'
        style={style.inputNickname}
        maxLength={7}
        onSubmitEditing={Keyboard.dismiss}
        />
      <AppText children="닉네임은 최대 6글자까지 가능합니다" style={style.nicknameInfo}/>
      <AppButton children='내 섬으로 가기' onPress={NicknameButton} variant='nickname'/>
    </FastImage>
  </>

  // toast로 에러 메세지 출력
  const showToast = (text: string) => {
    Toast.show({
      type: 'error',
      text1: `${text}`
    });
  }

  useLayoutEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyUp(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyUp(false);
    });

    return () =>  {
      showKeyboard.remove()
      hideKeyboard.remove()
    }
  }, [])


  return (
  <ImageBackground 
  style={style.container}
  source={require('@/assets/loginpage_image/login_background.png')}>
    <View style={keyUp? style.keyUpBox: style.Box}>
      <FastImage source={require("@/assets/loginpage_image/zooisland_logo.png")} style={style.logo} />
      {!isRegionOk? RegionInputModal : NicknameInputModal}
      <Toast config={toastConfig}/>
    </View>
  </ImageBackground>
  );
}
