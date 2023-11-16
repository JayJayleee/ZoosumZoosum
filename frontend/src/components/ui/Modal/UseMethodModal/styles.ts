import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '@/constants/styles';

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: 99,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.85)'
  },
  upperInfo: {
    position: 'absolute',
    top: windowHeight * 0.01,
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
    zIndex:100,
    opacity: 0.1
  },
  image: {
    width: '96%',
    height: '97%'
  },
  exit: {
    position: 'absolute',
    top: windowHeight * 0.01,
    left: windowWidth * 0.02,
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    zIndex: 100
  },
  firstUpperText: {
    position: 'absolute',
    top: windowHeight * 0.22,
    left: windowWidth * 0.03,
    fontSize: 14,
    color: 'white',
  },
  firstLowerText: {
    position: 'absolute',
    bottom: windowHeight * 0.15,
    left: windowWidth * 0.09,
    fontSize: 14,
    color: 'white',
  },
  secondUpperText: {
    position: 'absolute',
    top: windowHeight * 0.27,
    fontSize: 15,
    color: 'white',
  },
  secondLowerText: {
    position: 'absolute',
    bottom: windowHeight * 0.25,
    // left: windowWidth * 0.09,
    fontSize: 18,
    color: 'white',
  },
  thirdUpperText: {
    position: 'absolute',
    bottom: windowHeight * 0.27,
    fontSize: 15,
    color: 'white',
  },
  fourthUpperText: {
    position: 'absolute',
    top: windowHeight * 0.17,
    fontSize: 20,
    color: 'white',
  },
  fifthUpperText: {
    position: 'absolute',
    bottom: windowHeight * 0.18,
    left: windowWidth * 0.07,
    width: '90%',
    fontSize: 17,
    color: 'white',
    lineHeight: 25
  },
  sixTopText: {
    position: 'absolute',
    top: windowHeight * 0.08,
    fontSize: 16,
    color: 'white',
    lineHeight: 25
  },
  sixMiddleText: {
    position: 'absolute',
    top: windowHeight * 0.21,
    fontSize: 16,
    color: 'white',
    lineHeight: 25
  },
  sixBottomText: {
    position: 'absolute',
    bottom: windowHeight * 0.19,
    right: windowWidth * 0.03,
    width: '50%',
    fontSize: 15,
    color: 'white',
    lineHeight: 25,
    textAlign: 'left'
  },
  sixLowText: {
    position: 'absolute',
    bottom: windowHeight * 0.1,
    left: windowWidth * 0.15,
    fontSize: 15,
    color: 'white',
    lineHeight: 25
  },
  sevenUpperText: {
    position: 'absolute',
    top: windowHeight * 0.2,
    fontSize: 14,
    color: 'white',
  },
  sevenLowerText: {
    position: 'absolute',
    bottom: windowHeight * 0.17,
    fontSize: 16,
    color: 'white',
  },
  eightTopText: {
    position: 'absolute',
    top: windowHeight * 0.1,
    textAlign: 'left',
    right: windowWidth * 0.1,
    width: '50%',
    fontSize: 17,
    color: 'white',
    lineHeight: 25
  },
  eightMiddleText: {
    position: 'absolute',
    bottom: windowHeight * 0.33,
    fontSize: 14,
    color: 'white',
  },
  eightBottomText: {
    position: 'absolute',
    bottom: windowHeight * 0.14,
    fontSize: 13,
    color: 'white',
    lineHeight: 25,
  },
})