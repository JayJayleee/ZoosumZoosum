import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import FastImage from 'react-native-fast-image';
import {fetchMySelectAnimalInfo} from '@/apis/selectAnimal';
import {useQuery} from '@tanstack/react-query';

import {PickPloggingFriendscreenProps} from '@/types/path';

type ApiResponse = {
  data: Animal[];
};

type Animal = {
  animalId: number;
  userAnimalName: string;
  description: string;
  createTime: string;
  trashTogether: number;
  hour: number;
  minute: number;
  second: number;
  lengthTogether: number;
  fileUrl: string;
};

export default function PickPloggingFriendPage({
  navigation,
}: PickPloggingFriendscreenProps) {
  const [selectAnimalsArray, setSelectAnimalsArray] = useState<Animal[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useQuery(['selectAnimal'], fetchMySelectAnimalInfo, {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;
      setSelectAnimalsArray(data);
    },

    onError: error => {
      console.error('돌발돌발', error);
    },
  });

  // 인덱스를 증가시키는 함수입니다.
  const goNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % selectAnimalsArray.length);
  };

  // 인덱스를 감소시키는 함수입니다.
  const goPrev = () => {
    setCurrentIndex(
      prevIndex =>
        (prevIndex - 1 + selectAnimalsArray.length) % selectAnimalsArray.length,
    );
  };

  // 현재 보여줄 동물 객체입니다.
  const currentAnimal = selectAnimalsArray[currentIndex];

  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/pickPloggingFriend_image.png')}
      resizeMode="cover">
      {currentAnimal !== undefined && (
        <View style={styles.container}>
          <View style={styles.body1}>
            <FastImage
              style={styles.FriendDetail_Image}
              source={{uri: currentAnimal.fileUrl}}
            />
            <AppText style={styles.animalName}>
              {currentAnimal.userAnimalName}
            </AppText>
            <View style={styles.viewAnimalDescription}>
              <Text style={styles.animalDescription}>
                {currentAnimal.description}
              </Text>
            </View>
          </View>
          <View style={styles.body2}>
            <View style={styles.bodyContainer1}>
              <View style={styles.active}>
                <AppText style={styles.title}>처음만난날</AppText>
                <View style={styles.Together}>
                  <AppText style={styles.title2}>
                    {currentAnimal.createTime}
                  </AppText>
                </View>
              </View>
              <View style={styles.active}>
                <AppText style={styles.title}>같이 주운 쓰레기</AppText>
                <View style={styles.Together}>
                  <AppText style={styles.title2}>
                    {currentAnimal.trashTogether}개
                  </AppText>
                </View>
              </View>
            </View>
            <View style={styles.bodyContainer1}>
              <View style={styles.active}>
                <AppText style={styles.title}>함께 산책한 시간</AppText>
                <View style={styles.Together}>
                  <AppText style={styles.title2}>
                    {currentAnimal.hour}시 {currentAnimal.minute}분
                    {currentAnimal.second}초
                  </AppText>
                </View>
              </View>
              <View style={styles.active}>
                <AppText style={styles.title}>함께 걸은 거리</AppText>
                <View style={styles.Together}>
                  <AppText style={styles.title2}>
                    {currentAnimal.lengthTogether}km
                  </AppText>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.switchButtons}>
            <TouchableOpacity onPress={goPrev}>
              <Image style={styles.arrow} source={require('@/assets/mainpage_image/left_arrow.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={goNext}>
            <Image style={styles.arrow} source={require('@/assets/mainpage_image/right_arrow.png')}/>
            </TouchableOpacity>
          </View>
          <AppButton
            children="산책하러가자GO"
            variant="gotoisland"
            // onPress={() => console.log(currentAnimal.animalId, currentAnimal.fileUrl, "얘가 지원이한테 전달할 값")}
            onPress={() =>
              navigation.navigate({
                name: 'Plogging',
                params: {
                  shouldOpenModal: false,
                  selectedAnimalID: currentAnimal.animalId,
                  selectedAnimalIMG: currentAnimal.fileUrl,
                },
              })
            }
          />
        </View>
      )}
    </ImageBackground>
  );
}
