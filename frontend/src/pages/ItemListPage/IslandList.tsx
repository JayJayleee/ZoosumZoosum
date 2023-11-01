import React from 'react';
import {View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import AnimalCard from './AnimalCard';

interface IslandListProps {
  goToSelectIsland : () => void;
}

interface DataItem {
  id : string,
  title : string,
  imgURI : string,
}

const data: DataItem[] = [
  { id: '1', title: '송송이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_0.png' },
  { id: '2', title: '불불이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Ox/Ox_0.png' },
  { id: '3', title: '핑구', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Penguin/Penguin_0.png' },
  { id: '4', title: '당당이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pinedeer/Pinedeer_0.png' },
  { id: '5', title: '은빛이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowWeasel/SnowWeasel_0.png' },
  { id: '6', title: '코코', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowOwl/SnowOwl_0.png' },
  { id: '7', title: '뚜이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Buffalo/Buffalo_0.png' },
  { id: '8', title: '삐약이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Chick/Chick_0.png' },
  { id: '9', title: '밀키', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cow/Cow_0.png' },
  { id: '10', title: '동키', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Donkey/Donkey_0.png' },
  { id: '11', title: '꽥꽥이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Duck/Duck_0.png' },
  // { id: '12', title: '토실이', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pig/Pig_0.png' },
];

const targetNumColumns = 3; // 원하는 열의 수

export default function IslandList({goToSelectIsland} : IslandListProps) {
  // 3열 배열을 지정하기 위한 변수 선언
  const totalCards = data.length;
  const numColumns = Math.min(targetNumColumns, Math.ceil(totalCards / targetNumColumns));
  const missingCards = numColumns - (totalCards % numColumns);
  
  // 타겟 열 수와 다르다면 hidden card 만드는 예외처리 
  if (missingCards !== targetNumColumns) {
    for (let i = 0; i < missingCards; i++) {
      data.push({ id: `hidden_${i}`, title: '', imgURI: '' });
    }
  }

  const selectIslandTitle = '주섬주섬'
  const selectIslandImgURI = 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png'
  return (
    <View style={styles.itemList}>
      <View style={styles.headItem}>
        <AppText style={styles.headItemTitle}>내가 선택한 섬</AppText>
      </View>
      <View style={styles.bodyItem}>
        <View style={styles.islandCard}>
            <Image style={styles.islandCard_image} source={{uri : selectIslandImgURI }} />
            <AppText style={styles.islandCard_title}>{selectIslandTitle}</AppText>
        </View>
        <AppButton
        children='섬 선택하기'
        variant='pickfriend'
        onPress={goToSelectIsland}/>
      </View>
      <View style={styles.body2Item}>
        <FlatList
          horizontal={false} // 수직으로 정렬
          numColumns={numColumns} // 한 줄에 표시할 카드 수 설정
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.id.startsWith('hidden_')) {
              return <View style={styles.hiddenCard} />;
            }
            return (
              <AnimalCard
                id={item.id}
                title={item.title}
                imgURI={item.imgURI}
              />
            );
          }}
        />
      </View>
      
    </View>

  )
}