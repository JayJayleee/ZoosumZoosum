import Toast, {BaseToast, ErrorToast} from "react-native-toast-message";
import { windowHeight } from "./styles";
import FastImage from "react-native-fast-image";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{backgroundColor: '#34D399', borderLeftColor: '#34D399'}}
      text1Style={{fontSize: 20, fontFamily: 'NPSfont_bold', color: 'white'}}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{backgroundColor: '#D94040', borderLeftColor: '#D94040'}}
      text1Style={{fontSize: 20, fontFamily: 'NPSfont_bold', color: 'white'}}
    />
  ),
  end: (props: any) => (
    <BaseToast
      {...props}
      style={{backgroundColor: '#2C9261', borderLeftColor: '#2C9261', justifyContent: 'center', alignItems: 'center', zIndex: 100, position: 'absolute', top: -windowHeight*0.01,}}
      text1Style={{fontSize: 20, fontFamily: 'NPSfont_bold', color: 'white'}}
    />
  ),
  notSelect: (props: any) => (
    <BaseToast
      {...props}
      style={{backgroundColor: '#2C9261', borderLeftColor: '#2C9261', justifyContent: 'center', alignItems: 'center', zIndex: 999, position: 'absolute', bottom: windowHeight * 0.1}}
      text1Style={{fontSize: 20, fontFamily: 'NPSfont_bold', color: 'white'}}
    >
      <FastImage source={require("@/assets/img_icon/forbidden.png")}/>
    </BaseToast>
  ),
}