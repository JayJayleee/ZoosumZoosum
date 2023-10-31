import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  bottomTap: {
    width: '100%',
  },
  cameraBtn: {
    height: '20%',
    width: '20%',
    resizeMode: 'contain',
    position: 'absolute',
    top: '85%',
    left: '77%',
  },
  text: {
    color: 'white',
  },
});
