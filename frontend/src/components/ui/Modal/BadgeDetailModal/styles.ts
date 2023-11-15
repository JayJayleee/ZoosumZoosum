import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '@/constants/styles';

export const styles = StyleSheet.create({
  pressure: {
    flex:1, 
    backgroundColor: 'transparent',
  },
  modalBox: {
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute', 
    width: windowWidth * 0.95, 
    height: windowHeight * 0.4, 
    top: windowHeight * 0.6, 
    backgroundColor: 'white', 
    marginLeft: windowWidth * 0.025,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalReverseBox: {
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute', 
    width: windowWidth * 0.95, 
    height: windowHeight * 0.4, 
    top: windowHeight * 0.6, 
    backgroundColor: 'grey', 
    marginLeft: windowWidth * 0.025,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  badgeClose: {
    position: 'absolute',
    top: windowHeight * 0.03,
    left: windowWidth * 0.06,
    width: windowHeight * 0.05,
    height: windowHeight * 0.05
  },
  xMark: {
    width: '100%',
    height: '100%'
  },
  badgeShowBox: {
    position: 'absolute',
    top: windowHeight * 0.05,
    width: windowHeight * 0.13,
    height: windowHeight * 0.13,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BadgeImage: {
    width: '100%',
    height: '100%',
  },
  BadgeReverseImage: {
    width: '80%',
    height: '80%',
  },
  boldText: {
    position: 'absolute',
    top: windowHeight * 0.2,
    fontFamily: 'NPSfont_bold',
    fontSize: 25,
  },
  boldReverseText: {
    position: 'absolute',
    top: windowHeight * 0.2,
    fontFamily: 'NPSfont_bold',
    fontSize: 25,
    color: 'white'
  },
  contentText: {
    position: 'absolute',
    top: windowHeight * 0.27,
    fontFamily: 'NPSfont_regular',
    fontSize: 18,
  },
  contentReverseText: {
    position: 'absolute',
    top: windowHeight * 0.27,
    fontFamily: 'NPSfont_regular',
    fontSize: 18,
    color: 'white'
  },
  footerText: {
    position: 'absolute',
    top: windowHeight * 0.31,
    fontFamily: 'NPSfont_regular',
    fontSize: 12,
  },
  footerReverseText: {
    position: 'absolute',
    top: windowHeight * 0.31,
    fontFamily: 'NPSfont_regular',
    fontSize: 12,
    color: 'white'
  },
})