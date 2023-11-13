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
    fontFamily: 'NPSfont_bold'
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
    fontSize: 15,
  },
  bannerBoldText: {
    color: 'white',
    marginTop: '5%',
    textAlign: 'right',
    fontSize: 20,
    fontFamily: 'NPSfont_bold'
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
    fontSize : 13,
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
    left: '45%',
    bottom: '22%',
    width: '20%',
    height: '35%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondAnimal: {
    position: 'relative',
    left: '28%',
    bottom: '70%',
    width: '20%',
    height: '35%',
    zIndex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdAnimal: {
    position: 'relative',
    left: '60%',
    bottom: '102%',
    width: '20%',
    height: '35%',
    zIndex: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fourthAnimal: {
    position: 'relative',
    left: '10%',
    bottom: '150%',
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
    width: '120%',
    height: '120%',
  },
  ReverseAnimal: {
    transform: 'scaleX(-1)',
    width: '120%',
    height: '120%',
  },
})

export default styles;