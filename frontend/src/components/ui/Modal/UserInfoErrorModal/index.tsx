import ModalComponent from ".."
import AppText from "../../Text"
import {StyleProp, TextStyle} from "react-native"

type PropsType = {
  isModalVisible: boolean;
  onClose: () => void;
  onRequestClose: () => void;
  innerText: string;
  textStyle: StyleProp<TextStyle>;
}

// 에러 문구를 띄울 모달 창 생성
export const ErrorModal = ({isModalVisible, onClose, onRequestClose, innerText, textStyle}: PropsType) => {
  return (
  <ModalComponent
    isVisible={isModalVisible}
    onClose={onClose}
    onRequestClose={onRequestClose}
    buttonInnerText={"닫기"}
    >
      <AppText children={innerText} style={textStyle}/>
  </ModalComponent>
  )
}