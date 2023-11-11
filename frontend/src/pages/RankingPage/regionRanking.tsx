import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import { SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import styles from './style';

import RankingCard from './rankingCard';

import { fetchMyRegionRankingListInfo } from '@/apis/ranking';
import { useQuery } from '@tanstack/react-query';
import { windowHeight } from '@/constants/styles';

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

export default function RegionRanking({goToprofile} : RankingProps) {
  const [RankingArray, setRankingArray] = useState<Rank[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>(''); // 기본 선택된 지역
  
  const regions = [
    { key: '1', value: '서울' },
    { key: '2', value: '대전' },
    { key: '3', value: '세종' },
    { key: '4', value: '광주' },
    { key: '5', value: '인천' },
    { key: '6', value: '대구' },
    { key: '7', value: '부산' },
    { key: '8', value: '울산' },
    { key: '9', value: '제주' },
    { key: '10', value: '경기' },
    { key: '11', value: '강원' },
    { key: '12', value: '충청' },
    { key: '13', value: '전라' },
    { key: '14', value: '경상' },
  ]; // key-value 형식의 지역 배열

  const { refetch } = useQuery(['TopRankingList', selectedRegion], () => fetchMyRegionRankingListInfo(selectedRegion), {
    onSuccess: (data) => {
      setRankingArray(data.data);
    },
    onError: (error) => {
      console.error('Error fetching rankings', error);
    },
    enabled: !!selectedRegion,
  });

  useEffect(() => {
    refetch();
  }, [selectedRegion, refetch]);


  // if (!RankingArray.length) return <Text>로딩...</Text>;
  
  return (
    <View style={styles.ranking_container}>
      <View style={styles.select_container}>
        <SelectList
          setSelected={(val:string) => setSelectedRegion(val) }
          maxHeight={0}
          data={regions}
          search={false}
          boxStyles={{width: '80%', borderColor:"#d4bb51", borderWidth: 2, justifyContent : 'center', alignItems : 'center'}} 
          inputStyles={{width: '80%', fontSize: 15, }}
          dropdownStyles={{height: windowHeight*0.3, borderColor:"#d4bb51", borderWidth: 1, width: 'auto', backgroundColor: 'white',}}
          dropdownTextStyles={{fontSize: 15, width:'80%'}}
          fontFamily='NPSfont_regular'
          placeholder={"지역을 선택해주세요"}
          save="value"
        />
      </View>
      <View style={styles.select_container2}></View>
      {/* <View style={styles.title_container}>
        <Text style={styles.title_grid1}>순위</Text>
        <Text style={styles.title_grid2}>닉네임</Text>
        <Text style={styles.title_grid3}>지역</Text>
        <Text style={styles.title_grid4}>점수</Text>
      </View> */}
      <View style={styles.body_container}>
        {RankingArray.length === 0 ? (
          <Text style={styles.error_text} >데이터가 없습니다.</Text>
        ) : (
          <FlatList
            horizontal={false}
            data={RankingArray}
            keyExtractor={item => item.nickname}
            renderItem={({ item, index }) => (
              <RankingCard
                index={index}
                nickname={item.nickname}
                region={item.region}
                score={item.score}
                goToprofile={goToprofile}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}