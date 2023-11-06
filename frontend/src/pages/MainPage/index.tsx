import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';
import {MainScreenProps} from 'typePath';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import AppButton from '@/components/ui/Button';
import { fetchMyIslandInfo, fetchMyStatusInfo } from '@/apis/Island';
import {statusInfo, islandInfo, timeObj, animalForm } from '@/types/island';
import AppText from '@/components/ui/Text';
import { useQuery } from '@tanstack/react-query';
import { getStorage } from '@/apis';


export default function MainPage({navigation}: MainScreenProps) {

  // 내 상태를 보여줄 변수 생성
  const [getTrash, setTrash] = useState<number>(0);
  const [getTime, setTime] = useState<timeObj>({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [getDistance, setDistance] = useState<number>(0);
  const [getSeed, setSeed] = useState<number>(0);

  // 내가 심은 나무 개수와 전체가 심은 나무 개수를 저장할 변수 생성
  const [treeCount, setTreeCount] = useState<number>(0);
  const [allTreeCount, setAllTreeCount] = useState<number>(0);

  // 뒤로가기 클릭 시, 앱 종료 여부를 묻는 모달 생성
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // 버튼 토글 상태를 나타낼 변수
  const [toggle, setToggle] = useState<boolean>(false);

  // 섬 이미지 링크를 저장할 변수 생성, 초기값은 기본적으로 모든 유저에게 제공되는 기본 섬 링크
  const [islandUri, setIslandUri] = useState<string>(
    "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png"
  );
  // 나무 이미지 링크를 저장할 변수 생성, 초기값은 기본적으로 모든 유저에게 제공되는 기본 나무 링크
  const [treeUri, setTreeUri] = useState<string>(
    "https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_01.png"
  );
  // 동물 gif 링크를 저장할 변수 생성
  const [animalUri, setAnimalUri] = useState<animalForm[]>([]);
  // 동물 리스트의 갯수를 저장할 변수 생성
  const [numberAnimal, setNumberAnimal] = useState<number>(0);

  // 뒤로 가기 클릭 시 종료 여부 묻도록 설정
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        setModalVisible(true);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  // 버튼 토글 애니메이션을 위한 값 생성
  const animation = useRef(new Animated.Value(0)).current;
  // 버튼 클릭 시, 애니메이션 실행
  useEffect(() => {
    Animated.timing(animation, {
      toValue: toggle ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [animation, toggle]);

  const exitFtn = () => {
    BackHandler.exitApp();
    navigation.navigate('Login');
    return true;
  };

  // 종료 모달 창
  const appCloseModal = (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View>
        <AppText children="앱을 종료하시겠습니까?" />
        <View>
          <AppButton children="확인" onPress={exitFtn} />
          <AppButton children="취소" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );

  // 상단 스탯 api 호출 및 상태 저장하는 코드 생성
  const { isLoading: isStatusLoading, isError: isStatusError, error: StatusError} = useQuery<statusInfo>(
    ['mainStatus'],
    fetchMyStatusInfo,
    {
      onSuccess: (statusContent) => {
        setTrash(statusContent.missionTrash)
        setSeed(statusContent.seed)
        setTreeCount(statusContent.treeCount)
        setAllTreeCount(statusContent.treeAllCount)
        setTime({hour: statusContent.hour, minute: statusContent.minute, second: statusContent.second})
        setDistance(statusContent.missionLength)
      },
    }
  );
  // 에러 발생 시, 콘솔 창에 해당 에러 찍는 코드
  if (isStatusError && StatusError) {
    console.log("에러 발생 :", StatusError)
  }

  // 섬과 나무, 동물 링크 api 호출 및 상태 저장하는 코드 생성
  const {isLoading: isIslandLoading, isError: isIslandError, error: IslandError } = useQuery<islandInfo>(
    ['mainIsland'],
    fetchMyIslandInfo,
    {
      onSuccess: (data) => {
        setIslandUri(data.islandUrl)
        setTreeUri(data.treeUrl)
        setAnimalUri(data.animalList)
        setNumberAnimal(data.animalList.length);
      },
    }
  );

  // 에러 발생 시, 콘솔 창에 해당 에러 찍는 코드
  if (isIslandError && IslandError) {
    console.log("에러 발생 :", IslandError)
  }
  // 로딩 중일 때, 로딩 페이지를 띄우는 코드
  if (isIslandLoading || isStatusLoading){
    return <View>
    </View>
  }

  // 프로필 클릭 시, 이동하는 함수
  const goToProfile = async () => {
    const nickname = await getStorage('Nickname');
    if (nickname !== null) {
      navigation.navigate({
        name: 'Profile',
        params: {nickname: nickname},
      });
    }
  };

  // 랭킹 클릭 시, 이동하는 함수
  const goToRanking = () => {
    navigation.navigate('Ranking');
  };

  // 동물 클릭 시, 이동하는 함수
  const goToAnimalList = () => {
    navigation.navigate('FriendList');
  };

  // 섬 클릭 시, 이동하는 함수
  const goToItemList = () => {
    navigation.navigate('ItemList');
  };


  // 닫힌 상태의 토글 버튼
  const closedButton = (
    <TouchableOpacity onPress={() => setToggle(!toggle)}>
      <Image
        source={require('@/assets/mainpage_image/left_arrow.png')}
        style={{width: 70, height: 70}}
      />
    </TouchableOpacity>
  );

  // 열린 상태의 토글 버튼
  const openedButton = (
    <TouchableOpacity onPress={() => setToggle(!toggle)}>
      <Image
        source={require('@/assets/mainpage_image/right_arrow.png')}
        style={{width: 70, height: 70}}
      />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('@/assets/mainpage_image/Background.png')}
      style={StyleSheet.absoluteFill}>
      {isModalVisible && appCloseModal}
      <View style={styles.upperStatus}>
        <View style={styles.statusBox}>
          <Image
            source={require('@/assets/img_icon/trash_icon.png')}
            style={{width: 25, height: 25}}
          />
          <AppText
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              color: 'white',
            }}>
            {getTrash}
          </AppText>
        </View>
        <View style={styles.statusBox}>
          <Image
            source={require('@/assets/img_icon/sand_clock_icon.png')}
            style={{width: 25, height: 25}}
          />
          <AppText
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              color: 'white',
            }}>
            {getTime.minute < 10 ? `0${getTime.minute}` : getTime.minute}:
            {getTime.second < 10 ? `0${getTime.second}` : getTime.second}
          </AppText>
        </View>
        <View style={styles.statusBox}>
          <Image
            source={require('@/assets/img_icon/shoe_icon.png')}
            style={{width: 25, height: 25}}
          />
          <AppText
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              color: 'white',
            }}>
            {getDistance}km
          </AppText>
        </View>
        <View style={styles.statusBox}>
          <Image
            source={require('@/assets/img_icon/seed_icon.png')}
            style={{width: 25, height: 25}}
          />
          <AppText
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              color: 'white',
            }}>
            {getSeed}
          </AppText>
        </View>
      </View>
      <View style={styles.banner}>
        <View style={styles.bannerBox}>
          <Image
            source={require('@/assets/mainpage_image/single_tree_img.png')}
            style={{width: 70, height: 70}}
          />
          <View>
            <AppText
              children="내가 심은 나무 수"
              style={{color: 'white', textAlign: 'right', fontSize: 12}}
            />
            <AppText style={{color: 'white', textAlign: 'right', fontSize: 12}}>
              {treeCount} 그루
            </AppText>
          </View>
        </View>
        <View style={styles.bannerBox}>
          <Image
            source={require('@/assets/mainpage_image/multiple_tree_img.png')}
            style={{width: 70, height: 80}}
          />
          <View>
            <AppText
              children="현재까지 심어진 나무 수"
              style={{color: 'white', textAlign: 'right', fontSize: 12}}
            />
            <AppText style={{color: 'white', textAlign: 'right', fontSize: 12}}>
              {allTreeCount} 그루
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.buttonToggle}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -260],
                  }),
                },
              ],
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}>
          <TouchableOpacity
            onPress={
              toggle
                ? () => {
                    goToRanking();
                  }
                : undefined
            }
            style={styles.toggleMoveButton}>
            <Image
              source={require('@/assets/img_icon/animal_earth_icon.png')}
              style={styles.toggleBtnImage}
            />
            <AppText children="랭킹 보기" style={styles.toggleBtnText} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -190],
                  }),
                },
              ],
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}>
          <TouchableOpacity
            onPress={
              toggle
                ? () => {
                    goToProfile();
                  }
                : undefined
            }
            style={styles.toggleMoveButton}>
            <Image
              source={require('@/assets/img_icon/profile_icon.png')}
              style={styles.toggleBtnImage}
            />
            <AppText children="나의 프로필" style={styles.toggleBtnText} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120],
                  }),
                },
              ],
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}>
          <TouchableOpacity
            onPress={
              toggle
                ? () => {
                    goToItemList();
                  }
                : undefined
            }
            style={styles.toggleMoveButton}>
            <Image
              source={require('@/assets/img_icon/island_icon.png')}
              style={styles.toggleBtnImage}
            />
            <AppText children="나의 아이템" style={styles.toggleBtnText} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50],
                  }),
                },
              ],
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}>
          <TouchableOpacity
            onPress={
              toggle
                ? () => {
                    goToAnimalList();
                  }
                : undefined
            }
            style={styles.toggleMoveButton}>
            <Image
              source={require('@/assets/img_icon/animal_house_icon.png')}
              style={styles.toggleBtnImage}
            />
            <AppText children="내 동물 보기" style={styles.toggleBtnText} />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.toggleButton}>
          {toggle ? openedButton : closedButton}
        </View>
      </View>
      <View style={styles.centerImage}>
        <Image
          style={styles.island}
          source={{uri: islandUri}}
          resizeMode="stretch"
        />
        <Image
          style={styles.tree}
          source={{uri: treeUri}}
          resizeMode="stretch"
        />
        {numberAnimal > 0 && <FastImage
          style={styles.firstAnimal}
          source={{uri: animalUri[0].fileUrl}}
          resizeMode={FastImage.resizeMode.contain}
        />}
        {numberAnimal > 1 && <FastImage
          style={styles.secondAnimal}
          source={{uri: animalUri[1].fileUrl}}
          resizeMode={FastImage.resizeMode.contain}
        />}
        {numberAnimal > 2 && <FastImage
          style={styles.thirdAnimal}
          source={{uri: animalUri[2].fileUrl}}
          resizeMode={FastImage.resizeMode.contain}
        />}
        {numberAnimal > 3 && <FastImage
          style={styles.fourthAnimal}
          source={{uri: animalUri[3].fileUrl}}
          resizeMode={FastImage.resizeMode.contain}
        />}
        {numberAnimal > 4 && <FastImage
          style={styles.fifthAnimal}
          source={{uri: animalUri[4].fileUrl}}
          resizeMode={FastImage.resizeMode.contain}
        />}
      </View>
      <View style={styles.ploggingButton}>
        <AppButton
          children="산책하기"
          onPress={() => navigation.navigate('PickPloggingFriend')}
          variant="picnic"
        />
      </View>
    </ImageBackground>
  );
}
