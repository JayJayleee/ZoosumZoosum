import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native';

import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import styles from './style';

import RankingCard from './rankingCard';

import { fetchMyTopRankingListInfo } from '@/apis/ranking';
import { useQuery } from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import { Wave } from '@/components/ui/animation/LottieEffect';

type ApiResponse = {
  data: Rank[];
};

type Rank = {
  nickname: string;
  region: string;
  score: number;
};
interface RankingProps {
  goToprofile : (data: string) => void;
}

export default function TopRanking({goToprofile} : RankingProps) {
  const [RankingArray, setRankingArray] = useState<Rank[]>([]);

  useQuery(['TopRankingList'],
    () => fetchMyTopRankingListInfo(), {
    onSuccess: (response: ApiResponse) => {
      const data = response.data;
      if (!Array.isArray(data)) {
        console.error('Data는 배열이 아닙니다:', data);
        return;
      }

      setRankingArray(data)
    },

    onError: error => {
      console.error('돌발돌발', error);
    },
  });

  if (!RankingArray.length) return (
    <View style={styles.isLoading}>
      <FastImage source={require('@/assets/loginpage_image/zooisland_logo.png')} />
      <Wave />
      <AppText style={styles.isLoading}>로딩중..</AppText>
    </View>
  )

  return (
    <View style={styles.ranking_container}>
      <View style={styles.select_container2}>
        <Text style={styles.title_head}>TOP 50 RANK</Text>
      </View>
      {/* <View style={styles.title_container}>
        <Text style={styles.title_grid1}>순위</Text>
        <Text style={styles.title_grid2}>닉네임</Text>
        <Text style={styles.title_grid3}>지역</Text>
        <Text style={styles.title_grid4}>점수</Text>
        <Text style={styles.title_grid5}>버튼</Text>
      </View> */}
      <View style={styles.body_container}>
        <FlatList
          style={{width: '105%', paddingRight: '5%'}}
          horizontal={false}
          data={RankingArray}
          keyExtractor={item => item.nickname}
          renderItem={({ item, index }) => {
            return (
              <RankingCard
                index={index}
                nickname={item.nickname}
                region={item.region}
                score={item.score}
                goToprofile={goToprofile}
              />
            );
          }}
        />
      </View>
    </View>
  );
}
