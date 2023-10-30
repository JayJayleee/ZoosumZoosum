import React from 'react';
import { View, FlatList } from 'react-native';
import AnimalCard from './AnimalCard';
import styles from './style';

interface DataItem {
  id : string,
  title : string,
  imgurl : string,
}

const data: DataItem[] = [
  { id: '1', title: '송송이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_0.png' },
  { id: '2', title: '불불이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Ox/Ox_0.png' },
  { id: '3', title: '핑구', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Penguin/Penguin_0.png' },
  { id: '4', title: '당당이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pinedeer/Pinedeer_0.png' },
  { id: '5', title: '은빛이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowWeasel/SnowWeasel_0.png' },
  { id: '6', title: '코코', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowOwl/SnowOwl_0.png' },
  { id: '7', title: '뚜이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Buffalo/Buffalo_0.png' },
  { id: '8', title: '삐약이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Chick/Chick_0.png' },
  { id: '9', title: '밀키', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cow/Cow_0.png' },
  { id: '10', title: '동키', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Donkey/Donkey_0.png' },
  { id: '11', title: '꽥꽥이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Duck/Duck_0.png' },
  { id: '12', title: '토실이', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pig/Pig_0.png' },


  // 다른 카드 항목 추가
];

export default function AnimalCardlist() {
  return (
    <View>
      <FlatList
        style={styles.cardlist}
        horizontal={false} // 수직으로 정렬
        numColumns={3} // 한 줄에 표시할 카드 수 설정
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimalCard id={item.id} title={item.title} imgurl={item.imgurl} />
        )}
      />
    </View>
  );
};


