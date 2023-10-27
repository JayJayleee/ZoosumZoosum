import React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {MainScreenProps} from 'typePath';

export default function MainPage({navigation}: MainScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>여기는 Main Page 입니다.</Text>
      <Button
        title="Go to Plogging"
        onPress={() =>
          navigation.navigate({
            name: 'Plogging',
            params: {shouldOpenModal: false},
          })
        }
      />
    </View>
  );
}
