import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';

interface AnimalCardProps {
  animalId : number,
  animalName : string,
  fileUrl : string,
  selected : boolean,
  navigation: (data: number) => void;
}

export default function AnimalCard({navigation, animalId, animalName, fileUrl, selected}: AnimalCardProps) {

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card} onPress={() => navigation(animalId)}>
        <View style={styles.circle}>
          <FastImage style={styles.image} source={{uri : fileUrl }} />
        </View>
        <View>
          <Text numberOfLines={1} style={styles.title}>{animalName}</Text>
          {selected == true && 
          <Text>선택중</Text>
          }
        </View>
      </TouchableOpacity>
      

    </View>
  );
};

import { windowHeight, windowWidth } from "@/constants/styles";


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 10,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    width : windowWidth*0.2,
    height : windowHeight*0.17,
    margin : 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height : windowHeight*0.10,
    width : windowWidth*0.25,
  },
  circle: {
    width : windowWidth*0.24,
    height : windowWidth*0.24,
    flex :1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#FFD7D7',
    borderRadius : 100,
  }
});
