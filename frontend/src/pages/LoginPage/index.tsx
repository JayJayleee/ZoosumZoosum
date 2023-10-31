import React, {useState} from 'react';
import { getStorage } from '@/apis/index';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {LoginScreenProps} from 'typePath';
import styles from './style';

import KakaoLoginButton from '@/components/Auth/KakaoLoginButton';
// import NaverLoginButton from '@/components/Auth/NaverLoginButton';

export default function LoginPage({navigation}: LoginScreenProps) {
  // 로그인 상태가 아닐 때, 카카오 버튼을 띄우기 위한 변수 생성
  const [isClicked, setIsClicked] = useState(false);

  // 이미 로그인한 상태일 경우, 바로 메인페이지로 이동하는 함수 생성
  const isLoginState = async () => {
    const bol = await getStorage("Accesstoken");
    if (bol !== null) {
      navigation.navigate('Main');
    } else {
      setIsClicked(true)
    }
  }

  // 첫 로그인 후, 유저 정보 입력 페이지로 이동하도록 하는 함수 생성
  const MovePage = () => {
    navigation.navigate('UserInfo');
  }

  // 로그인 버튼 컴포넌트
  const LoginButton = <View style={isClicked? styles.showLoginButton: styles.hiddeneLoginButton}>
    <KakaoLoginButton movePage={MovePage}/>
    {/* <NaverLoginButton /> */}
  </View>

  return (
  <ImageBackground
    style={StyleSheet.absoluteFill}
    source={require('@/assets/loginpage_image/login_background.png')}
    resizeMode='cover'>
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.7} 
      onPress={isLoginState}
    >
      <View>
        <Image
          style={styles.logo} 
          source={require('@/assets/loginpage_image/zooisland_logo.png')}
        />
        {LoginButton}
      </View>
    </TouchableOpacity>
  </ImageBackground>
  );
}
