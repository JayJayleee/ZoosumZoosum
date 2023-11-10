import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';


type Animal = {
  animalId: number;
  userAnimalName: string;
  fileUrl: string;
  navigation: (data: number) => void;
};

export default function SelectAnimalCard({navigation, animalId, userAnimalName, fileUrl}: Animal) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card2} onPress={() => navigation(animalId)} >
      <AppText style={styles.title}>{userAnimalName}</AppText>
        <Image style={styles.image} source={{uri : fileUrl }} />
      </TouchableOpacity>
    </View>
  );
};

import { windowHeight, windowWidth } from "@/constants/styles";


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 5,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    // width : windowWidth*0.9,
    height : windowHeight*0.17,
    margin : 3,
  },
  card2 : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    height : windowHeight*0.11,
    width : windowHeight*0.2,
  },

});
