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
        {selected == true &&
        <FastImage
        source={require('@/assets/tagging.png')}
        style={styles.taggingimage}
        />
        }
        <View style={styles.circle}>
          <FastImage style={styles.image} source={{uri : fileUrl }} />
        </View>
        <Text numberOfLines={1} style={styles.title}>{animalName}</Text>
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
  taggingimage : {
    position : 'absolute',
    width : windowWidth*0.1,
    height : windowHeight*0.1,
    zIndex : 99,
    top : "-18%",
    right : "-15%"
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
