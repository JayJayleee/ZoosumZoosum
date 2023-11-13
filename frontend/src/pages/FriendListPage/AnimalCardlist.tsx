import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import AnimalCard from './AnimalCard';
import styles from './style';
import {fetchMyAnimalListInfo} from '@/apis/animal';
import {useQuery} from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';

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

export default function AnimalCardlist({navigation}: AnimalCardListProps) {
  const [animalsArray, setAnimalsArray] = useState<Animal[]>([]);
  
  const {refetch} = useQuery(['animalList'], fetchMyAnimalListInfo, {
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
      setAnimalsArray(processedData);
    },

    onError: error => {
      console.error('돌발돌발', error);
    },
  });
  useFocusEffect(useCallback(() => {refetch()}, []))

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
              selected={item.selected}
            />
          );
        }}
      />
    </View>
  );
}
