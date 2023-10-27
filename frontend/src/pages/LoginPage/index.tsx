import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { LoginScreenProps } from '@/types/path';

export default function LoginPage({navigation}: LoginScreenProps) {
  return (
  <TouchableOpacity 
    onPress={() => navigation.navigate('Main')}>
    <View>
      <Image 
        source={require('../../assets/zooisland_logo.png')}
      />
    </View>
  </TouchableOpacity>
  );
}
