import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PloggingResultscreenProps} from '../../types/path';
import CarouselCards from '../../components/ui/Carousel/CarouselCards';

export default function PloggingResultPage({
  navigation,
}: PloggingResultscreenProps) {
  const handleNavigation = () => {
    navigation.navigate('Main');
  };
  return (
    <View style={styles.container}>
      <CarouselCards onNavigate={handleNavigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3C7574',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
});
