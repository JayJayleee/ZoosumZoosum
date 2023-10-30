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
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    width: ITEM_WIDTH / 3,
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

export default styles;
