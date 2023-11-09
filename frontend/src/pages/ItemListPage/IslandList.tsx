import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import ItemCard from './ItemCard';
import {fetchMyItemListInfo} from '@/apis/Item';
import {useQuery} from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';

interface IslandListProps {
  goToSelectIsland : (data: number) => void;
}

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


const targetNumColumns = 3; // 원하는 열의 수

export default function IslandList({goToSelectIsland} : IslandListProps) {
  
  const [ItemArray, setItemArray] = useState<Item[]>([]);
  const [numColumns, setNumColumns] = useState<number>(targetNumColumns);
  const itemType = "ISLAND"
  const [selectedIslandImgURI, setSelectedIslandImgURI] = useState('');
  const [selectedIslandTitle, setSelectedIslandTitle] = useState('');
  const [selectedIslandItemId, setselectedIslandItemId] = useState(0);

  const {refetch} = useQuery(['ItemList'], 
  () => fetchMyItemListInfo(itemType), {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;

      const selectedIsland = data.find(item => item.selected);
      if (selectedIsland) {
        setSelectedIslandImgURI(selectedIsland.fileUrl)
        setSelectedIslandTitle(selectedIsland.itemName)
        setselectedIslandItemId(selectedIsland.itemId)
      }
      
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

  if (!ItemArray.length) return <Text>로딩...</Text>;

  return (
    <View style={styles.itemList}>
      <View style={styles.headItem}>
        <AppText style={styles.headItemTitle}>내가 선택한 섬</AppText>
      </View>
      <View style={styles.bodyItem}>
        <View style={styles.ItemCardSelect}>
          <View style={styles.ItemCardSelectImgage}>
           <Image style={styles.islandCard_image} source={{uri : selectedIslandImgURI }} />
          </View>
          <AppText style={styles.islandCard_title}>{selectedIslandTitle}</AppText>
        </View>
        <AppButton
        children='섬 선택하기'
        variant='pickfriend'
        onPress={() => goToSelectIsland(selectedIslandItemId)}/>
      </View>
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
              />
            );
          }}
        />
      </View>
      
    </View>

  )
}