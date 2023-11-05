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

import { fetchMyAnimalDetailInfo } from '@/apis/animalDetail';
import {useQuery} from '@tanstack/react-query';

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
  // console.log(route)
  const {data, isLoading, isError, error} = useQuery<Animal>({
    queryKey: ['animalkey'],
    queryFn: (() => fetchMyAnimalDetailInfo(route.params.animalId))
  });
  console.log(data)
  if (isLoading) return <Text>로딩...</Text>;
  if (isError) return <Text>에러: {error?.message}</Text>;


  const animalsArray: Animal = data as Animal
  // console.log(animalsArray)
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/friendlist_background.png')}
      resizeMode="cover"
      blurRadius={1}>
      <View
      style={styles.backgroungcolor}
      ></View>
      { animalsArray !== undefined && 
        <View style={styles.container}>
        <View style={styles.body1}>
          <FastImage style={styles.FriendDetail_Image} source={{uri: animalsArray.fileUrl}}/>
          <AppText style={styles.animalName}>{animalsArray.userAnimalName}</AppText>
          <View style={styles.viewAnimalDescription}>
            <Text style={styles.animalDescription}>{animalsArray.description}</Text>
          </View>
        </View>
        <View style={styles.body2}>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title}>처음만난날</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >{animalsArray.createTime}</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >같이 주운 쓰레기</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>{animalsArray.trashTogether}개</AppText>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 산책한 시간</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >{animalsArray.hour}시 {animalsArray.minute}분{animalsArray.second}초</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 걸은 거리</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>{animalsArray.lengthTogether}</AppText>
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
