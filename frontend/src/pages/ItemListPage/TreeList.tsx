import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import ItemCard from './ItemCard';
import {fetchMyItemListInfo} from '@/apis/Item';
import {useQuery} from '@tanstack/react-query';

interface IslandListProps {
  goToSelectTree : (data: number) => void;
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

export default function TreeList({goToSelectTree} : IslandListProps) {
  
  const [ItemArray, setItemArray] = useState<Item[]>([]);
  const [numColumns, setNumColumns] = useState<number>(targetNumColumns);
  const itemType = "TREE"
  const [selectedTreeImgURI, setSelectedTreeImgURI] = useState('');
  const [selectedTreeTitle, setSelectedTreeTitle] = useState('');
  const [selectedTreeItemId, setselectedTreeItemId] = useState(0);

  useQuery(['ItemList'], 
  () => fetchMyItemListInfo(itemType), {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;

      const selectedIsland = data.find(item => item.selected);
      if (selectedIsland) {
        setSelectedTreeImgURI(selectedIsland.fileUrl)
        setSelectedTreeTitle(selectedIsland.itemName)
        setselectedTreeItemId(selectedIsland.itemId)
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

  if (!ItemArray.length) return <Text>로딩...</Text>;

  return (
    <View style={styles.itemList}>
      <View style={styles.headItem}>
        <AppText style={styles.headItemTitle}>내가 선택한 나무</AppText>
      </View>
      <View style={styles.bodyItem}>
        <View style={styles.ItemCardSelect}>
          <View style={styles.ItemCardSelectImgage}>
           <Image style={styles.treeCard_image} source={{uri : selectedTreeImgURI }} />
          </View>
          <AppText style={styles.treeCard_title}>{selectedTreeTitle}</AppText>
        </View>
        <AppButton
        children='나무 선택하기'
        variant='pickfriend'
        onPress={() => goToSelectTree(selectedTreeItemId)}/>
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