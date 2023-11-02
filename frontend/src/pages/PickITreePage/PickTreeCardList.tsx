import React from 'react';
import { View, FlatList } from 'react-native';
import PickTreeCard from './PickTreeCard';
import styles from './style';

interface DataItem {
  id : string,
  title : string,
  imgURI : string,
}

const data: DataItem[] = [
  { id: '1', title: '그냥나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_01.png' },
  { id: '2', title: '사탕나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_02.png' },
  { id: '3', title: '삼지창나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_03.png' },
  { id: '4', title: '아낌없이주는나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_04.png' },
  { id: '5', title: '삼형제나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_05.png' },
  { id: '6', title: '토끼선인장나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_06.png' },
  { id: '7', title: '방울나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_07.png' },
  { id: '8', title: '진짜선인장나무', imgURI: 'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_08.png' },

];
const targetNumColumns = 3; // 원하는 열의 수

export default function PickTreeCardCardlist() {
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
            <PickTreeCard
              id={item.id}
              title={item.title}
              imgurl={item.imgURI}
            />
          );
        }}
      />
    </View>
  );
};


