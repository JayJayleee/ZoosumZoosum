import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';


interface ItemCardProps {
  itemId : number,
  itemName : string,
  fileUrl : string,
}

export default function ItemCard({itemName, fileUrl}: ItemCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card2}>
        <View style={styles.circle}>
          <Image style={styles.image} source={{uri : fileUrl }} />
        </View>
        <Text style={styles.title} numberOfLines={1}>{itemName}</Text>
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
    // width : windowWidth,
    height : windowHeight*0.18,
    margin : 5,
  },
  card2: {
    justifyContent : 'center',
    alignItems : 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height : '100%',
    width : '100%',
  },
  circle: {
    width : 90,
    height : 90,
    flex :1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#FFD7D7',
    borderRadius : 100,
  }
});
