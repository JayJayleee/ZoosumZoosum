import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '@/constants/styles';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
})