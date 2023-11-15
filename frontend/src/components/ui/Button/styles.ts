import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '@/constants/styles';

export const styles = StyleSheet.create({
  default: {
    width: '30%',
    backgroundColor: '#5D9BFF',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
  },
  primary: {
    width: '30%',
    backgroundColor: '#198C06',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  animalName: {
    width: 170,
    backgroundColor: '#7ED3A1',
    borderRadius: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalNameText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
  },
  carouselBtn: {
    width: 300,
    backgroundColor: '#7ED3A1',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickfriend: {
    width: '40%',
    backgroundColor: '#7ED3A1',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    marginRight: '5%',
  },
  selectBtn: {
    width: '50%',
    backgroundColor: '#7ED3A1',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    marginRight: '5%',
  },
  selectIslandBtn: {
    width: '50%',
    backgroundColor: '#34D399',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    marginRight: '5%',
  },
  pickfriendText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
  },
  gotoisland: {
    width: '50%',
    backgroundColor: '#34D399',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '85%',
  },
  ploggingRST: {
    width: '50%',
    backgroundColor: '#34D399',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '8%',
  },
  gotoislandText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
  },
  selectItem2: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.035,
    justifyContent: 'center',
    borderStyle: 'solid',
    alignItems: 'center',
    // marginHorizontal: 10,
    // marginVertical : 2,
  },
  selectItem: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.035,
    // backgroundColor: '#F1B0B0',
    borderBottomWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
    // marginVertical : 2,
  },
  selectItemText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
  },
  picnic: {
    width: '60%',
    backgroundColor: '#34D399',
    borderRadius: 20,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picnicText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 22,
  },
  region: {
    width: '65%',
    backgroundColor: '#F472B6',
    borderRadius: 10,
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nickname: {
    backgroundColor: '#5D9BFF',
    width: '65%',
    borderRadius: 10,
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    marginTop: '20%',
    width: '50%',
    height: '25%',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  ranking: {
    width: "30%",
    height: windowHeight * 0.05,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    // borderWidth: 2,r
    borderStyle: 'solid',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  rankingText: {
    color: 'black',
    fontFamily: 'NPSfont_bold',
    fontSize: 15,
  },
  ranking_unselect: {
    width: "30%",
    height: windowHeight * 0.05,
    backgroundColor: '#7ED3A1',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  rankingText_unselect: {
    color: 'black',
    fontFamily: 'NPSfont_extrabold',
    fontSize: 15,
  },
  tutorial: {
    width: '45%',
    backgroundColor: '#34D399',
    borderRadius: 12,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },
  tutorialText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
  },
  trash_red: {
    width: '48%',
    backgroundColor: '#d4655f',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trash_green: {
    width: '48%',
    backgroundColor: '#2dcf8b',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    borderRadius: 10,
    elevation: 2,
    // marginTop: '20%',
    width: '40%',
    height: '35%',
    justifyContent: 'center',
    backgroundColor: '#f2837c',
  },
  notclose: {
    borderRadius: 10,
    elevation: 2,
    // marginTop: '20%',
    width: '40%',
    height: '35%',
    justifyContent: 'center',
    backgroundColor: '#34D399',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  plog: {
    width: '30%',
    backgroundColor: 'rgba(247, 106, 106, 1);',
    borderRadius: 8,
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  plogText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
  },
  activity: {
    width: '50%',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
  },
  gotoisland2: {
    width: '40%',
    backgroundColor: '#34D399',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gotoislandText2: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
  },
  gotoisland3: {
    width: '40%',
    backgroundColor: '#34D399',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  gotoislandText3: {
    color: 'white',
    fontFamily: 'NPSfont_bold',
    fontSize: 20,
  },
});
