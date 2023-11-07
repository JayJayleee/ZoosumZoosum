import React, { useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import PickAnimalCard from './PickAnimalCard';
import styles from './style';
import { fetchMyAnimalListInfo } from '@/apis/animal';
import { useQuery } from '@tanstack/react-query';
import AppButton from '@/components/ui/Button';

type ApiResponse = {
  data: Animal[];
};

type Animal = {
  animalId: number;
  animalName: string;
  fileUrl: string;
  selected: boolean;
};

interface PickFriendPageProps {
  navigation: () => void;
}

export default function PickAnimalCardlist({navigation} : PickFriendPageProps) {
  const [animalArray, setAnimalArray] = useState<Animal[]>();

  useQuery(['FriendList'], fetchMyAnimalListInfo, {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;

      if (!Array.isArray(data)) {
        console.error('Data는 배열이 아닙니다:', data);
        return;
      }
      let processedData = [...data];

      const numColumns = 3;

      const remainingCards = numColumns - (processedData.length % numColumns);

      if (remainingCards > 0) {
        for (let i = 0; i < remainingCards; i++) {
          processedData.push({
            animalId: i + processedData.length,
            animalName: '',
            fileUrl: '',
            selected: false,
          });
        }
      }
      setAnimalArray(processedData);
    },

    onError: (error) => {
      console.error('돌발돌발', error);
    },
  });

  // 선택된 동물의 ID를 저장할 상태를 추가
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 카드 선택/해제 핸들러
  const handleSelectCard = (animalId: number) => {
    setSelectedIds((currentSelectedIds) => {
      if (currentSelectedIds.includes(animalId)) {
        // 이미 선택된 경우, 선택 해제
        return currentSelectedIds.filter((id) => id !== animalId);
      } else {
        // 선택되지 않은 경우, 선택 배열에 추가
        return [...currentSelectedIds, animalId];
      }
    });
  };

  if (!animalArray?.length) return <Text>로딩...</Text>;
  return (
    <View style={styles.pickAnimalCardList}>
      <FlatList
        horizontal={false} // 수직으로 정렬
        numColumns={3} // 한 줄에 표시할 카드 수 설정
        data={animalArray}
        keyExtractor={(item) => item.animalId.toString()}
        renderItem={({ item }) => {
          if (!item.animalName) {
            return <View style={styles.hiddenCard} />;
          }
          return (
            <PickAnimalCard
              animalId={item.animalId}
              animalName={item.animalName}
              fileUrl={item.fileUrl}
              // 클릭 상태를 전달 (선택된 상태면 true, 아니면 false)
              isSelected={selectedIds.includes(item.animalId)}
              // 클릭 이벤트 핸들러를 props로 전달
              onSelect={() => handleSelectCard(item.animalId)}
            />
          );
        }}
      />
      <AppButton
        variant='gotoisland'
        children='선택완료'
        onPress={() => {
          // selectedIds 배열 길이에 따라 조건 분기
          if (selectedIds.length > 5) {
            Alert.alert('경고', '5개 이하로 선택해주세요');
          } else if (selectedIds.length === 0) {
            Alert.alert('경고', '선택하지 않으면 섬으로 보낼 수 없습니다');
          } else {
            console.log('선택된 아이디들:', selectedIds);
            // 다른 처리를 여기에 추가할 수 있습니다.
          }
        }}
        />
    </View>
    
  );
};
