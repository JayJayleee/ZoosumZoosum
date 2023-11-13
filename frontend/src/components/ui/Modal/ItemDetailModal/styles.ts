import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '@/constants/styles';

export const styles = StyleSheet.create({
  imageModal: {
    marginTop :windowHeight*0.2, 
    width: windowWidth * 1,
    height: windowHeight * 0.5,
    justifyContent : 'center',
  },
  imageModal2 : {
    marginTop :windowHeight*0.2, 
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    justifyContent : 'center',
  }

})