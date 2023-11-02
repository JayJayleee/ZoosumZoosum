import React from 'react';
import { View, FlatList } from 'react-native';
import PickIslandCard from './PickIslandCard';
import styles from './style';

interface DataItem {
  id : string,
  title : string,
  imgurl : string,
}

const data: DataItem[] = [
  { id: '1', title: '주섬주섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png' },
  { id: '2', title: '등대섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_1.png' },
  { id: '3', title: '사막섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_2.png' },
  { id: '4', title: '빙하섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_3.png' },
  { id: '5', title: '분홍섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_4.png' },
  { id: '6', title: '바위섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_5.png' },
  { id: '7', title: '해변섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_6.png' },
  { id: '8', title: '오두막섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_7.png' },
  { id: '9', title: '별장섬', imgurl: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_8.png' },
  // 다른 카드 항목 추가
];
const targetNumColumns = 3; // 원하는 열의 수

export default function PickIslandCardlist() {
  // 3열 배열을 지정하기 위한 변수 선언
  const totalCards = data.length;
  const numColumns = Math.min(targetNumColumns, Math.ceil(totalCards / targetNumColumns));
  const missingCards = numColumns - (totalCards % numColumns);
  
  // 타겟 열 수와 다르다면 hidden card 만드는 예외처리 
  if (missingCards !== targetNumColumns) {
    for (let i = 0; i < missingCards; i++) {
      data.push({ id: `hidden_${i}`, title: '', imgurl: '' });
    }
  }
  return (
    <View>
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
            <PickIslandCard
              id={item.id}
              title={item.title}
              imgurl={item.imgurl}
            />
          );
        }}
      />
    </View>
  );
};


