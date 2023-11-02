import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { ProfilescreenProps } from '@/types/path';
import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';

export default function ProfilePage({navigation, route}: ProfilescreenProps) {
  const [getUserId, setUserId] = useState<string>("");

  useEffect(()=> {
    setUserId(route.params.userId);
  }, [route.params]);

  return (
  <ImageBackground source={require("@/assets/profile_image/profile_background.png")} style={StyleSheet.absoluteFill}>
    <Text>여기는 프로필 페이지입니다.</Text>
    <Text>전달받은 유저 아이디는 {getUserId}입니다.</Text>
  </ImageBackground>
  );
}
