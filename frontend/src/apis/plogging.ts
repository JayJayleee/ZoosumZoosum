import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityDataType} from '@/types/plogging';

// storage에 저장된 token 가져오기(get)
const getStoredToken = async () => {
  const token = await AsyncStorage.getItem('AccessToken');
  if (!token) {
    throw new Error('Token is not available');
  }
  return token;
};

export async function PloggingResultFtn(activityData: ActivityDataType) {
  // console.log('받은 직후:', activityData);

  // 사용자 토큰 가져오기
  const token = await getStoredToken();

  // FormData 생성
  const formData = new FormData();

  // activityRequestDto를 문자열로 변환하여 추가
  formData.append(
    'activityRequestDto',
    JSON.stringify(activityData.activityRequestDto),
  );

  // 파일 경로에서 "file://" 접두어 제거
  // let cleanFilePath = activityData.activityImg.replace('file://', '');

  const now = new Date();
  const fileName = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}`;

  // 이미지가 있을 경우 formData에 추가
  if (activityData.activityImg) {
    formData.append('activityImg', {
      uri: activityData.activityImg,
      name: `${fileName}.jpg`,
      type: 'image/jpeg',
    });
  }

  try {
    // Axios로 POST 요청 보내기
    const response = await axios.post(
      'https://zoosum.co.kr/api/activity',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data'는 axios에서 자동으로 설정됩니다.
        },
      },
    );

    // console.log('요청 결과:', response.data);
    return response.data;
  } catch (e) {
    console.error('활동과 사진 업로드에 실패했습니다.', e);
  }
}

export async function TrashImgResultFtn(Img: string) {
  console.log('받은 직후:', Img);

  // 사용자 토큰 가져오기
  const token = await getStoredToken();

  // FormData 생성
  const formData = new FormData();

  const now = new Date();
  const TrashfileName = `trash-${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}`;

  // 이미지가 있을 경우 formData에 추가
  if (Img) {
    formData.append('file', {
      uri: Img,
      name: `${TrashfileName}.jpg`,
      type: 'image/jpeg',
    });
  }

  try {
    // Axios로 POST 요청 보내기
    const response = await axios.post('http://zoosum.co.kr:8000/ai', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'는 axios에서 자동으로 설정됩니다.
      },
    });

    console.log('요청 결과:', response.data);
    return response.data;
  } catch (e) {
    console.error('활동과 사진 업로드에 실패했습니다.', e);
  }
}
