import React, {useState} from 'react';
import {View,Text,Button,ImageBackground,StyleSheet,} from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import FastImage from 'react-native-fast-image';

import { PickPloggingFriendscreenProps } from '@/types/path';

type ApiResponse = {
  data: Animal[];
};

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


export default function PickPloggingFriendPage({navigation}: PickPloggingFriendscreenProps) {
  const [animal, setAnimal] = useState<Animal>();

  const Animal = {
    "animalId": 6,
        "userAnimalName": "코코족제비",
        "description": "코코는 새하얀 몸을 가진 장난 치는 것을 좋아하는 족제비 정령입니다",
        "createTime": "2023-10-31",
        "trashTogether": 33,
        "lengthTogether": 18.12,
        "hour": 0,
        "minute": 0,
        "second": 56,
        "fileUrl": "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowWeasel/SnowWeasel_0.png"
  }


  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/pickPloggingFriend_image.png')}
      resizeMode="cover">
      { Animal !== undefined &&
      <View style={styles.container}>
        <View style={styles.body1}>
          <FastImage style={styles.FriendDetail_Image} source={{uri: Animal.fileUrl}}/>
          <AppText style={styles.animalName}>{Animal.userAnimalName}</AppText>
          <View style={styles.viewAnimalDescription}>
            <Text style={styles.animalDescription}>{Animal.description}</Text>
          </View>
        </View>
        <View style={styles.body2}>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title}>처음만난날</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >{Animal.createTime}</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >같이 주운 쓰레기</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>{Animal.trashTogether}개</AppText>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer1}>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 산책한 시간</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2} >{Animal.hour}시 {Animal.minute}분{Animal.second}초</AppText>
              </View>
            </View>
            <View style={styles.active}>
              <AppText style={styles.title} >함께 걸은 거리</AppText>
              <View style={styles.Together}>
                <AppText style={styles.title2}>{Animal.lengthTogether}</AppText>
              </View>
            </View>
          </View>
        </View>
        <AppButton
        children='산책하러가자GO'
        variant='gotoisland'
        onPress={() =>navigation.navigate({
            name: 'Plogging',
            params: {shouldOpenModal: false},
          })
        }/>
      </View>
      }
    </ImageBackground>
  )
}
