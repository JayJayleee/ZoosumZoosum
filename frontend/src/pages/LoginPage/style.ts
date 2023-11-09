import {StyleSheet} from 'react-native';
import { windowWidth, windowHeight } from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    top: 0,
  },
  hiddenLoginButton: {
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showLoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 23,
  },
  textArea: {
    position: 'absolute',
    bottom: windowHeight * 0.1,
  },
});

export default styles;
