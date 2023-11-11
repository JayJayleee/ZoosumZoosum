import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "@/constants/styles";

export const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  upperTitle: {
    position: 'relative',
    fontFamily: 'NPSfont_bold',
    fontSize: 40, 
    top: '10%', 
    color: 'white', 
    justifyContent:'center', 
    textAlign: 'center',
  },
  staNoteImg : {
    position: 'relative',
    top: '4.5%', 
    width: '100%', 
    height: '90%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  staNoteSection: {
    width: '80%', 
    height: '17%', 
    flexDirection:'row',
    justifyContent:'space-evenly', 
    alignItems: 'center'
  },
  staNoteIconFoot : {
    width: '25%', 
    height: '62%',
  },
  staNoteIcon : {
    backgroundColor: '#FFE99C', 
    width: '25%', 
    height: '62%',
    borderRadius: 50
  },
  staNoteTitle: {
    fontFamily: 'NPSfont_bold',
    fontSize: 25, 
    color: 'black'
  },
  staNoteContent: {
    marginTop: '5%',
    textAlign: 'center',
    fontFamily: 'NPSfont_regular',
    fontSize: 18, 
    color: 'black'
  },
  staNoteLine: {
    borderBottomWidth: 0.5, 
    borderBottomColor: 'black', 
    width: '70%', 
  },
  badgeBox: {
    position: 'relative',
    width: '100%', 
    height: '90%', 
    top: '10%',
    paddingTop: '15%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  badgeInner: {
    position: 'relative',
    width: '100%',
    height: '80%',
    bottom: '9%',
  },
  badgeBoxSectionTrue: {
    width:'85%',  
    height: windowHeight * 0.12, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    borderRadius: 20,
    marginBottom: windowHeight * 0.02,
    paddingLeft: '5%',
    justifyContent:'flex-start', 
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  badgeBoxSectionFalse: {
    width:'85%',  
    height: windowHeight * 0.12, 
    backgroundColor: '#B4B4B4', 
    flexDirection: 'row', 
    borderRadius: 20,
    marginBottom: windowHeight * 0.02,
    paddingLeft: '5%',
    justifyContent:'flex-start', 
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  badgeBoxTextSection: {
    paddingLeft: '10%'
  },
  badgeBoxIconTrue: {
    backgroundColor: '#38FFB6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: windowHeight * 0.08, 
    height: windowHeight * 0.08,
  },
  badgeBoxIconFalse: {
    backgroundColor: '#249F71',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: windowHeight * 0.08, 
    height: windowHeight * 0.08,
  },
  badgeImg: {
    width: windowHeight * 0.1, 
    height: windowHeight * 0.1,
  },
  badgeLockImg: {
    width: windowHeight * 0.06, 
    height: windowHeight * 0.06,
  },
  badgeBoxTitle: {
    fontSize: 25
  },
  badgeBoxContent: {
    fontSize: 15
  },
  historySelect: {
    position: 'absolute',
    top: windowHeight*0.13,
    width: windowWidth * 0.9,
    height: windowHeight* 0.06,
    // borderColor: 'red',
    // borderWidth: 1,
    zIndex: 10,
    alignItems: 'flex-end'
  },
  historyBox: {
    position: 'relative',
    width: '100%', 
    height: '90%', 
    top: '10%',
    paddingTop: '15%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  historyInner: {
    position: 'relative',
    justifyContent: 'center', 
    width: '100%',
    height: '80%',
    bottom: '9%',
  },
  historyEmpty :{
    textAlign: 'center', 
    color: 'white', 
    fontSize: 30
  },
  historyBoxSection : {
    flexDirection: 'row', 
    width: windowWidth * 0.9, 
    height: windowHeight * 0.28, 
    marginBottom: windowHeight * 0.02,
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  historyBoxLeft: {
    position: 'relative',
    width: '45%', 
    height: '100%',
    backgroundColor: '#D9EED9',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent:'center',
    alignItems: 'center'
  },
  historyBoxDate: {
    position: 'absolute',
    zIndex: 10,
    top: '5%',
    left: '5%',
    width: '55%',
    height: '10%',
    backgroundColor: '#005F4E',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  historyBoxDateText : {
    color: 'white',
    fontSize: 12
  },
  historyBoxImg: {
    position: 'absolute',
    bottom: 0,
    width: '100%', 
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  historyBoxAnimal: {
    position: 'relative',
    // bottom: 0,
    width: '100%', 
    height: '70%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  historyBoxRight: {
    width: '55%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  historyBoxDetail: {
    width: '100%', 
    height: '30%', 
    flexDirection:'row',
    justifyContent:'center', 
    alignItems: 'center'
  },
  historyBoxDetailText: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyBoxIcon : {
    backgroundColor: '#38FFB6', 
    width: windowHeight * 0.05, 
    height: windowHeight * 0.05,
    borderRadius: 50
  },
  historyBoxTitle: {
    fontFamily: 'NPSfont_bold',
    fontSize: 18, 
    color: 'black'
  },
  historyBoxContent: {
    marginTop: '5%',
    textAlign: 'center',
    fontFamily: 'NPSfont_regular',
    fontSize: 15, 
    color: 'black'
  },
  historyBoxLine: {
    borderBottomWidth: 0.5, 
    borderBottomColor: 'black',
    justifyContent: 'center',
    width: '80%',
  },
  historyBoxMedal: {
    backgroundColor: '#38FFB6', 
    width: windowHeight * 0.12, 
    height: windowHeight * 0.12,
    borderRadius: windowHeight * 0.5,
    top: windowHeight * 0.01
  },
  tabSection: {
    position: 'relative',
    bottom: '15%',
    flexDirection: 'row', 
    backgroundColor: '#A5DCA0', 
    borderRadius: 15, 
    width: '95%', 
    height: '11%',
    paddingBottom: 10,
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  tabClickSection : {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabImage: {
    width: '80%', 
    height: '80%'
  },
  tabText: {
    fontSize: 15
  },
})