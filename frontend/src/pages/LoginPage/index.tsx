import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { LoginScreenProps } from '@/types/path';
import styles from './style';

export default function LoginPage({navigation}: LoginScreenProps) {
  return (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate('Main')}>
    <View>
      <Image 
        source={require('../../assets/zooisland_logo.png')}
      />
    </View>
  </TouchableOpacity>
  );
}
