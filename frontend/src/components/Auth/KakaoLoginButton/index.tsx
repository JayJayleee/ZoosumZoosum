import { Image, TouchableOpacity } from "react-native"
import * as KakaoLogin from '@react-native-seoul/kakao-login'

export default function KakaoLoginButton() {

  const getProfile = () => {
    KakaoLogin.getProfile().then((profile) => {
      console.log("프로필 정보 :", profile);
      console.log("GetProfile Success", JSON.stringify(profile));
    }).catch((error) => {
      console.log(`GetProfile Fail(code:${error.code})`, error.message);
    })
  }

  const KakaoLoginHandler = () => {
    KakaoLogin.login().then((result) => {
      console.log("로그인 내역 :", result);
      console.log("Login Success", JSON.stringify(result));
      getProfile();
    }).catch((error) => {
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log("Login Cancelled", error.message);
      } else {
        console.log(`Login Fail(code:${error.code})`, error.message);
      }
    })
  }

  return (
  <TouchableOpacity onPress={() => KakaoLoginHandler()}>
    <Image source={require("@/assets/kakao_login_button.png")}/>
  </TouchableOpacity>
  )
}