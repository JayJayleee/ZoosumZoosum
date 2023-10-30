import React, {useState} from 'react';
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
  const [isClicked, setIsClicked] = useState(false);

  const MovePage = () => {
    navigation.navigate('UserInfo');
  }

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
      onPress={() => setIsClicked(true)}
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
