import { Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import { styles } from "./styles";
import FastImage from 'react-native-fast-image';
import { useState } from 'react';
import AppText from '../../Text';

type Props = {
  closeFnt: () => void;
}

export const UseMethodModal = ({closeFnt}: Props) => {
  const [isPage, setPage] = useState<number>(0);

  const clickEvent = () => {
    if (isPage < pageList.length - 1) {
      setPage(isPage + 1);
    } else {
      closeFnt();
      setPage(0);
    }
  }

  const firstImage = <>
  <FastImage source={require("@/assets/useMethod_image/tutorial_highlight_1.jpg")} style={styles.image} />
  <AppText style={styles.firstUpperText}>
      상단의 메뉴를 통해 사용자의 현재 활동 내역을 알려줍니다.
    </AppText>
    <AppText style={styles.firstLowerText}>
      하단의 메뉴바를 통해 다양한 정보를 볼 수 있습니다.
    </AppText>
  </>

  const secondImage = <>
    <FastImage source={require("@/assets/useMethod_image/tutorial_highlight_2.jpg")} style={styles.image} />
    <AppText style={styles.secondUpperText}>
      내가 꾸민 섬의 모습을 볼 수 있습니다.
    </AppText>
    <AppText style={styles.secondLowerText}>
      내 정령들을 클릭해 다양한 모습을 구경하세요!
    </AppText>
  </>

  const thirdImage = <>
    <FastImage source={require("@/assets/useMethod_image/tutorial_highlight_3.jpg")} style={styles.image} />
    <AppText style={styles.thirdUpperText}>
      버튼을 클릭하여 플로깅을 시작하세요.
    </AppText>
  </>

  const fourthImage = <>
  <FastImage source={require("@/assets/useMethod_image/tutorial_highlight_4.jpg")} style={styles.image} />
  <AppText style={styles.fourthUpperText}>
    플로깅을 떠날 정령을 볼 수 있습니다.
  </AppText>
  </>

  const fifthImage = <>
  <FastImage source={require("@/assets/useMethod_image/tutorial_highlight_5.jpg")} style={styles.image} />
  <AppText style={styles.fifthUpperText}>
    버튼을 클릭하여 같이 나갈 정령을 바꾸거나 위의 정령과 함께 플로깅을 떠날 수 있습니다.
  </AppText>
  </>

  const sixthImage = <>
  <FastImage source={require("@/assets/useMethod_image/tutorial_highlight_6.jpg")} style={styles.image} />
  <AppText style={styles.sixTopText}>
    버튼을 클릭하여 플로깅을 종료합니다.
  </AppText>
  <AppText style={styles.sixMiddleText}>
    현재 나의 위치가 선택된 정령과 함께 나타납니다.
  </AppText>
  <AppText style={styles.sixBottomText}>
    버튼을 클릭하여 주운 쓰레기를 카메라로 찍습니다.
  </AppText>
  <AppText style={styles.sixLowText}>
    현재 플로깅 현황을 알려줍니다.
  </AppText>
  </>

  const seventhImage = <>
  <FastImage source={require("@/assets/useMethod_image/tutorial_4.jpg")} style={styles.image} />
  <AppText style={styles.sevenUpperText}>
    볼륨 버튼이나 하단의 버튼을 눌러서 촬영할 수 있습니다.
  </AppText>
  <AppText style={styles.sevenLowerText}>
    화면에 나온 가이드에 따라서 촬영을 진행합니다.
  </AppText>
  </>

  const eightthImage = <>
  <FastImage source={require("@/assets/useMethod_image/tutorial_highlight_7.jpg")} style={styles.image} />
  <AppText style={styles.eightTopText}>
    버튼을 클릭해서 찍은 사진을 볼 수 있습니다.
  </AppText>
  <AppText style={styles.eightMiddleText}>
    찍은 사진에 있는 쓰레기의 종류와 개수를 알려줍니다. 활성화된 이미지를 클릭해서 사진을 볼 수 있습니다.
  </AppText>
  <AppText style={styles.eightBottomText}>
    버튼을 클릭하여 다시 찍거나 지도 화면으로 갈 수 있습니다.
  </AppText>
  </>

  const pageList = [firstImage, secondImage, thirdImage, fourthImage, fifthImage, sixthImage, seventhImage, eightthImage]

  return <TouchableOpacity activeOpacity={1} style={styles.background} onPress={clickEvent}>
    <AppText style={styles.upperInfo}>
      {isPage === pageList.length - 1? "화면 클릭 시, 나의 섬으로 돌아갑니다." :"화면 클릭 시, 다음 페이지로 넘어갑니다."}
    </AppText>
    {pageList[isPage]}

    <TouchableOpacity onPress={() => closeFnt()} style={styles.exit}>
      <FastImage tintColor={"#FFFFFF"} source={require("@/assets/img_icon/x_mark.png")} style={{width: '100%', height: '100%'}} />
    </TouchableOpacity>
  </TouchableOpacity>
};