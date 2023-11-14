import { Image, TouchableOpacity } from "react-native"
import * as KakaoLogin from '@react-native-seoul/kakao-login'
import { getStorage, setStorage } from '@/apis/index';
import { loginFtn } from "@/apis/login";
import { ProfileType } from "@/types/login";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/constants/toastConfig";
import { windowHeight } from "@/constants/styles";

// 로그인 페이지에서 전달받은 함수를 타입을 정의
interface PropsType {
  moveUserInfoPage: () => void;
  moveMainPage: () => void;
  moveTutoPage: () => void;
  checkState: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function KakaoLoginButton({moveUserInfoPage, moveMainPage, moveTutoPage, checkState, setState}: PropsType) {

  let token = null;
  let haveAnimal = null;

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: "카카오 로그인에 실패하였습니다.",
      position: "bottom",
      bottomOffset: windowHeight * 0.5,
      visibilityTime: 2000,
    })
  }
  
  // 버튼이 보이지 않을 때, 해당 영역 클릭 시 실행하는 함수
  const checkLoginState = async () => {
    token = await getStorage("AccessToken");
    haveAnimal = await getStorage("isHave");

    console.log(haveAnimal)

    if (token !== null) {
      if(haveAnimal !== null) {
        moveMainPage();
      } else {
        moveTutoPage();
      }
    } else {
      setState(true);
    }
  }

  // 첫 로그인 후, 유저 정보 입력 페이지로 이동하도록 하는 함수
  const isFirstLogin = async (data: ProfileType) => {
    // 로그인 함수를 통해 얻은 결과를 json 형식으로 변환하기
    const response = await loginFtn(data)
    const result = await response.json();
    // 받은 유저 토큰을 기본적으로 storage에 저장
    await setStorage("AccessToken", result.accessToken)

    if (result.isFirst === "N") {
      await setStorage("Nickname", result.nickname)
      moveMainPage();
    } else {
      moveUserInfoPage();
    }
  }

  // 카카오 로그인 성공 시, 해당 계정의 id와 이메일을 가져오는 함수
  const getProfile = () => {
    KakaoLogin.getProfile().then((profile) => {
      // console.log("GetProfile Success", JSON.stringify(profile));
      const data: ProfileType = {id: Number(profile.id), email: profile.email, socialType: "KAKAO"}
      isFirstLogin(data);
    }).catch((error) => {
      console.log(`GetProfile Fail(code:${error.code})`, error.message);
    })
  }

  // 카카오 로그인 화면을 띄우고, 로그인 성공 시 access token과 refresh token을 가져오는 함수
  const KakaoLoginHandler = () => {
    KakaoLogin.login().then((result) => {
      getProfile();
    }).catch((error) => {
      showToast()
      // if (error.code === 'E_CANCELLED_OPERATION') {
      //   console.log("Login Cancelled", error.message);
      // } else {
      //   console.log(`Login Fail(code:${error.code})`, error.message);
      // }
    })
  }

  return (
    // 카카오 로그인 버튼 컴포넌트로 이미지를 클릭했을 때 효과를 넣기 위해 TouchableOpacity로 감싸놓음
  <>
    <Toast config={toastConfig} />
    <TouchableOpacity onPress={checkState? () => KakaoLoginHandler() : () => checkLoginState()}>
      <Image source={require("@/assets/loginpage_image/kakao_login_button.png")}/>
    </TouchableOpacity>
  </>
  )
}