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

const targetNumColumns = 3; // 원하는 열의 수

export default function AnimalCardlist() {
  const {data, isLoading, isError, error} = useQuery<Animal[]>({
    queryKey: ['animalList'],
    queryFn: fetchMyAnimalListInfo,
  });

  if (isLoading) return <Text>로딩...</Text>;
  if (isError) return <Text>에러: {error?.message}</Text>;

  const animalsArray: Animal[] = data as Animal[];

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
              id={item.animalId.toString()}
              title={item.animalName}
              imgurl={item.fileUrl}
            />
          );
        }}
      />
    </View>
  );
}
