import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';

interface PickAnimalCardProps {
  animalId: number;
  animalName: string;
  fileUrl: string;
  isSelected: boolean; // 선택 상태를 나타내는 prop
  onSelect: () => void; // 카드 선택 핸들러 prop
}

export default function PickAnimalCard({animalName, fileUrl, animalId, isSelected, onSelect,}: PickAnimalCardProps) {
  return (
    <View style={[styles.card, isSelected && styles.selectedCard]}>
      {/* TouchableOpacity에 onSelect 함수를 연결 */}
      <TouchableOpacity style={styles.card2} onPress={onSelect}>
        <Image style={styles.image} source={{ uri: fileUrl }} />
        <AppText style={styles.title}>{animalName}</AppText>
      </TouchableOpacity>
    </View>
  );
};

import { windowHeight, windowWidth } from "@/constants/styles";

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 10,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    width : windowWidth*0.5,
    height : windowHeight*0.17,
    margin : 5,
  },
  card2 : {
    justifyContent : 'center',
    alignItems : 'center',
  },
  selectedCard: {
    // 선택 상태일 때의 스타일, 예시로 테두리 추가
    borderWidth: 3,
    borderColor: '#34D399',
    // margin : 5,
    // padding : 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height : windowHeight*0.13,
    width : windowHeight*0.13,
  }
});