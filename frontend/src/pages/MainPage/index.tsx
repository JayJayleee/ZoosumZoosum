import React, {useEffect, useRef, useState} from 'react';
import { Button, View, Text, Image, ImageBackground, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import {MainScreenProps} from 'typePath';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import AppButton from '@/components/ui/Button';
import { fetchMyIslandInfo, fetchMyStatusInfo } from '@/apis/Island';
import AppText from '@/components/ui/Text';

export default function MainPage({navigation}: MainScreenProps) {

  // 버튼 토글 상태를 나타낼 변수
  const [toggle, setToggle] = useState<boolean>(false);
  // 버튼 토글 애니메이션을 위한 값 생성
  const animation = useRef(new Animated.Value(0)).current;
  // 버튼 클릭 시, 애니메이션 실행
  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [animation, toggle])

  const islandUri: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png"
  const treeUri: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_01.png"
  const animal1: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_2.gif"
  const animal2: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_2.gif"
  const animal3: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_1.gif"
  const animal4: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_1.gif"
  const animal5: string = "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_3.gif"


  // 닫힌 상태의 토글 버튼
  const closedButton = <AppButton children='<' onPress={() => setToggle(!toggle)} variant='menuToggle'/>
  // 열린 상태의 토글 버튼
  const openedButton = <AppButton children='>' onPress={() => setToggle(!toggle)} variant='menuToggle'/>

  return (
    <ImageBackground source={require("@/assets/mainpage_image/Background.png")} style={StyleSheet.absoluteFill}>
      <View style={styles.upperStatus}>
        <Text>여기는 상단 스탯 바가 들어갈 자리</Text>
      </View>
      <View style={styles.banner}>
        <Text>여기는 배너가 들어갈 자리</Text>
      </View>
      <View style={styles.buttonToggle}>
        <Animated.View
         style={[{transform : [{translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -260],
         })}],
         opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
         })}]}>
          <TouchableOpacity onPress={toggle? () => {console.log("지구 클릭했어요")} : undefined } style={styles.toggleMoveButton}>
            <Image source={require("@/assets/img_icon/animal_earth_icon.png")} style={styles.toggleBtnImage} />
            <AppText children="랭킹 보기" style={styles.toggleBtnText}/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
         style={[{transform : [{translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -190],
         })}],
         opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
         })}]}>
          <TouchableOpacity onPress={toggle? () => {console.log("프로필 클릭했어요")} : undefined } style={styles.toggleMoveButton}>
            <Image source={require("@/assets/img_icon/profile_icon.png")} style={styles.toggleBtnImage} />
            <AppText children="나의 프로필" style={styles.toggleBtnText}/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
         style={[{transform : [{translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120],
         })}],
         opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
         })}]}>
          <TouchableOpacity onPress={toggle? () => {console.log("섬 클릭했어요")} : undefined } style={styles.toggleMoveButton}>
            <Image source={require("@/assets/img_icon/island_icon.png")} style={styles.toggleBtnImage} />
            <AppText children="나의 섬 테마" style={styles.toggleBtnText}/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
         style={[{transform : [{translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50],
         })}],
         opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
         })}]}>
          <TouchableOpacity onPress={toggle? () => {console.log("집 클릭했어요")} : undefined } style={styles.toggleMoveButton}>
            <Image source={require("@/assets/img_icon/animal_house_icon.png")} style={styles.toggleBtnImage} />
            <AppText children="내 동물 보기" style={styles.toggleBtnText}/>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.toggleButton}>
          {toggle? openedButton : closedButton}
        </View>
      </View>
      <View style={styles.centerImage}>
        <Image style={styles.island} source={{uri: islandUri}} resizeMode='stretch' />
        <Image style={styles.tree} source={{uri: treeUri}} resizeMode='stretch' />
        <FastImage style={styles.firstAnimal} source={{uri: animal1}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.secondAnimal} source={{uri: animal2}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.thirdAnimal} source={{uri: animal3}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.fourthAnimal} source={{uri: animal4}} resizeMode={FastImage.resizeMode.contain} />
        <FastImage style={styles.fifthAnimal} source={{uri: animal5}} resizeMode={FastImage.resizeMode.contain} />
      </View>
      <View style={styles.ploggingButton}>
        <AppButton children="산책하기" onPress={() => navigation.navigate('PickPloggingFriend')} variant='picnic' />
      </View>
    </ImageBackground>
  );
}
