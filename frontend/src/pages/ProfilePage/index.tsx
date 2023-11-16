import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import {ProfilescreenProps} from '@/types/path';
import {ImageBackground} from 'react-native';
import AppText from '@/components/ui/Text';
import {getStorage} from '@/apis';
import {styles} from './styles';
import {getBadgeInfo, getStatisticInfo} from '@/apis/profile';
import {statisticInfo, badgeInfo, badgeList} from '@/types/profile';
import {useQuery} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';

import Spinner from '@/components/ui/Spinner';
import HistoryTab from './HistoryTab';
import BadgeTab from './BadgeTab';
import StatisticTab from './StatisticTab';
import {changeButtonSound} from '@/constants/sound';

export default function ProfilePage({navigation, route}: ProfilescreenProps) {
  // 페이지 이동 시 받을 변수를 저장할 변수 생성
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true);
  const [badgeList, setBadgeList] = useState<badgeInfo[]>([]);
  const [statisticList, setStatisticList] = useState<statisticInfo>({
    plogCount: 0,
    sumLength: 0,
    hour: 0,
    minute: 0,
    second: 0,
    sumTrash: 0,
  });
  // 로딩중임을 확인하는 변수 생성
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  // 탭 이동을 위한 변수 생성
  const [activityPageNumber, setPageNumber] = useState<number>(0);

  // 들어온 프로필 페이지가 자신인지 타인인지 판단하는 코드
  useEffect(() => {
    const compareNickname = async () => {
      const myNickName = await getStorage('Nickname');
      if (myNickName !== route.params.nickname) {
        setIsMyProfile(false);
      } else {
        setIsMyProfile(true);
      }
      return true;
    };

    compareNickname();
  }, []);

  // 산책 변수에 받아온 결과를 저장하는 코드
  const {
    isLoading: statisticLoading,
    isError: isStatisticError,
    error: StatisticError,
  } = useQuery<statisticInfo>(
    ['statisticInfo'],
    () => getStatisticInfo(route.params.nickname),
    {
      onSuccess: data => {
        setStatisticList({
          hour: data.hour,
          minute: data.minute,
          second: data.second,
          plogCount: data.plogCount,
          sumLength: data.sumLength,
          sumTrash: data.sumTrash,
        });
      },
    },
  );
  // 뱃지 변수에 받아온 결과를 저장하는 코드
  const {
    isLoading: badgeLoading,
    isError: isBadgeError,
    error: BadgeError,
  } = useQuery<badgeList>(
    ['badgeList'],
    () => getBadgeInfo(route.params.nickname),
    {
      onSuccess: data => {
        setBadgeList(data.data);
      },
    },
  );


  if (statisticLoading || badgeLoading) {
    return <Spinner />;
  }

  return (
    <>
      {loadingStatus ? (
        <Spinner />
      ) : (
        <ImageBackground
          source={require('@/assets/profile_image/profile_background.png')}
          style={[
            StyleSheet.absoluteFill,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          {activityPageNumber == 0 ? (
            <StatisticTab
              nickname={route.params.nickname}
              isMyProfile={isMyProfile}
              statisticList={statisticList}
            />
          ) : activityPageNumber == 1 ? (
            <BadgeTab
              nickname={route.params.nickname}
              isMyProfile={isMyProfile}
              badgeList={badgeList}
            />
          ) : (
            <HistoryTab
              nickname={route.params.nickname}
              isMyProfile={isMyProfile}
            />
          )}
          <View style={styles.tabSection}>
            <TouchableOpacity
              onPress={() => {
                changeButtonSound();
                setPageNumber(0);
              }}
              style={styles.tabClickSection}>
              <FastImage
                source={require('@/assets/img_icon/statistic_icon.png')}
                style={styles.tabImage}
              />
              <AppText children="통계 보기" style={styles.tabText} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changeButtonSound();
                setPageNumber(1);
              }}
              style={styles.tabClickSection}>
              <FastImage
                source={require('@/assets/img_icon/badge_icon.png')}
                style={styles.tabImage}
              />
              <AppText children="뱃지 보기" style={styles.tabText} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changeButtonSound();
                setPageNumber(2);
              }}
              style={styles.tabClickSection}>
              <FastImage
                source={require('@/assets/img_icon/history_icon.png')}
                style={styles.tabImage}
              />
              <AppText children="활동 내역" style={styles.tabText} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </>
  );
}
