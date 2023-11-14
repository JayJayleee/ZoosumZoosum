import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '@/constants/styles';

export const styles = StyleSheet.create({
  container : {
    alignItems : 'center'
  },
  container_text : {
    position : 'absolute',
    bottom : "10%",
    fontSize : 25,
    fontFamily : 'NPSfont_extrabold'
  },
  imageModal: {
    // marginTop :windowHeight*0.2, 
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    justifyContent : 'center',
    // backgroundColor : 'red'
  },
  imageModal2 : {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    justifyContent : 'center',
    // backgroundColor : 'red',
    marginVertical : windowHeight*0.1
  }

})