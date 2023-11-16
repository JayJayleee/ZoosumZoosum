import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '@/constants/styles';

export const styles = StyleSheet.create({
  container : {
    alignItems : 'center',
    width: '100%',
    height: '100%'
  },
  container_text : {
    position : 'absolute',
    top: windowHeight * 0.4,
    fontSize : 25,
    fontFamily : 'NPSfont_extrabold'
  },
  imageModal: {
    position: 'absolute',
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    justifyContent : 'center',
    // backgroundColor : 'red'
    // marginTop :windowHeight*0.2, 
  },
  imageModal2 : {
    position: 'absolute',
    width: windowWidth * 0.8,
    height: windowHeight * 0.25,
    justifyContent : 'center',
    top: windowHeight * 0.08,
    // backgroundColor : 'red',
    // marginVertical : windowHeight*0.1
  },
  btnContainer: {
    position: 'absolute',
    top: windowHeight * 0.48,
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor : 'red',
  }
})