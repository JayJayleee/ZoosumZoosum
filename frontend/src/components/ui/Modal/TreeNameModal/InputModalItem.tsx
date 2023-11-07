import React from 'react';
import {View, Image, TextInput} from 'react-native';
import AppText from '../../Text';
import {TreeCarouselCardItemProps} from '@/types/plogging';

export function InputModalItem({item, index}: TreeCarouselCardItemProps) {
  return (
    <View
      key={index}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
      }}>
      {item?.image && (
        <Image
          source={item.image}
          style={{height: '30%', aspectRatio: 1, borderRadius: 10}}
        />
      )}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '70%',
          width: '70%',
          marginTop: '10%',
        }}>
        <View>
          <AppText style={{marginLeft: 10, marginBottom: 5}}>나의 이름</AppText>
          <TextInput
            style={{
              width: '100%',
              height: '35%',
              borderRadius: 10,
              backgroundColor: '#E3E5E5',
              textAlign: 'center',
            }}
            placeholder={'이름을 입력해주세요'}></TextInput>
        </View>

        <View>
          <AppText style={{marginLeft: 10, marginBottom: 5}}>나의 이름</AppText>
          <TextInput
            style={{
              width: '100%',
              height: '35%',
              borderRadius: 10,
              backgroundColor: '#E3E5E5',
              textAlign: 'center',
            }}
            placeholder={'이름을 입력해주세요'}></TextInput>
        </View>

        <View>
          <AppText style={{marginLeft: 10, marginBottom: 5}}>나의 이름</AppText>
          <TextInput
            style={{
              width: '100%',
              height: '35%',
              borderRadius: 10,
              backgroundColor: '#E3E5E5',
              textAlign: 'center',
            }}
            placeholder={'이름을 입력해주세요'}></TextInput>
        </View>

        <View>
          <AppText style={{marginLeft: 10, marginBottom: 5}}>나의 이름</AppText>
          <TextInput
            style={{
              width: '100%',
              height: '35%',
              borderRadius: 10,
              backgroundColor: '#E3E5E5',
              textAlign: 'center',
            }}
            placeholder={'이름을 입력해주세요'}></TextInput>
        </View>
      </View>
    </View>
  );
}
