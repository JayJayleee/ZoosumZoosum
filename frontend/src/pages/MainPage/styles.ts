import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  upperStatus: {
    position: 'relative',
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
    color: 'white'
  },
  banner: {
    position: 'relative',
    height: '12%',
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
    fontSize: 12
  },
  buttonToggle :{
    position: 'relative',
    height: '10%',
    paddingTop: '17%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  toggleArrowBtn: {
    width: 70,
    height: 70,
  },
  toggleBtnImage:{
    width: '120%',
    height: '500%',
  },
  toggleBtnText: {
    color: 'white',
    fontSize : 11,
  },
  toggleMoveButton: {
    position: 'absolute',
    bottom: '220%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerImage: {
    position: 'relative',
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
    left: '10%',
    bottom: '20%',
    height: '40%',
    zIndex: 10,
  },
  secondAnimal: {
    position: 'relative',
    transform: 'scaleX(-1)',
    right: '6%',
    bottom: '75%',
    height: '40%',
    zIndex: 8,
  },
  thirdAnimal: {
    position: 'relative',
    left: '20%',
    bottom: '115%',
    height: '40%',
    zIndex: 8,
  },
  fourthAnimal: {
    position: 'relative',
    transform: 'scaleX(-1)',
    right: '25%',
    bottom: '165%',
    height: '40%',
    zIndex: 6,
  },
  fifthAnimal: {
    position: 'relative',
    left: '30%',
    bottom: '205%',
    height: '40%',
    zIndex: 6,
  },
  ploggingButton: {
    position: 'relative',
    top: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export default styles;