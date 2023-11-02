import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';
interface PickIslandCardProps {
  id : string,
  title : string,
  imgurl : string,
}

export default function PickIslandCard({title, imgurl}: PickIslandCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card}>
        <Image style={styles.image} source={{uri : imgurl }} />
        <AppText style={styles.title}>{title}</AppText>
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
    height : 100,
    width : 100,
  }
});