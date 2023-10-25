import React from 'react';
import {Button, View, Text} from 'react-native';
import {PloggingScreenProps} from '../../types/path';

export default function PloggingPage({navigation}: PloggingScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>여기는 플로깅</Text>
      <Button
        title="Go to Plogging"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
}
