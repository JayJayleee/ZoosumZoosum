import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import AppText from '@/components/ui/Text';
import AppButton from '@/components/ui/Button';

import styles from './style';

import RankingCard from './rankingCard';

import {fetchMyRegionRankingListInfo} from '@/apis/ranking';
import {useQuery} from '@tanstack/react-query';
import {windowHeight} from '@/constants/styles';

import {Wave} from '@/components/ui/animation/LottieEffect';
import FastImage from 'react-native-fast-image';

type ApiResponse = {
  data: Rank[];
};

type Rank = {
  nickname: string;
  region: string;
  score: number;
};

interface RankingProps {
  goToprofile: (data: string) => void;
}

export default function RegionRanking({goToprofile}: RankingProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>(''); // 기본으로 일단 한 곳을 정해야 하니까 서울로 해두겠음
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rankingData, setRankingData] = useState<Rank[]>([]);

  const regions = [
    {key: '1', value: '강원'},
    {key: '2', value: '경기'},
    {key: '3', value: '경상'},
    {key: '4', value: '광주'},
    {key: '5', value: '대구'},
    {key: '6', value: '대전'},
    {key: '7', value: '부산'},
    {key: '8', value: '서울'},
    {key: '9', value: '세종'},
    {key: '10', value: '울산'},
    {key: '11', value: '인천'},
    {key: '12', value: '전라'},
    {key: '13', value: '제주'},
    {key: '14', value: '충청'},
  ]; // key-value 형식의 지역 배열

  // const {
  //   data: apiResponse,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery(
  //   ['TopRankingList', selectedRegion],
  //   () => fetchMyRegionRankingListInfo(selectedRegion),
  //   {
  //     enabled: !!selectedRegion, // 지역이 선택될 때만 쿼리가 실행되어 기존 데이터 무효화 하는 것임
  //   },
  // );

  // const rankingData = apiResponse ? apiResponse.data : [];
  // // console.log('rankingData', rankingData);
  // if (isLoading) {
  //   return (
  //     <View style={styles.isLoading}>
  //       <FastImage
  //         source={require('@/assets/loginpage_image/zooisland_logo.png')}
  //       />
  //       <Wave />
  //       <AppText style={styles.isLoading}>잠시 기다려 주세요!</AppText>
  //     </View>
  //   );
  // }

  // if (isError) {
  //   console.log('지역 별 랭킹 호출 - 오류 발생', error);
  // }

  // const LoadingState = <View style={styles.isLoading}>
  //   <FastImage
  //     source={require('@/assets/loginpage_image/zooisland_logo.png')}
  //   />
  //   <Wave />
  //   <AppText style={styles.isLoading}>잠시 기다려 주세요!</AppText>
  // </View>

  useEffect(() => {
    const dataFtn = () => {
      fetchMyRegionRankingListInfo(selectedRegion).then(data => {
        setRankingData(data.data)
      })
    }

    if (selectedRegion !== "") {
      dataFtn();
    }
  }, [selectedRegion])

  return (
    <View style={styles.ranking_container}>
      <View style={styles.select_container}>
        <SelectList
          setSelected={(val: string) => setSelectedRegion(val)}
          maxHeight={0}
          data={regions}
          search={false}
          // defaultOption={{key: '8', value: '서울'}}
          boxStyles={{
            width: '80%',
            height: windowHeight * 0.06,
            borderColor: '#7ED3A1',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
          inputStyles={{width: '80%', fontSize: 13, alignItems: 'center'}}
          dropdownStyles={{
            height: windowHeight * 0.3,
            borderColor: '#7ED3A1',
            borderWidth: 1,
            width: 'auto',
            backgroundColor: 'white',
          }}
          dropdownTextStyles={{fontSize: 15, width: '80%'}}
          fontFamily="NPSfont_bold"
          placeholder={'지역을 선택해주세요'}
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
        {rankingData.length === 0 ? (
          <View style={styles.error_box}>
            <AppText style={styles.error_text}>
              {selectedRegion === ""? "지역을 선택해주세요" : "데이터가 없습니다"}
              </AppText>
          </View>
        ) : (
          <FlatList
            horizontal={false}
            data={rankingData}
            keyExtractor={item => item.nickname}
            renderItem={({item, index}) => (
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
