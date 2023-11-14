import React, {useCallback, useState} from 'react';
import {View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {FirstEggScreenProps} from '@/types/path';
import {AnimalCarouselCardItem} from '@/pages/FirstEggPage/AnimalCarouselCardItem';
import {useQuery} from '@tanstack/react-query';
import {fetchFirstEgg} from '@/apis/tutorial';
import AppButton from '@/components/ui/Button';
export default function FirstEggPage({navigation, route}: FirstEggScreenProps) {
  type Egg = {
    animalId: number;
    animalName: string;
    fileUrl: string;
  };
  const [eggCount] = useState(route.params?.eggCount || 0);
  const [isFirstLogin] = useState(route.params?.isFirstLogin || false);
  const [firstEgg, setFirstEgg] = useState<Egg>();

  const {isError: isGetError, error: getError} = useQuery<Egg, Error>(
    ['firstEgg'],
    fetchFirstEgg,
    {
      onSuccess: (data: Egg) => {
        setFirstEgg(data);
      },
      onError: (error: Error) => {
        console.log('못받음', error);
      },
    },
  );

  const [isNamingComplete, setNamingComplete] = useState(false);

  const handleNamingComplete = useCallback((name: string) => {
    setNamingComplete(true);
  }, []);

  const gotomain = () => {
    navigation.navigate('Main');
  };

  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={require('@/assets/pickPloggingFriend_image.png')}
      resizeMode="cover"
      blurRadius={1}>
      <View
        style={{
          paddingTop: '10%',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimalCarouselCardItem
          activeIndex={1}
          index={1}
          onNamingComplete={handleNamingComplete}
          gotomain={gotomain}
          isFirstLogin={isFirstLogin}
          eggCount={eggCount}
          item={{
            fileUrl: firstEgg?.fileUrl ?? '',
            animalName: firstEgg?.animalName ?? '',
            animalId: firstEgg?.animalId ?? 0,
          }}></AnimalCarouselCardItem>
      </View>
    </ImageBackground>
  );
}
