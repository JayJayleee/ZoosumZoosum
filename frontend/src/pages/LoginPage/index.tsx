import React, {useState, useEffect} from 'react';
import { getStorage, setStorage } from '@/apis/index';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {LoginScreenProps} from 'typePath';
import styles from './style';

import KakaoLoginButton from '@/components/Auth/KakaoLoginButton';
import FastImage from 'react-native-fast-image';
import AppText from '@/components/ui/Text';
// import NaverLoginButton from '@/components/Auth/NaverLoginButton';

export default function LoginPage({navigation}: LoginScreenProps) {
  // 로그인 상태가 아닐 때, 카카오 버튼을 띄우기 위한 변수 생성
  const [isClicked, setIsClicked] = useState(false);
  let token = null;
  let nickname = null;

  // 페이지에 들어오면 초기 상태로 돌려놓기
  useEffect(() => {
    setIsClicked(false)
    token = null;
  }, [])

  // 이미 로그인한 상태일 경우, 바로 메인페이지로 이동하는 함수 생성
  const isLoginState = async () => {
    token = await getStorage('AccessToken');
    nickname = await getStorage('Nickname');

    if (token !== null) {
      if (nickname !== null) {
        navigation.navigate('Main');
      } else {
        navigation.navigate("UserInfo");
      }
    } else {
      setIsClicked(true)
    }
  }

  // 첫 로그인 후, 유저 정보 입력 페이지로 이동하도록 하는 함수 생성
  const MovePage = () => {
    navigation.navigate('UserInfo');
  }

  // 로그인 버튼 컴포넌트
  const LoginButton = <View style={isClicked? styles.showLoginButton: styles.hiddenLoginButton}>
    <KakaoLoginButton moveUserInfoPage={MovePage} moveMainPage={() => navigation.navigate('Main')} checkState={isClicked} setState={setIsClicked} />
    {/* <NaverLoginButton /> */}
  </View>

  return (
  <ImageBackground
    style={StyleSheet.absoluteFill}
    source={require('@/assets/animation/background_anime.gif')}
    resizeMode='cover'>
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.7} 
      onPress={isLoginState}
    >
      <FastImage
        style={styles.logo} 
        source={require('@/assets/loginpage_image/zooisland_logo.png')}
      />
      {LoginButton}
      <View style={styles.textArea}>
        {!isClicked? <AppText children={"화면을 터치해주세요"} style={styles.loginText}/> : null}
      </View>
    </TouchableOpacity>
  </ImageBackground>
  );
}
