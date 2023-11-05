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

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 5,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    width : 120,
    height : 120,
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
    height : 95,
    width : 95,
  },

});
