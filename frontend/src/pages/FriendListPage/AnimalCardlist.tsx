import React from 'react';
import {View, FlatList, Text} from 'react-native';
import AnimalCard from './AnimalCard';
import styles from './style';
import {fetchMyAnimalListInfo} from '@/apis/animal';
import {useQuery} from '@tanstack/react-query';

type Animal = {
  animalId: number;
  animalName: string;
  fileUrl: string;
  selected: boolean;
};
type AnimalList = {
  data : Animal[];
}

interface AnimalCardListProps {
  navigation: (data: number) => void;
}

const targetNumColumns = 3; // 원하는 열의 수

export default function AnimalCardlist( {navigation} : AnimalCardListProps) {
  const {data, isLoading, isError, error} = useQuery<AnimalList>({
    queryKey: ['animalListKey'],
    queryFn: fetchMyAnimalListInfo,
  });

  if (isLoading) return <Text>로딩...</Text>;
  if (isError) return <Text>에러: {error?.message}</Text>;

  const animalsArray: Animal[] = data?.data || [];

  const totalCards = animalsArray.length;
  const numColumns = Math.min(
    targetNumColumns,
    Math.ceil(totalCards / targetNumColumns),
  );
  const missingCards = numColumns - (totalCards % numColumns);

  // 타겟 열 수와 다르다면 hidden card 만드는 예외처리
  if (missingCards !== targetNumColumns) {
    for (let i = 0; i < missingCards; i++) {
      animalsArray.push({
        animalId: i,
        animalName: '',
        fileUrl: '',
        selected: false,
      });
    }
  }

  return (
    <View>
      <FlatList
        key={numColumns}
        horizontal={false} // 수직으로 정렬
        numColumns={numColumns} // 한 줄에 표시할 카드 수 설정
        data={animalsArray}
        keyExtractor={item => item.animalId.toString()}
        renderItem={({item}) => {
          if (!item.animalName) {
            return <View style={styles.hiddenCard} />;
          }
          return (
            <AnimalCard
              animalId={item.animalId}
              animalName={item.animalName}
              fileUrl={item.fileUrl}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
}
