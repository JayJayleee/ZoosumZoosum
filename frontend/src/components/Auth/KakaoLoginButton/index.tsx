import { Image, TouchableOpacity } from "react-native"
import * as KakaoLogin from '@react-native-seoul/kakao-login'
import { getStorage } from '@/apis/index';
import { loginFtn } from "@/apis/login";

// 로그인 페이지에서 전달받은 함수를 타입을 정의
interface PropsType {
  moveUserInfoPage: () => void;
  moveMainPage: () => void;
  checkState: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

// 프로필을 통해 얻은 id와 이메일의 타입을 정의
interface ProfileType {
  id: string;
  email: string;
  socialType: string;
}

export default function KakaoLoginButton({moveUserInfoPage, moveMainPage, checkState, setState}: PropsType) {

  const checkLoginState = () => {
    if (getStorage("Accesstoken") !== null) {
      moveMainPage();
    } else {
      setState(true);
    }
  }

  const isFirstLogin = async (data: ProfileType) => {
    const Result = await loginFtn(data);
    console.log("api 연결 결과 :", Result);
    // moveUserInfoPage();
  }

  // 카카오 로그인 성공 시, 해당 계정의 id와 이메일을 가져오는 함수
  const getProfile = () => {
    KakaoLogin.getProfile().then((profile) => {
      console.log("GetProfile Success", JSON.stringify(profile));
      const data = {id: profile.id, email: profile.email, socialType: "Kakao"}
      isFirstLogin(data);
    }).catch((error) => {
      console.log(`GetProfile Fail(code:${error.code})`, error.message);
    })
  }

  // 카카오 로그인 화면을 띄우고, 로그인 성공 시 access token과 refresh token을 가져오는 함수
  const KakaoLoginHandler = () => {
    KakaoLogin.login().then((result) => {
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
  // 카카오 로그인 버튼 컴포넌트로 이미지를 클릭했을 때 효과를 넣기 위해 TouchableOpacity로 감싸놓음
  <TouchableOpacity onPress={checkState? () => KakaoLoginHandler() : () => checkLoginState()}>
    <Image source={require("@/assets/loginpage_image/kakao_login_button.png")}/>
  </TouchableOpacity>
  )
}