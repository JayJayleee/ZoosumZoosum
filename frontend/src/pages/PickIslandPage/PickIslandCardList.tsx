import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import PickIslandCard from './PickIslandCard';
import styles from './style';
import { fetchMyItemListInfo } from '@/apis/Item';
import { useQuery } from '@tanstack/react-query';

type ApiResponse = {
  data: Item[];
};

type Item = {
  itemId: number;
  itemName: string;
  itemType: string;
  fileUrl: string;
  selected: boolean;
};

interface PickIslandCardListProps {
  navigation: () => void;
}

export default function PickIslandCardList({navigation} : PickIslandCardListProps) {
  const [ItemArray, setItemArray] = useState<Item[]>();
  const itemType = 'ISLAND';

  useQuery(['ItemList'], () => fetchMyItemListInfo(itemType), {
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
            itemId: i + processedData.length,
            itemName: '',
            itemType: '',
            fileUrl: '',
            selected: false,
          });
        }
      }
      setItemArray(processedData);
    },

    onError: (error) => {
      console.error('돌발돌발', error);
    },
  });

  if (!ItemArray?.length) return <Text>로딩...</Text>;

  return (
    <View>
      <FlatList
        horizontal={false}
        numColumns={3}
        data={ItemArray}
        keyExtractor={(item) => item.itemId.toString()}
        renderItem={({ item }) => {
          if (!item.itemName) {
            return <View style={styles.hiddenCard} />;
          }
          return (
            <PickIslandCard
              itemId={item.itemId}
              itemName={item.itemName}
              fileUrl={item.fileUrl}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
}
