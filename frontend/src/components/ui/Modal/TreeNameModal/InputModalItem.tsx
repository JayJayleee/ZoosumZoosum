import React from 'react';
import {View, Image, TextInput} from 'react-native';
import AppText from '../../Text';
import {TreeCarouselCardItemProps} from '@/types/plogging';

export function InputModalItem({item, index}: TreeCarouselCardItemProps) {
  console.log(index);
  return (
    <View key={index} style={{flex: 1}}>
      {item?.image && (
        <Image
          source={item.image}
          style={{width: 50, height: 1000, borderRadius: 10}}
        />
      )}
      <AppText style={{marginLeft: 10, height: 40}}>이름</AppText>
      <TextInput style={{width: 50, height: 50, borderRadius: 10}}></TextInput>
      <AppText style={{marginLeft: 10}}>전화번호</AppText>
      <TextInput style={{width: 50, height: 50, borderRadius: 10}}></TextInput>
      <AppText style={{marginLeft: 10}}>나무이름</AppText>
      <TextInput style={{width: 50, height: 50, borderRadius: 10}}></TextInput>
      <AppText style={{marginLeft: 10}}>나무이름</AppText>
      <TextInput style={{width: 50, height: 50, borderRadius: 10}}></TextInput>

      <AppText style={{marginLeft: 10}}>{item?.description}</AppText>
    </View>
  );
}
