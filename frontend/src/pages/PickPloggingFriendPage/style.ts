import {StyleSheet, Dimensions} from 'react-native';

const MAIN_WIDTH = Dimensions.get('window').width;
const MAIN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: MAIN_WIDTH,
    height: MAIN_HEIGHT,
  },
  body1: {
    width: '100%',
    height: '40%',
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : 'blue',
  },
  FriendDetail_Image: {
    width: '90%',
    height: '90%',
  },
  animalName: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'NPSfont_extrabold',
    marginBottom: 20,
  },
  viewAnimalDescription: {
    width: '60%',
  },
  animalDescription: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'NPSfont_bold',
    flexWrap: 'wrap',
    lineHeight: 35,
  },
  body2: {
    width: '100%',
    height: '30%',
    marginTop: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bodyContainer1: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  active: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  Together: {
    backgroundColor: '#FFEBA6',
    width: 140,
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  title2: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'NPSfont_extrabold',
  },
});

export default styles;
