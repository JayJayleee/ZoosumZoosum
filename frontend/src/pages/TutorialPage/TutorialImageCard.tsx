import AppText from '@/components/ui/Text';
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {ImageSourcePropType} from 'react-native';
import AppButton from '@/components/ui/Button';
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

type TutorialData = {
  Title: string;
  Image: ImageSourcePropType;
  index?: number;
  onPrev?: () => void;
  onNext?: () => void;
  gotoIsland: () => void;
};

export const TutorialImageCard = (item: TutorialData, index?: number) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item.Image} style={styles.image} />
      <AppText style={styles.header}>{item.Title}</AppText>
      <View style={styles.buttonContainer}>
        {item.onPrev && (
          <AppButton children="이전" variant="tutorial" onPress={item.onPrev} />
        )}
        {item.onNext && (
          <AppButton children="다음" variant="tutorial" onPress={item.onNext} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  image: {
    width: ITEM_WIDTH - 40,
    height: '70%',
    borderRadius: 8,
  },
  header: {
    color: '#222',
    fontSize: 22,
    paddingTop: 20,
    textAlign: 'center',
    fontFamily: 'NPSfont_bold',
    width: ITEM_WIDTH - 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: ITEM_WIDTH - 40,
    height: '10%',
  },
});

export default TutorialImageCard;
