import React from 'react';
import {StyleProp, TextStyle, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AppText from '../Text';

type ButtonProps = {
  children?: string;
  variant?: 'default' | 'button' | 'animalName' | 'primary' | 'pickfriend'| 'gotoisland' | "selectItem" | 'carouselBtn' | 'picnic' | 'ploggingRST' | 'region' | 'nickname' ;
  onPress: () => void;
};

export default function AppButton({
  // props로 전달받을 수 있는 값
  // 1. variant: 스타일시트 이름. 위의  variant안에 정의된 것을 쓰거나, 직접 만들어서 추가 가능
  // 2. children: 버튼에 들어가는 텍스트를 추가할 수 있음
  // 3. onPress: 버튼을 클릭했을 때 실행되는 함수를 추가할 수 있음

  variant = 'default', // 기본적으로 variant는 default로 되어있다. 따라서 암것도 안쓰면 이게 되겠죠?
  children,
  onPress,
}: ButtonProps) {
  // 현재 버튼 컴포넌트가 아닌 TouchableOpacity와 Text로 구성되어있음.
  // 스타일시트를 작성 한 다음 variant의 case를 추가해주면 된다.위에 타입에 추가하는 것도 잊지말기
  let variantStyle;
  let textStyle;
  switch (variant) {
    case 'default':
      variantStyle = styles.default;
      textStyle = styles.defaultText;
      break;
    case 'primary':
      variantStyle = styles.primary;
      textStyle = styles.defaultText;
      break;
    case 'animalName':
      variantStyle = styles.animalName;
      textStyle = styles.animalNameText;
      break;
    case 'carouselBtn':
      variantStyle = styles.carouselBtn;
      textStyle = styles.animalNameText;
      break;
    case 'pickfriend':
      variantStyle = styles.pickfriend;
      textStyle = styles.pickfriendText;
      break;
    case 'gotoisland':
      variantStyle = styles.gotoisland;
      textStyle = styles.gotoislandText;
      break;
    case 'selectItem':
      variantStyle = styles.selectItem;
      textStyle = styles.selectItemText;
      break;
    case 'picnic':
      variantStyle = styles.picnic;
      textStyle = styles.picnicText;
      break;
    case 'ploggingRST':
      textStyle = styles.gotoislandText;
      variantStyle = styles.ploggingRST;
      break;
    case 'region':
      variantStyle = styles.region;
      textStyle = styles.userInfoText;
      break;
    case 'nickname':
      variantStyle = styles.nickname;
      textStyle = styles.userInfoText;
      break;
    case 'button':
      variantStyle = styles.button;
      textStyle = styles.buttonText;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={variantStyle}
      activeOpacity={0.9}>
      <AppText style={textStyle}>{children}</AppText>
    </TouchableOpacity>
  );
}
