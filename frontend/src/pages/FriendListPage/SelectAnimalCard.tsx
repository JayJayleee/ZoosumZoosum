import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';


interface SelectAnimalCardProps {
  id : string,
  title : string,
  imgurl : string,
}

export default function SelectAnimalCard({title, imgurl}: SelectAnimalCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card2} >
      <AppText style={styles.title}>{title}</AppText>
        <Image style={styles.image} source={{uri : imgurl }} />
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
