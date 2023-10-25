import React from 'react';
import {Button, View, Text} from 'react-native';
import {CameracreenProps} from '../../types/path';

export default function CameraPage({navigation}: CameracreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>카메라 구현</Text>
    </View>
  );
}
