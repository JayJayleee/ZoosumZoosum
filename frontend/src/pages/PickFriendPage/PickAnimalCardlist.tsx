import React, { useState } from 'react';
import { View, FlatList, Text} from 'react-native';
import PickAnimalCard from './PickAnimalCard';
import styles from './style';
import { fetchMyAnimalListInfo, fetchSelectMyFriend } from '@/apis/animal';
import { useQuery } from '@tanstack/react-query';
import AppButton from '@/components/ui/Button';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/constants/toastConfig';

type ApiResponse = {
  data: Animal[];
};

type Animal = {
  animalId: number;
  animalName: string;
  fileUrl: string;
  selected: boolean;
};

interface PickFriendPageProps {
  navigation: () => void;
}

const targetNumColumns = 3;

export default function PickAnimalCardlist({navigation} : PickFriendPageProps) {
  const [animalArray, setAnimalArray] = useState<Animal[]>();
  const [numColumns, setNumColumns] = useState<number>(targetNumColumns);


  useQuery(['FriendList'], fetchMyAnimalListInfo, {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;

      const totalCards = data.length;
      const calculatedNumColumns = Math.min(
        targetNumColumns,
        Math.ceil(totalCards / targetNumColumns),
      );
      setNumColumns(calculatedNumColumns);

      const missingCards =
        calculatedNumColumns - (totalCards % calculatedNumColumns);

      if (!Array.isArray(data)) {
        console.error('Data는 배열이 아닙니다:', data);
        return;
      }
      let processedData = [...data];

      if (missingCards !== targetNumColumns) {
        for (let i = 0; i < missingCards; i++) {
          processedData.push({
            animalId: i,
            animalName: '',
            fileUrl: '',
            selected: false,
          });
        }
      }
      setAnimalArray(processedData);
    },

    onError: (error) => {
      console.error('돌발돌발', error);
    },
  });

  // 선택된 동물의 ID를 저장할 상태를 추가
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 카드 선택/해제 핸들러
  const handleSelectCard = (animalId: number) => {
    setSelectedIds((currentSelectedIds) => {
      if (currentSelectedIds.includes(animalId)) {
        // 이미 선택된 경우, 선택 해제
        return currentSelectedIds.filter((id) => id !== animalId);
      } else {
        // 선택되지 않은 경우, 선택 배열에 추가
        return [...currentSelectedIds, animalId];
      }
    });
  };

  const queryClient = useQueryClient();
  const updateMutation = useMutation(fetchSelectMyFriend, {
    // PUT 요청이 성공한 경우의 로직
    onSuccess: () => {
      // 성공 시 할 작업을 여기에 추가합니다.
      console.log('변경 성공');
      queryClient.invalidateQueries(["selectAnimal"])
      navigation();
    },
    // PUT 요청이 실패한 경우의 로직
    onError: (error) => {
      // 실패 시 할 작업을 여기에 추가합니다.
      console.error('변경 실패 ㅠ', error);
    },
  });

  const handleCompleteSelection = () => {
    // updateMutation 함수를 호출하여 PUT 요청 실행
    updateMutation.mutate(selectedIds);
  };

  if (!animalArray?.length) return <Text>로딩...</Text>;

  const showToast = (text:string) => {
    Toast.show({
      type: 'notSelect',
      text1: text,
    })
  }
  return (
    <>
    <Toast config={toastConfig}/>
    <View style={styles.container}>
      <View style={styles.pickAnimalCardList}>
        <FlatList
          horizontal={false} // 수직으로 정렬
          numColumns={3} // 한 줄에 표시할 카드 수 설정
          data={animalArray}
          keyExtractor={(item) => item.animalId.toString()}
          renderItem={({ item }) => {
            if (!item.animalName) {
              return <View style={styles.hiddenCard} />;
            }
            return (
              <PickAnimalCard
                animalId={item.animalId}
                animalName={item.animalName}
                fileUrl={item.fileUrl}
                // 클릭 상태를 전달 (선택된 상태면 true, 아니면 false)
                isSelected={selectedIds.includes(item.animalId)}
                // 클릭 이벤트 핸들러를 props로 전달
                onSelect={() => handleSelectCard(item.animalId)}
              />
            );
          }}
        />
      </View>
      <AppButton
          variant='gotoisland3'
          children='선택완료'
          onPress={() => {
            // selectedIds 배열 길이에 따라 조건 분기
            if (selectedIds.length > 5) {
              showToast('다섯 마리 이하로 선택해주세요');
            } else if (selectedIds.length === 0) {
              showToast('한 마리 이상 선택해주세요');
            } else {
              console.log('선택된 아이디들:', selectedIds);
              handleCompleteSelection()
            }
          }}
          />
    </View>
    </>
  );
};
