import React, {useState} from 'react';
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

interface AnimalCardListProps {
  navigation: (data: number) => void;
}

type ApiResponse = {
  data: Animal[];
};

const targetNumColumns = 3;

export default function AnimalCardlist({navigation}: AnimalCardListProps) {
  const [animalsArray, setAnimalsArray] = useState<Animal[]>([]);
  const [numColumns, setNumColumns] = useState<number>(targetNumColumns);

  useQuery(['animalList'], fetchMyAnimalListInfo, {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;

      const totalCards = data.length;
      const calculatedNumColumns = Math.min(
        targetNumColumns,
        Math.ceil(totalCards / targetNumColumns),
      );
      setNumColumns(calculatedNumColumns);

      const missingCards =
        calculatedNumColumns - (totalCards % calculatedNumColumns);

      if (!Array.isArray(data)) {
        console.error('Data는 배열이 아닙니다:', data);
        return;
      }
      let processedData = [...data];

      if (missingCards !== targetNumColumns) {
        for (let i = 0; i < missingCards; i++) {
          processedData.push({
            animalId: i,
            animalName: '',
            fileUrl: '',
            selected: false,
          });
        }
      }
      setAnimalsArray(processedData);
    },

    onError: error => {
      console.error('돌발돌발', error);
    },
  });

  if (!animalsArray.length) return <Text>로딩...</Text>;

  return (
    <View>
      <FlatList
        horizontal={false}
        numColumns={3}
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
