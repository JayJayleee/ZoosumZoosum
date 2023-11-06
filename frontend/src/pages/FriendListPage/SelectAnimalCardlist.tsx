import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import SelectAnimalCard from './SelectAnimalCard';
import styles from './style';
import {fetchMySelectAnimalInfo} from '@/apis/selectAnimal';
import {useQuery} from '@tanstack/react-query';


type ApiResponse = {
  data: Animal[];
};

type Animal = {
  animalId: number;
  userAnimalName: string;
  description :string;
  createTime : string;
  trashTogether : number;
  hour : number;
  minute : number;
  second : number;
  lengthTogether : number;
  fileUrl: string;
};

interface AnimalCardListProps {
  navigation: (data: number) => void;
}


export default function SelectAnimalCardlist( {navigation} : AnimalCardListProps ) {
  const [selectAnimalsArray, setSelectAnimalsArray] = useState<Animal[]>([]);

  useQuery(['selectAnimal'], fetchMySelectAnimalInfo, {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;
      setSelectAnimalsArray(data)
      
    },

    onError: error => {
      console.error('돌발돌발', error);
    },
  });
  return (
    <View>
      <FlatList
        horizontal={false} // 수직으로 정렬
        numColumns={5} // 한 줄에 표시할 카드 수 설정
        data={selectAnimalsArray}
        keyExtractor={(item) => item.animalId.toString()}
        renderItem={({ item }) => (
          <SelectAnimalCard animalId={item.animalId} userAnimalName={item.userAnimalName} fileUrl={item.fileUrl} navigation={navigation} />
        )}
      />
    </View>
  );
};


