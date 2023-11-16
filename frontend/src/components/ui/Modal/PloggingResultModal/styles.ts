import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  overlayContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    zIndex: 2,
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
    fontFamily: 'NPSfont_bold',
  },
  overlayImage: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    zIndex: 1,
    // backgroundColor: 'black',
    transform: [{scaleX: -1}],
  },
  overlayRightImage: {
    width: '60%',
    zIndex: 1,
  },
  ItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '7%',
  },
  ItemImage: {width: 80, aspectRatio: 1, resizeMode: 'contain'},
  ItemAlign: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  ItemText: {
    color: 'black',
    fontSize: 23,
    fontFamily: 'NPSfont_bold',
    marginTop: 5,
  },
  Title: {
    color: 'black',
    fontFamily: 'NPSfont_bold',
    fontSize: 30,
    paddingTop: 18,
    paddingBottom: 10,
  },
});

export default styles;
