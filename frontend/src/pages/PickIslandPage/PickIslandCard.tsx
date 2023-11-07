import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { fetchSelectMyIsland } from '@/apis/Item';



interface PickIslandCardProps {
  itemId: number;
  itemName: string;
  fileUrl: string;
  navigation: () => void;
}

export default function PickIslandCard({itemName,fileUrl,itemId,navigation}: PickIslandCardProps) {
  const queryClient = useQueryClient();
  const apiId = "ISLAND"
  const updateMutation = useMutation(() => fetchSelectMyIsland(itemId), {
    // PUT 요청이 성공한 경우의 로직
    onSuccess: () => {
      // 성공 시 할 작업을 여기에 추가합니다.
      console.log('변경 성공');
       queryClient.invalidateQueries(["ItemList", apiId])
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
    updateMutation.mutate();
  };

  return (
    <View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.card2} onPress={handleCompleteSelection}>
          <Image style={styles.image} source={{ uri: fileUrl }} resizeMode="contain" />
          <Text style={styles.title} numberOfLines={1}>{itemName}</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 130,
    margin: 5,
  },
  card2: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: 80,
    width: 100,
  },
});
