import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';
export default function IslandList() {
  return (
    <View style={styles.itemList}>
      <View style={styles.headItem}>
        <AppText>
          섬에 나와있는 동물들
        </AppText>
      </View>
      <View style={styles.bodyItem}>

      </View>
      
      <View style={styles.body2Item}>

      </View>
      
    </View>

  )
}