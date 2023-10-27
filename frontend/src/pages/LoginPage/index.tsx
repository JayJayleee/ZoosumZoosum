import React, {useState} from 'react';
import {View, Image, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import { LoginScreenProps } from 'typePath';
import styles from './style';

export default function LoginPage({navigation}: LoginScreenProps) {
  const [isClicked, setIsClicked] = useState(false);

  const kakaoLogin = <TouchableOpacity style={styles.logoImage} onPress={() => console.log("카카오 로그인 페이지로")}>
    <Image source={require("@/assets/kakao_login_button.png")}/>
  </TouchableOpacity>

  // const naverLogin = <TouchableOpacity onPress={() => console.log("네이버 로그인 페이지로")}>
  //   <Image source={require("@/assets/naver_login_button.png")}/>
  // </TouchableOpacity>

  const LoginButton = <View style={styles.loginButton}>
    {kakaoLogin}
  </View>

  return (
  <ImageBackground
    style={StyleSheet.absoluteFill}
    source={require('@/assets/login_background.png')}
    resizeMode='cover'>
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.7} 
      onPress={() => setIsClicked(true)}
    >
      <View>
        <Image
          style={styles.logo} 
          source={require('@/assets/zooisland_logo.png')}
        />
        {isClicked? LoginButton : null}
      </View>
    </TouchableOpacity>
  </ImageBackground>
  );
}
