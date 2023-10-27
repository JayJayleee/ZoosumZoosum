import React from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {PloggingResultscreenProps} from '../../types/path';

interface result {
  item: any;
  index: number;
}

export default function PloggingResultPage(
  navigation: PloggingResultscreenProps,
) {
  return <View>index</View>;
}

export function CarouselCardItem({item, index}: result) {
  return <View></View>;
}
