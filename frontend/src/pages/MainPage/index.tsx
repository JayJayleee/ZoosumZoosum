import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {MainScreenProps} from 'typePath';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import AppButton from '@/components/ui/Button';
import {fetchMyIslandInfo, fetchMyStatusInfo, getNewAnimalPose} from '@/apis/Island';
import {statusInfo, islandInfo, timeObj, animalForm} from '@/types/island';
import AppText from '@/components/ui/Text';
import TreeNameModal from '@/components/ui/Modal/TreeNameModal';
import {useQuery} from '@tanstack/react-query';
import {getStorage} from '@/apis';
import Spinner from '@/components/ui/Spinner';
import { AppCloseModal } from '@/components/ui/Modal/CloseModal';


export default function MainPage({navigation}: MainScreenProps) {
  // 나무 심기 모달 창
  const [isTreeModalVisible, setIsTreeModalVisible] = useState<boolean>(false);
  // 소리 on/off 상태를 나타내는 변수 생성
  const [isSoundOn, setSound] = useState<boolean>(true);

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

  // 섬 이미지 링크를 저장할 변수 생성, 초기값은 기본적으로 모든 유저에게 제공되는 기본 섬 링크
  const [islandUri, setIslandUri] = useState<string>(
    'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png',
  );
  // 나무 이미지 링크를 저장할 변수 생성, 초기값은 기본적으로 모든 유저에게 제공되는 기본 나무 링크
  const [treeUri, setTreeUri] = useState<string>(
    'https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_01.png',
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

  // 메인 페이지에 다시 들어왔을 때 api를 다시 호출하도록 하는 코드
  useEffect(() => {
    navigation.addListener('focus', () => {
      IslandRefetch();
      StatusRefetch();
    });
  }, []);

  // 나무 씨앗이 100개가 넘어가면 나무 모달창을 띄우도록 하는 코드
  useEffect(() => {
    if (getSeed >= 100) {
      setIsTreeModalVisible(true)
    }
  }, [getSeed])

  // 앱 종료 시, 실행하는 함수
  const exitFtn = () => {
    BackHandler.exitApp();
    navigation.navigate('Login');
  };

  // 상단 스탯 api 호출 및 상태 저장하는 코드 생성
  const {
    isLoading: isStatusLoading,
    isError: isStatusError,
    error: StatusError,
    refetch: StatusRefetch,
  } = useQuery<statusInfo>(['mainStatus'], fetchMyStatusInfo, {
    onSuccess: statusContent => {
      setTrash(statusContent.missionTrash);
      setSeed(statusContent.seed);
      setTreeCount(statusContent.treeCount);
      setAllTreeCount(statusContent.treeAllCount);
      setTime({
        hour: statusContent.hour,
        minute: statusContent.minute,
        second: statusContent.second,
      });
      setDistance(statusContent.missionLength);
    },
  });
  // 에러 발생 시, 콘솔 창에 해당 에러 찍는 코드
  if (isStatusError && StatusError) {
    console.log('에러 발생 :', StatusError);
  }

  // 섬과 나무, 동물 링크 api 호출 및 상태 저장하는 코드 생성
  const {
    isLoading: isIslandLoading,
    isError: isIslandError,
    error: IslandError,
    refetch: IslandRefetch,
  } = useQuery<islandInfo>(['mainIsland'], fetchMyIslandInfo, {
    onSuccess: data => {
      setIslandUri(data.islandUrl);
      setTreeUri(data.treeUrl);
      setAnimalUri(data.animalList);
      setNumberAnimal(data.animalList.length);
    },
  });

  // 에러 발생 시, 콘솔 창에 해당 에러 찍는 코드
  if (isIslandError && IslandError) {
    console.log('에러 발생 :', IslandError);
  }
  // 로딩 중일 때, 로딩 페이지를 띄우는 코드
  if (isIslandLoading || isStatusLoading) {
    return <Spinner />;
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

  // 섬에 있는 동물 클릭 시, 다른 이미지를 받아오는 함수
  const newAnimalAct = async (index:number, animalId:number, fileUri:string ) => {
    let newPose = await getNewAnimalPose(animalId, fileUri);
    let copiedItems = [...animalUri];
    copiedItems[index].fileUrl = newPose.fileUrl;
    setAnimalUri(copiedItems);
  }

  return (
    <ImageBackground
      source={require('@/assets/mainpage_image/Background.png')}
      style={styles.center}>
      <TreeNameModal
        isTreeModalVisible={isTreeModalVisible}
        onTreeModalClose={() => setIsTreeModalVisible(false)}
      />
      {isModalVisible && <AppCloseModal isModalVisible={isModalVisible} RequestClose={() => setModalVisible(false)} exitFtn={exitFtn} />}
      <View style={styles.upperStatus}>
        <View style={styles.statusBox}>
          <FastImage
            source={require('@/assets/img_icon/trash_icon.png')}
            style={styles.statusImage}
          />
          <AppText style={styles.statusText}>{getTrash}</AppText>
        </View>
        <View style={styles.statusBox}>
          <FastImage
            source={require('@/assets/img_icon/sand_clock_icon.png')}
            style={styles.statusImage}
          />
          <AppText style={styles.statusText}>
            {getTime.hour}:
            {getTime.minute < 10 ? `0${getTime.minute}` : getTime.minute}:
            {getTime.second < 10 ? `0${getTime.second}` : getTime.second}
          </AppText>
        </View>
        <View style={styles.statusBox}>
          <FastImage
            source={require('@/assets/img_icon/shoe_icon.png')}
            style={styles.statusImage}
          />
          <AppText style={styles.statusText}>{getDistance}km</AppText>
        </View>
        <View style={styles.statusBox}>
          <FastImage
            source={require('@/assets/img_icon/seed_icon.png')}
            style={styles.statusImage}
          />
          <AppText style={styles.statusText}>{getSeed}</AppText>
        </View>
      </View>
      <View style={styles.banner}>
        <View style={styles.bannerBox}>
          <FastImage
            source={require('@/assets/mainpage_image/single_tree_img.png')}
            style={styles.bannerImage}
          />
          <View>
            <AppText children="내가 심은 나무 수" style={styles.bannerText} />
            <AppText style={styles.bannerText}>{treeCount} 그루</AppText>
          </View>
        </View>
        <View style={styles.bannerBox}>
          <FastImage
            source={require('@/assets/mainpage_image/multiple_tree_img.png')}
            style={styles.bannerImage}
          />
          <View>
            <AppText
              children="현재까지 심어진 나무 수"
              style={styles.bannerText}
            />
            <AppText style={styles.bannerText}>{allTreeCount} 그루</AppText>
          </View>
        </View>
      </View>
      <View style={styles.centerImage}>
        <FastImage
          style={styles.island}
          source={{uri: islandUri}}
          resizeMode="stretch">
          <FastImage
            style={styles.tree}
            source={{uri: treeUri}}
            resizeMode="stretch"
          />
          <TouchableOpacity onPress={() => console.log(animalUri[0])} style={styles.firstAnimal}>
            <FastImage
              style={styles.Animal}
              source={{uri: animalUri[0].fileUrl}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          {numberAnimal > 1 && (
            <TouchableOpacity  onPress={() => console.log(animalUri[1])} style={styles.secondAnimal}>
              <FastImage
                style={styles.Animal}
                source={{uri: animalUri[1].fileUrl}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          )}
          {numberAnimal > 2 && (
            <TouchableOpacity onPress={() => console.log(animalUri[2])} style={styles.thirdAnimal}>
              <FastImage
                style={styles.Animal}
                source={{uri: animalUri[2].fileUrl}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          )}
          {numberAnimal > 3 && (
            <TouchableOpacity onPress={() => console.log(animalUri[3])} style={styles.fourthAnimal}>
              <FastImage
                style={styles.Animal}
                source={{uri: animalUri[3].fileUrl}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          )}
          {numberAnimal > 4 && (
            <TouchableOpacity onPress={() => console.log(animalUri[4])} style={styles.fifthAnimal}>
              <FastImage
                style={styles.fifthAnimal}
                source={{uri: animalUri[4].fileUrl}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          )}
        </FastImage>
      </View>
      <View style={styles.ploggingButton}>
        <AppButton
          children="산책하기"
          onPress={() => navigation.navigate('PickPloggingFriend')}
          variant="picnic"
        />
      </View>
      <View style={styles.buttonToggle}>
        <TouchableOpacity
          onPress={() => setSound(!isSoundOn)}
          style={styles.toggleMoveButton}>
          {isSoundOn? <><FastImage
            source={require('@/assets/img_icon/sound_on_icon.png')}
            style={styles.toggleBtnImage}
          />
          <AppText children="소리 끄기" style={styles.toggleBtnText} /></> :
          <><FastImage
            source={require('@/assets/img_icon/sound_off_icon.png')}
            style={styles.toggleBtnImage}
          />
          <AppText children="소리 켜기" style={styles.toggleBtnText} /></>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToRanking}
          style={styles.toggleMoveButton}>
          <FastImage
            source={require('@/assets/img_icon/animal_earth_icon.png')}
            style={styles.toggleBtnImage}
          />
          <AppText children="랭킹 보기" style={styles.toggleBtnText} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToProfile}
          style={styles.toggleMoveButton}>
          <FastImage
            source={require('@/assets/img_icon/profile_icon.png')}
            style={styles.toggleBtnImage}
          />
          <AppText children="나의 프로필" style={styles.toggleBtnText} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToItemList}
          style={styles.toggleMoveButton}>
          <FastImage
            source={require('@/assets/img_icon/island_icon.png')}
            style={styles.toggleBtnImage}
          />
          <AppText children="나의 아이템" style={styles.toggleBtnText} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToAnimalList}
          style={styles.toggleMoveButton}>
          <FastImage
            source={require('@/assets/img_icon/animal_house_icon.png')}
            style={styles.toggleBtnImage}
          />
          <AppText children="내 동물 보기" style={styles.toggleBtnText} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
