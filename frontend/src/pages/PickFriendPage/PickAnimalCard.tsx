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
      <TouchableOpacity style={styles.card} onPress={onSelect}>
        <Image style={styles.image} source={{ uri: fileUrl }} />
        <AppText style={styles.title}>{animalName}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 10,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    width : 100,
    height : 130,
    margin : 5,
  },
  selectedCard: {
    // 선택 상태일 때의 스타일, 예시로 테두리 추가
    borderWidth: 2,
    borderColor: 'blue',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height : 100,
    width : 100,
  }
});