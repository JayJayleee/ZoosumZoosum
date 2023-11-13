import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityDataType} from '@/types/plogging';
import {Platform} from 'react-native';

// storage에 저장된 token 가져오기(get)
const getStoredToken = async () => {
  const token = await AsyncStorage.getItem('AccessToken');
  if (!token) {
    throw new Error('Token is not available');
  }
  return token;
};

export async function PloggingResultFtn(activityData: ActivityDataType) {
  console.log('2 받은 직후:', activityData);

  // 사용자 토큰 가져오기
  const token = await getStoredToken();

  // FormData 생성
  const formData = new FormData();

  // activityRequestDto를 문자열로 변환하여 추가
  formData.append(
    'activityRequestDto',
    JSON.stringify(activityData.activityRequestDto),
  );

  formData.append('animalId', JSON.stringify(activityData.animalId));

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
    // Fetch로 POST 요청 보내기
    const response = await fetch('https://zoosum.co.kr/api/activity', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData = await response.json();
    console.log('요청 결과:', responseData);
    return responseData;
  } catch (e) {
    console.error('활동과 사진 업로드에 실패했습니다.', e);
  }
}

// export async function TrashImgResultFtn(Img: string) {
//   console.log('받은 직후:', Img);

//   // 사용자 토큰 가져오기
//   const token = await getStoredToken();

//   // FormData 생성
//   const formData = new FormData();

//   const now = new Date();
//   const TrashfileName = `trash-${now.getFullYear()}-${
//     now.getMonth() + 1
//   }-${now.getDate()}-${now.getHours()}`;

//   // 이미지가 있을 경우 formData에 추가
//   if (Img) {
//     formData.append('file', {
//       uri: Img,
//       name: `${TrashfileName}.jpg`,
//       type: 'image/jpeg',
//     });
//   }

//   try {
//     // Axios로 POST 요청 보내기
//     const response = await axios.post('http://zoosum.co.kr:8000/ai', formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         // 'Content-Type': 'multipart/form-data'는 axios에서 자동으로 설정됩니다.
//       },
//     });

//     console.log('요청 결과:', response.data);
//     return response.data;
//   } catch (e) {
//     console.error('활동과 사진 업로드에 실패했습니다.', e);
//   }
// }

export async function TrashImgResultFtn(
  Img: string,
  retries = 3,
  interval = 2000,
  setIsLoading: (isLoading: boolean) => void,
) {
  setIsLoading(true);
  const formData = new FormData();

  const now = new Date();
  const TrashfileName = `trash-${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}`;

  formData.append('file', {
    uri: Img,
    name: `${TrashfileName}.jpg`,
    type: 'image/jpeg',
  });

  const token = await getStoredToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
    // Add your headers here
  };

  try {
    const response = await axios.post('http://zoosum.co.kr:8000/ai', formData, {
      headers,
    });
    setIsLoading(false);
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Upload failed, retrying in ${interval}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, interval));
      return TrashImgResultFtn(Img, retries - 1, interval, setIsLoading);
    } else {
      setIsLoading(false);
      console.error('Failed to upload image', error);
    }
  }
}

export async function TrashImgResultReturnFtn(
  Img: string,
  retries = 3,
  interval = 3000,
  setIsLoading: (isLoading: boolean) => void,
) {
  setIsLoading(true);
  const formData = new FormData();

  const now = new Date();
  const TrashfileName = `trash-${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}`;

  formData.append('file', {
    uri: Img,
    name: `${TrashfileName}.jpg`,
    type: 'image/jpeg',
  });

  formData.append('leftRightPercent', 0.01);
  formData.append('topPercentPercent', 0.01);
  formData.append('bottomPercentPercent', 0.1);

  const token = await getStoredToken();

  const headers = {
    Authorization: `Bearer ${token}`,

    'Content-Type': 'multipart/form-data',
  };

  // 반복 로직 구현
  async function attemptUpload(retryCount: number) {
    try {
      const response = await axios.post(
        'http://zoosum.co.kr:8000/ai/image',
        formData,
        {headers},
      );
      setIsLoading(false);
      return response.data; // 성공 응답시 결과 반환
    } catch (error) {
      if (retryCount > 0) {
        console.log(`Upload failed, retrying in ${interval}ms...`, error);
        await new Promise(resolve => setTimeout(resolve, interval));
        return attemptUpload(retryCount - 1); // 재귀적으로 재시도
      } else {
        setIsLoading(false);
        console.error('Failed to upload image after multiple attempts', error);
        throw error; // 모든 시도 실패시 에러 발생
      }
    }
  }

  return attemptUpload(retries);
}
