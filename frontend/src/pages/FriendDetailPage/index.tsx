import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import styles from './style';
import { FriendDetailScreenProps } from '@/types/path';
import FastImage from 'react-native-fast-image';




export default function FriendDetailPage({navigation}: FriendDetailScreenProps) {
  const imgURI = 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Ox/Ox_3.gif'
  const name = '불불이'
  const description = '불불이는 이름처럼 불같은 성격을 가진 소 정령입니다'
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/friendlist_background.png')}
      resizeMode="cover"
      blurRadius={1}>
      <View
      style={styles.backgroungcolor}
      ></View>
      <View style={styles.container}>
        <View style={styles.body1}>
          <FastImage style={styles.FriendDetail_Image} source={{uri: imgURI}}/>
          <AppText style={styles.animalName}>{name}</AppText>
          <View style={styles.viewAnimalDescription}>
            <Text style={styles.animalDescription}>{description}</Text>
          </View>
        </View>
        <View style={styles.body2}>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title}>처음만난날</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >2023-07-25</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >같이 주운 쓰레기</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>25 개</AppText>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 산책한 시간</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >95 분</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 걸은 거리</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>35 km</AppText>
              </View>
            </View>
          </View>
        </View>
        <AppButton
        children='리스트 보기'
        variant='gotoisland'
        onPress={() => navigation.navigate('FriendList')}/>
      </View>
    </ImageBackground>
  )
}
