import { Wave } from "@/components/ui/animation/LottieEffect";
import { View, Text } from 'react-native';
import FastImage from "react-native-fast-image";
import AppText from "../Text";

export default function Spinner() {
  const textExample = [
    "섬에 들어갈 배 기다리는 중...",
    "포근한 바람이 편지를 배달하는 중...",
    "건너가기 위한 무지개 다리 건설 중...",
    "신비한 섬의 동물들을 초대하는 중...",
    "별빛 아래 비밀을 채집하는 중...", 
    "잠들어 있는 숲을 깨우는 중...",
    "파도 소리를 듣는 중...",
    "포근한 안개를 헤치는 중...",
    "별똥별을 소망에 싣는 중...",
    "당신의 도착 소식을 전달하는 중...",
  ]

  let tmp = Math.floor(Math.random() * 10); 

  return (
    <View style={{backgroundColor: '#8BCCCB', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FastImage source={require('@/assets/loginpage_image/zooisland_logo.png')} style={{ width: 300, height: 300 }} />
      <Wave />
      <AppText style={{color: 'white', fontSize: 25, top: -50}}>
        {textExample[tmp]}
      </AppText>
    </View>
  )
}

