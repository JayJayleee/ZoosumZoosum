import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  upperStatus: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 10,
    width: 85,
    height: 25,
    borderRadius: 7,
  },
  banner: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bannerBox: {
    width: 200,
    height: 70,
    paddingRight: 10,
    backgroundColor: 'rgba(33, 148, 93, 0.3)',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonToggle :{
    height: 90,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
  },
  toggleBtnImage:{
    width: 60,
    height: 60,
  },
  toggleBtnText: {
    color: 'white',
    fontSize : 11,
  },
  toggleMoveButton: {
    position: 'absolute',
    top: -50,
    left: 115,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerImage: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  island: {
    position: 'absolute',
    top: 70,
    width: 470,
    height: 300,
  },
  tree: {
    position: 'absolute',
    top: 20,
    left: 110,
    width: 400,
    height: 220,
  },
  firstAnimal: {
    position: 'absolute',
    left: 130,
    width: 200,
    height: 100,
  },
  secondAnimal: {
    position: 'absolute',
    transform: 'scaleX(-1)',
    top: 180,
    left: 70,
    width: 200,
    height: 100,
  },
  thirdAnimal: {
    position: 'absolute',
    top: 180,
    left: 190,
    width: 200,
    height: 100,
  },
  fourthAnimal: {
    position: 'absolute',
    transform: 'scaleX(-1)',
    top: 140,
    left: 0,
    width: 200,
    height: 100,
  },
  fifthAnimal: {
    position: 'absolute',
    top: 140,
    left: 240,
    width: 200,
    height: 100,
  },
  ploggingButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export default styles;