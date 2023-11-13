import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import ItemCard from './ItemCard';
import {fetchMyItemListInfo} from '@/apis/Item';
import {useQuery} from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Wave } from '@/components/ui/animation/LottieEffect';

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

export default function IslandList() {
  
  const [ItemArray, setItemArray] = useState<Item[]>([]);
  const itemType = "ISLAND"
 

  const {refetch} = useQuery(['ItemList'], 
  () => fetchMyItemListInfo(itemType), {
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

    onError: error => {
      console.error('돌발돌발', error);
    },
  });

  useFocusEffect(useCallback(() => {refetch()}, []))

  if (!ItemArray.length) return (
    <View style={styles.isLoading}>
      <FastImage source={require('@/assets/loginpage_image/zooisland_logo.png')} />
      <Wave />
      <AppText style={styles.isLoading}>잠시 기다려 주세요!</AppText>
    </View>
  )

  return (
    <View style={styles.itemList}>
      <View style={styles.body2Item}>
        <FlatList
          horizontal={false} // 수직으로 정렬
          numColumns={3} // 한 줄에 표시할 카드 수 설정
          data={ItemArray}
          keyExtractor={item => item.itemId.toString()}
          renderItem={({ item }) => {
            if (!item.itemName) {
              return <View style={styles.hiddenCard} />;
            }
            return (
              <ItemCard
                itemId={item.itemId}
                itemName={item.itemName}
                fileUrl={item.fileUrl}
                selected={item.selected}
                itemType={item.itemType}
              />
            );
          }}
        />
      </View>
      
    </View>

  )
}