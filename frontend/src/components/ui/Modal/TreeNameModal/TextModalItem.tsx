import React from 'react';
import {View, Image, TextInput} from 'react-native';
import AppText from '../../Text';
import {TreeCarouselCardItemProps} from '@/types/plogging';

export function TextModalItem({item, index}: TreeCarouselCardItemProps) {
  console.log(index);
  return (
    <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
      {item?.image && (
        <Image
          source={item.image}
          style={{width: 50, height: 50, borderRadius: 10}}
        />
      )}
      <TextInput></TextInput>
      <AppText style={{marginLeft: 10}}>{item?.description}</AppText>
    </View>
  );
}
