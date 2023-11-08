import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/Text';

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
      <TouchableOpacity style={styles.title_container} onPress={() => goToprofile(nickname)}>
        <Text style={styles.title_grid1}>{rank}</Text>
        <Text style={styles.title_grid2}>{nickname}</Text>
        <Text style={styles.title_grid3}>{displayRegion}</Text>
        <Text style={styles.title_grid4}>{score}</Text>
      </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  title_container : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    marginVertical : '5%'
  },
  title_grid1 : {
    width : '15%',
    textAlign : 'center',
    fontFamily : 'NPSfont_bold',
  },
  title_grid2 : {
    width : '40%',
    textAlign : 'center',
    fontFamily : 'NPSfont_bold',
  },
  title_grid3 : {
    width : '15%',
    textAlign : 'center',
    fontFamily : 'NPSfont_bold',
  },
  title_grid4 : {
    width : '30%',
    textAlign : 'center',
    fontFamily : 'NPSfont_bold',
  },
});