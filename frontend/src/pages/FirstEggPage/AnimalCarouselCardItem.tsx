import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import AppText from '../../components/ui/Text';
import AppButton from '../../components/ui/Button';
import styles from '../../components/ui/Carousel/styles';
import {AnimalCarouselCardItemProps} from '@/types/plogging';
import {useMutation} from '@tanstack/react-query';
import {ShiningEffect} from '@/components/ui/Carousel/ShiningEffect';
import {EggName, FirstEggName} from '@/apis/tutorial';
import {
  changeEggCrack,
  changeEggWhite,
  changeEggBorn,
  pause,
} from '@/constants/sound';
import { setStorage } from '@/apis';

export function AnimalCarouselCardItem({
  item,
  index,
  activeIndex,
  onNamingComplete,
  gotomain,
  isFirstLogin,
}: AnimalCarouselCardItemProps) {
  const [headerText, setHeaderText] = useState('어떤 정령이 들어있을까요?');
  const [imageSrc, setImageSrc] = useState<any>('');
  const [showInput, setShowInput] = useState(false);
  const [animalName, setAnimalName] = useState('');
  const [animalId, setAnimalId] = useState<number | undefined>(0);
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [showEgg, setShowEgg] = useState(true);
  const [savedName, setSavedName] = useState<string | undefined>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const [imageSource, setImageSource] = useState(
    require('@/assets/img_icon/egg.png'),
  );
  // 흰색 필터
  const tintColorAnim = useRef(new Animated.Value(0)).current;
  // 흔들리는 효과
  const shakingAnimation = useRef(new Animated.Value(0)).current;
  // console.log(animalId);
  // const queryClient = useQueryClient();
  const createMutation = useMutation(EggName, {
    onSuccess: data => {
      // 이름 저장 성공 시 수행할 작업
      console.log('이름 바꾸기 성공', data);
      const nameToSave =
        animalName?.trim() !== '' ? animalName : item?.animalName;
      setHeaderText(`${nameToSave}(이)가 태어났어요!`);
      setIsNameSaved(true);
      setSavedName(nameToSave ? nameToSave : item?.animalName);
      if (onNamingComplete && isNameSaved && nameToSave) {
        onNamingComplete(nameToSave); // 부모 컴포넌트의 상태를 업데이트하는 콜백 호출
      }
    },
    onError: error => {
      console.log('이름 바꾸기 실패', error);
    },
  });

  const firstEggCreateMutation = useMutation(FirstEggName, {
    onSuccess: data => {
      // 이름 저장 성공 시 수행할 작업
      console.log('최초 이름 바꾸기 성공', data);

      const nameToSave =
        animalName?.trim() !== '' ? animalName : item?.animalName;
      setHeaderText(`${nameToSave}(이)가 태어났어요!`);
      setIsNameSaved(true);
      setSavedName(nameToSave ? nameToSave : item?.animalName);
      if (onNamingComplete && isNameSaved && nameToSave) {
        onNamingComplete(nameToSave); // 바로 상단의 정령 이름 바꿔주기
      }
    },
    onError: error => {
      console.log('이름 바꾸기 실패', error);
    },
  });

  const handleSaveName = () => {
    if (item && animalId !== undefined) {
      const nameToSave =
        animalName?.trim() !== '' ? animalName : item?.animalName;
      if (isFirstLogin == true) {
        console.log('첫번째 egg');
        firstEggCreateMutation.mutate({
          animalId: animalId,
          userAnimalName: nameToSave,
        });
      } else {
        console.log('두번째 egg');
        createMutation.mutate({
          animalId: animalId,
          userAnimalName: nameToSave,
        });
      }
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 실행되는 코드 (예: API 호출 등)

    return () => {
      // 컴포넌트가 언마운트 될 때 실행되는 클린업 함수
      // 여기에 상태 초기화 로직을 추가
      setHeaderText('어떤 정령이 들어있을까요?');
      setImageSrc('');
      setShowInput(false);
      setAnimalName('');
      setAnimalId(undefined);
      setIsNameSaved(false);
      setShowEgg(true);
      setSavedName('');
      setTouchCount(0);
      setImageSource(require('@/assets/img_icon/egg.png'));
      // 그 외 필요한 상태들도 여기서 초기화
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // 알 9번 누르면 하얘지는 부분
  useEffect(() => {
    if (touchCount === 9) {
      Animated.timing(tintColorAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }
  }, [touchCount]);

  const [whiteImageOpacity, setWhiteImageOpacity] = useState(
    new Animated.Value(0),
  );

  useEffect(() => {
    if (touchCount === 9) {
      changeEggWhite();
      Animated.timing(whiteImageOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
  }, [touchCount]);

  // 9번째에서 1.5초 뒤에 10으로 넘어가는데 이때 정령이 태어남
  useEffect(() => {
    const endFtn = async () => {
      if (index === activeIndex && touchCount === 9) {
      const timer = setTimeout(() => {
        setTouchCount(10);
      }, 1500);
      return () => clearTimeout(timer);
      }
      if (index === activeIndex && touchCount === 10) {
        changeEggBorn();
        setShowEgg(false);
        setHeaderText(`${item?.animalName}(이)가 태어났어요!`);
        setImageSrc({uri: item?.fileUrl});
        setAnimalId(item?.animalId);
        setShowInput(true);
        await setStorage("isHave", "Y")
      }
    }

    endFtn();
  }, [activeIndex, item, touchCount]);

  const handlePress = () => {
    if (touchCount >= 9) {
      return;
    }
    setTouchCount(prevCount => {
      const newCount = prevCount + 1;
      //진동
      Vibration.vibrate();
      // 터치 횟수에 따라 이미지 소스 변경됨 여기에 소리넣으면 될 듯
      if (newCount === 1) {
        changeEggCrack();
        setImageSource(require('@/assets/img_icon/egg_crack1.png'));
      } else if (newCount === 4) {
        setImageSource(require('@/assets/img_icon/egg_crack2.png'));
        changeEggCrack();
      } else if (newCount === 7) {
        setImageSource(require('@/assets/img_icon/egg_crack3.png'));
        changeEggCrack();
      }

      // 애니메이션 실행
      Animated.sequence([
        Animated.timing(shakingAnimation, {
          toValue: 1,
          duration: 50,
          useNativeDriver: false,
        }),
        Animated.timing(shakingAnimation, {
          toValue: -1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(shakingAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: false,
        }),
      ]).start();

      return newCount;
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.giftcarouselcontainer, {flex: 1}]}
      key={index}>
      <ScrollView
        contentContainerStyle={[
          styles.centerContent,
          {flexGrow: 1, paddingBottom: isKeyboardVisible ? 100 : 0},
        ]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.centeredView}>
          {!isKeyboardVisible && (
            <AppText style={styles.header}>{headerText}</AppText>
          )}
          {!isKeyboardVisible && showEgg && (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                // backgroundColor: 'red',
              }}
              onPress={handlePress}>
              <View style={{position: 'relative'}}>
                <Animated.Image
                  source={imageSource}
                  key={activeIndex}
                  style={{
                    width: '100%',
                    zIndex: 10,
                    resizeMode: 'contain',
                    transform: [
                      {
                        rotate: shakingAnimation.interpolate({
                          inputRange: [-1, 1],
                          outputRange: ['-5deg', '5deg'],
                        }),
                      },
                    ],
                    opacity: whiteImageOpacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0], // 원본 이미지는 점차 투명해짐
                    }),
                  }}
                />
                <Animated.Image
                  source={require('@/assets/img_icon/egg_white.png')} // 흰색 버전의 이미지 경로
                  style={{
                    width: '100%',
                    zIndex: 10,
                    resizeMode: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: [
                      {
                        rotate: shakingAnimation.interpolate({
                          inputRange: [-1, 1],
                          outputRange: ['-5deg', '5deg'],
                        }),
                      },
                    ],
                    opacity: whiteImageOpacity,
                  }}
                />
              </View>
              {touchCount >= 9 && <ShiningEffect style={{width: '105%'}} />}
            </TouchableOpacity>
          )}

          {!isKeyboardVisible && imageSrc && (
            <Image source={imageSrc} style={styles.animalimage} />
          )}
          {!isKeyboardVisible && imageSrc && (
            <ShiningEffect style={{width: '105%'}} />
          )}
          {showInput && (
            <View style={styles.inputcontainer}>
              {isNameSaved ? (
                <AppText style={styles.animalName}>{savedName}</AppText>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    onChangeText={setAnimalName}
                    placeholder={item?.animalName}
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  />
                  <AppButton
                    variant="animalName"
                    children="너의 이름은..."
                    onPress={handleSaveName}
                  />
                </>
              )}
            </View>
          )}
          {onNamingComplete && isNameSaved && gotomain ? (
            <AppButton
              children="섬으로 가기"
              variant="animalName"
              onPress={() => {
                setTouchCount(0);
                setHeaderText('어떤 정령이 들어있을까요?');
                setImageSrc('');
                setShowInput(false);
                setAnimalName('');
                setAnimalId(undefined);
                setIsNameSaved(false);
                setShowEgg(true);
                setSavedName('');
                setTouchCount(0);
                setWhiteImageOpacity(new Animated.Value(0));
                setImageSource(require('@/assets/img_icon/egg.png'));
                gotomain();
              }}
            />
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
