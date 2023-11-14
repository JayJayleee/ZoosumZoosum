import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '@/constants/styles';
import { animalForm } from '@/types/island';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  title: {
    fontFamily: 'NPSfont_bold',
    fontSize: 30,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '70%',
  },
  animal: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.2,
  }
})