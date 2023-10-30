import { Image, TouchableOpacity } from "react-native"

export default function NaverLoginButton() {

  const NaverLoginHandler = () => {
    console.log("네이버 로그인하기")
  }

  return (
  <TouchableOpacity onPress={() => NaverLoginHandler()}>
    <Image source={require("@/assets/naver_login_button.png")}/>
  </TouchableOpacity>
  )
}