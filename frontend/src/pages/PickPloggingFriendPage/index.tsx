import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { PickPloggingFriendscreenProps } from '@/types/path';

export default function PickPloggingFriendPage({navigation}: PickPloggingFriendscreenProps) {
  return (
    <View>
      <Text>여기는 산책나갈 친구를 고르는 페이지입니다.</Text>
      <Button 
        title="같이 산책 떠나기"
        onPress={() =>
          navigation.navigate({
            name: 'Plogging',
            params: {shouldOpenModal: false},
          })
        }
      />
    </View>
  )
}
