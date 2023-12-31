import { windowHeight, windowWidth } from '@/constants/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  allColor: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.85)'
  },
  cloud: {
    position: 'absolute', 
    top: 0, 
    width: windowHeight, 
    height: windowHeight * 0.5,
  },
  upperStatus: {
    position: 'relative',
    width: windowWidth,
    top: windowHeight* 0.005,
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: '20%',
    width: '22%',
    height: '60%',
    paddingRight: '2%',
    borderRadius: 7
  },
  statusImage: {
    width: '30%',
    height: '100%'
  },
  statusText: {
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 12,
  },
  banner: {
    position: 'relative',
    top: windowHeight* 0.005,
    width: windowWidth,
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bannerBox: {
    width: '48%',
    height: '70%',
    paddingRight: 10,
    backgroundColor: 'rgba(33, 148, 93, 0.3)',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerImage:{
    width: '40%',
    height: '100%'
  },
  bannerText: {
    color: 'white',
    textAlign: 'right',
    fontSize: 13,
  },
  bannerBoldText: {
    color: 'white',
    marginTop: '5%',
    textAlign: 'right',
    fontSize: 18,
    fontFamily: 'NPSfont_bold'
  },
  questionBox: {
    position: 'absolute',
    width: windowWidth * 0.96,
    height: windowHeight * 0.08,
    top: windowHeight * 0.17,
    alignItems: 'flex-end'
  },
  question: {
    position: 'absolute',
    right: windowWidth * 0.02,
    top: windowHeight * 0.01,
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 70
  },
  buttonToggle :{
    position: 'relative',
    top: windowHeight* 0.11,
    width: windowWidth* 0.98,
    height: windowHeight*0.15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  toggleArrowBtn: {
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
  },
  toggleBtnImage:{
    width: windowHeight * 0.07,
    height: windowHeight * 0.07,
  },
  toggleBtnText: {
    color: 'black',
    fontSize : 12,
  },
  toggleMoveButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    position: 'relative',
    width: windowWidth,
    top: windowHeight* 0.08,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  island: {
    position: 'relative',
    top: '2%',
    width: '110%',
    height: '80%',
  },
  tree: {
    position: 'relative',
    bottom: '5%',
    left: '30%',
    width: '80%',
    height: '60%',
  },
  firstAnimal: {
    position: 'relative',
    left: '41%',
    bottom: '22%',
    width: '20%',
    height: '35%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  secondAnimal: {
    position: 'relative',
    left: '20%',
    bottom: '68%',
    width: '20%',
    height: '35%',
    zIndex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdAnimal: {
    position: 'relative',
    left: '57%',
    bottom: '100%',
    width: '20%',
    height: '35%',
    zIndex: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fourthAnimal: {
    position: 'relative',
    left: '5%',
    bottom: '148%',
    width: '20%',
    height: '35%',
    zIndex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fifthAnimal: {
    position: 'relative',
    left: '72%',
    bottom: '182%',
    width: '20%',
    height: '35%',
    zIndex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ploggingButton: {
    position: 'relative',
    top: windowHeight* 0.09,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Animal: {
    position: 'relative',
    width: '140%',
    height: '100%',
  },
  ReverseAnimal: {
    transform: [{scaleX: -1}],
    width: '140%',
    height: '100%',
  },
  full: {
    width: '100%', 
    height: '100%'
  }
})

export default styles;