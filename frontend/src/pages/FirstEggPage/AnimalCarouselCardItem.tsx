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
import {Egg} from '../../components/ui/animation/LottieEffect';
import {AnimalCarouselCardItemProps} from '@/types/plogging';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {ShiningEffect} from '@/components/ui/Carousel/ShiningEffect';
import {EggName, FirstEggName} from '@/apis/tutorial';

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
  const tintColorAnim = useRef(new Animated.Value(0)).current;

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
      // 이름 저장 실패 시 수행할 작업
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
        onNamingComplete(nameToSave); // 부모 컴포넌트의 상태를 업데이트하는 콜백 호출
      }
    },
    onError: error => {
      // 이름 저장 실패 시 수행할 작업
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

  useEffect(() => {
    if (touchCount === 9) {
      // tintColor를 서서히 흰색으로 변경하는 애니메이션 시작
      Animated.timing(tintColorAnim, {
        toValue: 1,
        duration: 2000, // 색상 변경 지속 시간
        useNativeDriver: false, // tintColor는 네이티브 드라이버를 사용할 수 없음
      }).start();
    }
  }, [touchCount]);

  // tintColor를 interpolate를 사용하여 값으로 변환

  const [whiteImageOpacity, setWhiteImageOpacity] = useState(
    new Animated.Value(0),
  );

  useEffect(() => {
    if (touchCount === 9) {
      Animated.timing(whiteImageOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
  }, [touchCount]);

  useEffect(() => {
    if (index === activeIndex && touchCount === 9) {
      // setImageStyle({tintColor: 'white'});
      const timer = setTimeout(() => {
        setTouchCount(10);
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (index === activeIndex && touchCount === 10) {
      setShowEgg(false);
      setHeaderText(`${item?.animalName}(이)가 태어났어요!`);
      setImageSrc({uri: item?.fileUrl});
      setAnimalId(item?.animalId);
      setShowInput(true);
    }
  }, [activeIndex, item, touchCount]);

  const shakingAnimation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (touchCount >= 9) {
      return;
    }
    setTouchCount(prevCount => {
      const newCount = prevCount + 1;
      Vibration.vibrate();
      // 터치 횟수에 따라 이미지 소스 변경
      if (newCount === 1) {
        setImageSource(require('@/assets/img_icon/egg_crack1.png'));
      } else if (newCount === 4) {
        setImageSource(require('@/assets/img_icon/egg_crack2.png'));
      } else if (newCount === 7) {
        setImageSource(require('@/assets/img_icon/egg_crack3.png'));
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
                    opacity: whiteImageOpacity, // 흰색 이미지는 점차 불투명해짐
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
                gotomain();
              }}
            />
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
