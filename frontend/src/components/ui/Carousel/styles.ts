import {StyleSheet} from 'react-native';
import {ITEM_WIDTH} from '@/constants/styles';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    height: '100%',
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seedimage: {
    width: ITEM_WIDTH - 80,
    aspectRatio: 1,
    zIndex: 1,
    position: 'absolute',
    resizeMode: 'contain',
  },
  image: {
    width: ITEM_WIDTH - 20,
    aspectRatio: 1,
    position: 'absolute',
    resizeMode: 'contain',
  },
  badgeimage: {
    width: ITEM_WIDTH,
    aspectRatio: 1,
    zIndex: 1,
    position: 'relative',
    top: 20,
    resizeMode: 'contain',
  },
  animalimage: {
    width: ITEM_WIDTH,
    aspectRatio: 1,
    zIndex: 1,
    position: 'relative',
    top: 40,
    resizeMode: 'contain',
  },
  boxImage: {
    // width: 10,
    height: 180,
    aspectRatio: 1,
    position: 'absolute',
    resizeMode: 'contain',
  },
  progressHeader: {
    color: 'white',
    fontSize: 28,
    paddingLeft: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },
  header: {
    color: 'white',
    fontSize: 28,
    paddingLeft: 20,
    paddingTop: 50,
    position: 'absolute',
    top: 10,
  },
  body: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
  },
  input: {
    padding: 10,
    marginBottom: 10,
    width: ITEM_WIDTH / 2,
    color: 'white',
    textAlign: 'center',
    // borderRadius: 5,
    fontFamily: 'NPSfont_regular',
    fontSize: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    zIndex: 10,
  },
  animalName: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
    marginTop: 10,
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  doubleprogressContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inputcontainer: {
    alignItems: 'center',
    position: 'relative',
    bottom: 40,
  },
});

export default styles;
