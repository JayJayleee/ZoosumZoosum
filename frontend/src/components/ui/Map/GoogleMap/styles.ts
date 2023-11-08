import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: '100%',
    width: '100%',
    // borderColor: 'blue',
    // borderStyle: 'solid',
    // borderWidth: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  mapContent: {
    borderRadius: 8,
    paddingBottom: 40,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  animal: {
    marginTop: 30,
    width: 130,
    height: 130,
    zIndex: 1,
  },
});

export default styles;
