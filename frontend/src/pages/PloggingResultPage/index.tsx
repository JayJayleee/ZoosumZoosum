import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {PloggingResultscreenProps} from '../../types/path';
import CarouselCards from '../../components/ui/Carousel/CarouselCards';

export default function PloggingResultPage({
  navigation,
  route,
}: PloggingResultscreenProps) {
  const newData = route.params?.newData;

  // newData에서 JSON 문자열을 추출하고 파싱
  // newData가 문자열인지 확인하고 문자열일 경우만 파싱
  const parsedData =
    typeof newData === 'string' ? JSON.parse(newData) : newData;

  useEffect(() => {
    // parsedData가 유효할 때만 로그를 찍음
    if (parsedData) {
      console.log('ploggingRstPage안녕', parsedData);
    }
  }, [parsedData]);

  const handleNavigation = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <CarouselCards data={parsedData} onNavigate={handleNavigation} />
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
