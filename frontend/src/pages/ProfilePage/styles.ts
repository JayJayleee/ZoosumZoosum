import { StyleSheet } from "react-native";
import { windowHeight } from "@/constants/styles";

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
    textAlign: 'center'
  },
  staNoteImg : {
    position: 'relative',
    top: '10%', 
    width: '100%', 
    height: '90%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  staNoteSection: {
    width: '80%', 
    height: '17%', 
    bottom: '5%', 
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
    bottom: '3%', 
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
    marginBottom: windowHeight * 0.03,
    paddingLeft: '5%',
    paddingRight: '20%',
    justifyContent:'space-evenly', 
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
    marginBottom: windowHeight * 0.03,
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
    borderRadius: 50,
    width: 100, 
    height: 100,
  },
  badgeBoxIconFalse: {
    backgroundColor: '#249F71',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: windowHeight * 0.08, 
    height: windowHeight * 0.08,
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