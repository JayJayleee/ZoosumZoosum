import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface SelectAnimalCardProps {
  id : string,
  title : string,
  imgurl : string,
}

export default function SelectAnimalCard({title, imgurl}: SelectAnimalCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card2} >
        <Image style={styles.image} source={{uri : imgurl }} />
        <Text style={styles.title}>{title}</Text>
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
    width : 70,
    height : 120,
    margin : 5,
  },
  card2 : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height : 65,
    width : 50,
  }
});
