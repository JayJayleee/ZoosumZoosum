import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import AnimalCard from './AnimalCard';
import styles from './style';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMyAnimalListInfo } from '@/apis/animal';

type Animal = {
  animalId : number,
  animalName : string,
  fileUrl : string,
  selected : boolean,
}

type AnimalList = {
  animalList : Animal[]
}
const targetNumColumns = 3; // 원하는 열의 수

export default function AnimalCardlist() {

  //React-Query 클라이언트 인스턴스 정의
  const queryClient = useQueryClient();
  // 상태 감지를 위한 useState
  const [animals, setanimals] = useState<Animal[]>([]);

  // api 호출
  const { isError: isAnimalListError, error: animallistError } = useQuery<AnimalList, Error>( 
  "AnimalKey", // 고정된 쿼리 키 써주기.
  fetchMyAnimalListInfo, //걍 api 냅다 호출
  {
    onSuccess: (data) => {
      setanimals(data.animalList);
    },
  }
)
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
            <AnimalCard
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


