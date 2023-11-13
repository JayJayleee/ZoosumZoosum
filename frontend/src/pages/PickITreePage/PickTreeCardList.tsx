import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import PickTreeCard from './PickTreeCard';
import styles from './style';
import { useQuery } from '@tanstack/react-query';
import { fetchMyItemListInfo } from '@/apis/Item';

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

interface PickTreeCardListProps {
  navigation: () => void;
}

export default function PickTreeCardlist({navigation} : PickTreeCardListProps) {
  const [ItemArray, setItemArray] = useState<Item[]>();
  const itemType = 'TREE';

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

  if (!ItemArray?.length) return <Text style={styles.isloading}>로딩...</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.pickTreeCardList}>
        <FlatList
          horizontal={false} // 수직으로 정렬
          numColumns={3}
          data={ItemArray}
          keyExtractor={(item) => item.itemId.toString()}
          renderItem={({ item }) => {
            if (!item.itemName) {
              return <View style={styles.hiddenCard} />;
            }
            return (
              <PickTreeCard
                itemId={item.itemId}
                itemName={item.itemName}
                fileUrl={item.fileUrl}
                navigation={navigation}
              />
            );
          }}
        />
      </View>  
    </View>
  );
};


