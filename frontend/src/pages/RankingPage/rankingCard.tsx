import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';
import FastImage from 'react-native-fast-image';

interface RankingCardProps {
  nickname : string,
  region : string,
  score : number,
  index : number,
  goToprofile : (data : string) => void;
}

export default function RankingCard({nickname, region, score, index, goToprofile} : RankingCardProps) {
  let displayRegion = region;
  if (region === "SEOUL") {
    displayRegion = "서울";
  } else if (region === "DAEJEON") {
    displayRegion = "대전";
  } else if (region === "SEJONG") {
    displayRegion = "세종";
  } else if (region === "GWANGJU") {
    displayRegion = "광주";
  } else if (region === "INCHEON") {
    displayRegion = "인천";
  } else if (region === "DAEGU") {
    displayRegion = "대구";
  } else if (region === "BUSAN") {
    displayRegion = "부산";
  } else if (region === "ULSAN") {
    displayRegion = "울산";
  } else if (region === "JEJU") {
    displayRegion = "제주";
  } else if (region === "GYEONGGI") {
    displayRegion = "경기";
  } else if (region === "KANGWON") {
    displayRegion = "강원";
  } else if (region === "CHUNGCUNG") {
    displayRegion = "충청";
  } else if (region === "JEONLA") {
    displayRegion = "전라";
  } else if (region === "GYEONGSANG") {
    displayRegion = "경상";
  }

  const rank = index + 1;

  return (
    <View>
      {nickname !== undefined &&
      <View style={styles.title_container} >
        <Text style={styles.title_grid1}>{rank}등</Text>
        <View style={styles.title_grid2}>
          <Text style={styles.title_text1}>{nickname}</Text>
          <Text style={styles.title_text2}>({displayRegion})</Text>
        </View>
        <View style={styles.title_grid3}>
          <Text style={styles.title_text3}>점수</Text>
          <Text style={styles.title_text4}>{score}</Text>
        </View>
        <TouchableOpacity style={styles.title_grid4} onPress={() => goToprofile(nickname)}>
          <FastImage style={styles.image} source={require('@/assets/img_icon/ranking_img.png')} resizeMode={FastImage.resizeMode.contain}/>
        </TouchableOpacity>
      </View>
      }
    </View>
  )
}

import { windowHeight, windowWidth } from "@/constants/styles";

const styles = StyleSheet.create({
  title_container : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    // borderWidth : 5,
    borderStyle: 'solid',
    borderRadius : 50,
    padding : '3%',
    marginBottom : '2%',
    width : '100%',
    height : windowHeight*0.1,
    backgroundColor : '#A5DCA0'

  },
  title_grid1 : {
    width : '20%',
    textAlign : 'center',
    fontFamily : 'NPSfont_extrabold',
    fontSize : 20,
  },
  title_grid2 : {
    width : '35%',
    alignItems : 'flex-start',
    justifyContent : 'center',
  },
  title_text1 : {
    fontSize : 15,
    fontFamily : 'NPSfont_extrabold',
  },
  title_text2 : {
    fontSize : 13,
    fontFamily : 'NPSfont_bold',
  },
  
  title_grid3 : {
    width : '25%',
    alignItems : 'center',
    justifyContent : 'center',
  },
  title_text3 : {
    fontSize : 13,
    fontFamily : 'NPSfont_extrabold',
  },
  title_text4 : {
    fontSize : 13,
    fontFamily : 'NPSfont_bold',
  },
  title_grid4 : {
    width : '20%',
    textAlign : 'center',
    justifyContent : 'center',
    fontSize : 13,
    fontFamily : 'NPSfont_extrabold',
  },
  image : {
    width : '100%',
    height : '100%',
  }
});