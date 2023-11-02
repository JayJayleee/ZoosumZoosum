import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    top: 0,
  },
  logoImage: {
    marginBottom: 10
  },
  hiddeneLoginButton: {
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showLoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
