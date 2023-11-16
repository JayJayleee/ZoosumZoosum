import React, {useState} from 'react';
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

import { fetchMyAnimalDetailInfo } from '@/apis/animalDetail';
import {useQuery} from '@tanstack/react-query';
import { Wave } from '@/components/ui/animation/LottieEffect';

type Animal = {
  animalId: number;
  userAnimalName: string;
  description :string;
  createTime : string;
  trashTogether : number;
  hour : number;
  minute : number;
  second : number;
  lengthTogether : number;
  fileUrl: string;
};




export default function FriendDetailPage({navigation, route }: FriendDetailScreenProps) {
  const [animal, setAnimal] = useState<Animal>();
  // console.log(route)
  const apiID = route.params.animalId
  useQuery(['animalDetail',apiID], 
  () => fetchMyAnimalDetailInfo(apiID), {
    onSuccess: (response: Animal) => {
      const data = response;
      setAnimal(data)
      
    },

    onError: error => {
      console.error('돌발돌발', error);
    },
  });

  if (!animal) return (
    <View style={styles.isLoading}>
      <FastImage source={require('@/assets/loginpage_image/zooisland_logo.png')} />
      <Wave />
      <AppText style={styles.isLoading}>잠시 기다려 주세요!</AppText>
    </View>
  )
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/friendlist_background.png')}
      resizeMode="cover"
      blurRadius={1}>
      <View
      style={styles.backgroungcolor}
      ></View>
      { animal !== undefined &&
        <View style={styles.container}>
        <View style={styles.body1}>
          <FastImage style={styles.FriendDetail_Image} source={{uri: animal.fileUrl}}/>
          <AppText style={styles.animalName}>{animal.userAnimalName}</AppText>
          <View style={styles.viewAnimalDescription}>
            <Text style={styles.animalDescription}>{animal.description}</Text>
          </View>
        </View>
        <View style={styles.body2}>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title}>처음만난날</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >{animal.createTime}</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >같이 주운 쓰레기</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>{animal.trashTogether}개</AppText>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 산책한 시간</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >{animal.hour}시 {animal.minute}분 {animal.second}초</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 걸은 거리</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>{animal.lengthTogether}km</AppText>
              </View>
            </View>
          </View>
        </View>
        <AppButton
        children='리스트 보기'
        variant='gotoisland'
        onPress={() => navigation.navigate('FriendList')}/>
      </View>
      }
    </ImageBackground>
  )
}
