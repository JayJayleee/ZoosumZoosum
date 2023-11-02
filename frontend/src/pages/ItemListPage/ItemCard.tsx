import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';


interface ItemCardProps {
  id : string,
  title : string,
  imgURI : string,
}

export default function ItemCard({title, imgURI}: ItemCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.circle}>
          <Image style={styles.image} source={{uri : imgURI }} />
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
      

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius : 10,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    width : 100,
    height : 130,
    margin : 5,
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
