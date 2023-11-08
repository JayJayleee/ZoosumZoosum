import React from 'react';
import {View, Image, TextInput} from 'react-native';
import AppText from '../../Text';
import {TreeCarouselCardItemProps} from '@/types/plogging';

export function TextModalItem({item, index}: TreeCarouselCardItemProps) {
  return (
    <View
      key={index}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        // flex: 1,
      }}>
      {item?.image && (
        <Image
          source={item.image}
          style={{height: '60%', aspectRatio: 1, borderRadius: 10}}
        />
      )}
      <AppText
        style={{
          marginTop: 30,
          marginLeft: 10,
          fontSize: 30,
          fontFamily: 'NPSfont_bold',
          textAlign: 'center',
        }}>
        {item?.description}
      </AppText>
    </View>
  );
}
