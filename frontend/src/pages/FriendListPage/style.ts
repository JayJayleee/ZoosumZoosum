import {StyleSheet, Button} from 'react-native';
import {windowHeight, windowWidth} from '@/constants/styles';

const styles = StyleSheet.create({
  backgroungcolor: {
    backgroundColor: 'black',
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    opacity: 0.2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title_head: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'NPSfont_extrabold',
  },

  head: {
    height: windowHeight * 0.1,
    marginTop: windowWidth * 0.1,
  },
  body1: {
    height: windowHeight * 0.2,
    width: windowWidth,
    alignItems: 'center',
    marginBottom: windowHeight * 0.01,
  },
  body2: {
    height: windowHeight * 0.7,
    width: windowWidth,
    alignItems: 'center',
    marginBottom: windowHeight * 0.04,
  },
  having_cardlist: {
    width: '85%',
    height: '100%',
    marginTop: windowHeight * 0.01,
  },
  hiddenCard: {
    width: windowWidth * 0.28,
    // height : windowHeight*0.15,
  },
  button_container: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-evenly',
    bottom: windowHeight * 0.02,
    height: '35%', 
  },
  isLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // fontSize : 35,
    fontFamily: 'NPSfont_extrabold',
    marginTop: windowHeight * 0.06,
  },
});

export default styles;
