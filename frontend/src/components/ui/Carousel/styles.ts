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
    width: ITEM_WIDTH,
    aspectRatio: 1, // 비율 유지
    zIndex: 1, // z-index 높게 설정해서 위에 올림
    position: 'absolute', // 절대위치
    resizeMode: 'contain',
  },
  image: {
    width: ITEM_WIDTH,
    aspectRatio: 1, // 비율 유지
    position: 'absolute', // 절대위치
    resizeMode: 'contain',
  },
  boxImage: {
    width: 10,
    height: 200,
    aspectRatio: 1,
    marginTop: 80,
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
});

export default styles;
