import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';

interface PickAnimalCardProps {
  animalId: number;
  animalName: string;
  fileUrl: string;
  isSelected: boolean; // 선택 상태를 나타내는 prop
  onSelect: () => void; // 카드 선택 핸들러 prop
}

export default function PickAnimalCard({
  animalName,
  fileUrl,
  animalId,
  isSelected,
  onSelect,
}: PickAnimalCardProps) {
  return (
    <View style={[styles.card, isSelected && styles.selectedCard]}>
      {/* TouchableOpacity에 onSelect 함수를 연결 */}
      <TouchableOpacity style={styles.card2} onPress={onSelect}>
        {isSelected && (
          <Image
            style={styles.checkIcon}
            source={require('@/assets/check.png')} // 체크 표시 이미지 경로
          />
        )}
        <Image style={styles.image} source={{uri: fileUrl}} />
        <AppText style={styles.title}>{animalName}</AppText>
      </TouchableOpacity>
    </View>
  );
}

import {windowHeight, windowWidth} from '@/constants/styles';
import { ImageBackground } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.1,
    height: windowHeight * 0.17,
    margin: 5,
  },
  card2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  selectedCard: {
    backgroundColor: '#646567',
  },
  title: {
    fontSize: 18,
    fontFamily: 'NPSfont_bold',
  },
  image: {
    height: windowHeight * 0.1,
    width: windowHeight * 0.1,
  },
  checkIcon: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    // backgroundColor : 'red',
    zIndex: 99,
  },
});
