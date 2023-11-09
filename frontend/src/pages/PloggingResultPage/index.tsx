import React, {useState, useEffect} from 'react';
import {AppCloseModal} from '@/components/ui/Modal/CloseModal';
import {View, StyleSheet} from 'react-native';
import {PloggingResultscreenProps} from '../../types/path';
import CarouselCards from '../../components/ui/Carousel/CarouselCards';
import Spinner from '@/components/ui/Spinner';
import {BackHandler} from 'react-native';

export default function PloggingResultPage({
  navigation,
  route,
}: PloggingResultscreenProps) {
  const parsedData = route.params.newData;

  // newData에서 JSON 문자열을 추출하고 파싱
  // newData가 문자열인지 확인하고 문자열일 경우만 파싱
  // const parsedData =
  //   typeof newData === 'string' ? JSON.parse(newData) : newData;

  // useEffect(() => {
  //   // parsedData가 유효할 때만 로그를 찍음
  //   if (parsedData) {
  //     console.log('💥ploggingRstPage안녕💥', parsedData);
  //   } else {
  //     console.log('💔parsedData is undefined💔');
  //   }
  // }, [parsedData]);

  // 뒤로 가기 클릭 시 종료 여부 묻도록 설정
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        setCloseModalVisible(true);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);
  const handleNavigation = () => {
    navigation.navigate('Main');
  };
  const [isCloseModalVisible, setCloseModalVisible] = useState<boolean>(false);
  const exitFtn = () => {
    BackHandler.exitApp();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      {isCloseModalVisible && (
        <AppCloseModal
          isModalVisible={isCloseModalVisible}
          RequestClose={() => setCloseModalVisible(false)}
          exitFtn={exitFtn}
        />
      )}
      {parsedData && parsedData.missionList ? (
        <CarouselCards data={parsedData} onNavigate={handleNavigation} />
      ) : (
        <Spinner />
      )}
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
