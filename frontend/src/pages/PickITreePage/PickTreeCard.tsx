import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { fetchSelectMyTree } from '@/apis/Item';


interface PickTreeCardProps {
  itemId: number;
  itemName: string;
  fileUrl: string;
  navigation: () => void;
}

export default function PickTreeCard({itemName,fileUrl,itemId,navigation}: PickTreeCardProps) {
  const queryClient = useQueryClient();
  const apiId = "TREE"
  const updateMutation = useMutation(() => fetchSelectMyTree(itemId), {
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
          <View style={styles.circle}>
            <Image style={styles.image} source={{uri : fileUrl }} />
            <Text style={styles.title} numberOfLines={1}>{itemName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import { windowHeight, windowWidth } from "@/constants/styles";

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 10,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    width : windowWidth*0.25,
    height : windowHeight*0.17,
    margin : 5,
  },
  card2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    // marginTop : 20,
    height : '70%',
    width : '100%',
    resizeMode : 'cover',
  },
  circle: {
    width : windowWidth*0.26,
    height : windowWidth*0.2,
    paddingTop : 20,
    flex :1,
    justifyContent : 'center',
    alignItems : 'center',
  }

});