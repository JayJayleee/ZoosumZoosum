export type sendAccountContent = {
  id: number;
  email: string;
  socialType: string;
}

export type sendNickname = {
  nickname: string;
}

export type sendUserInfoContent = {
  nickname: string;
  region: string;
}

// 유저 정보 지역 타입 정의
export type regionObj = {
  [key: string]: string;
}

// 프로필을 통해 얻은 id와 이메일의 타입을 정의
export interface ProfileType {
  id: number;
  email: string;
  socialType: string;
}