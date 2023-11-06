import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  cameraBtn: {
    width: '20%',
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 24,
    paddingTop: 20,
    fontFamily: 'NPSfont_bold',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '77%',
    paddingLeft: 10,
  },
  mapContainer: {
    borderRadius: 8,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});
