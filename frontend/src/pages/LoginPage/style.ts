import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: '3%',
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
    marginBottom: '5%',
  },
  hiddenLoginButton: {
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
