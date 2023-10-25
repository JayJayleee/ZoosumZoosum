import React from 'react';
import {Button, View, Text} from 'react-native';
import {MainScreenProps} from '../../types/path';

export default function MainPage({navigation}: MainScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>일단은 메인입니당</Text>
      <Button
        title="Go to Plogging"
        onPress={() => navigation.navigate('Plogging')}
      />
    </View>
  );
}
