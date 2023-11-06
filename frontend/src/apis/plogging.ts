// import {api, Header} from './index';
// import {ActivityDataType} from '@/types/plogging';
// import RNFetchBlob from 'rn-fetch-blob';
// import {FetchBlobResponse} from 'rn-fetch-blob';

// export async function PloggingResultFtn(
//   activityData: ActivityDataType,
// ): Promise<FetchBlobResponse> {
//   console.log('지금 요청하고 있걸랑요?:', activityData);

//   const headers = await Header(); // 헤더 함수 호출

//   const imageUri = activityData.activityImg?.uri;

//     try {
//       // 'file://' 접두어 제거
//       const stats = await RNFetchBlob.fs.stat(imageUri.replace('file://', ''));

//       // multipart/form-data 배열 생성
//       let formData = [
//         {
//           name: 'activityRequestDto',
//           type: 'application/json',
//           data: JSON.stringify(activityData.activityRequestDto),
//         },
//       ];

//       // 이미지가 있을 경우 formData에 추가
//       // if (stats && stats.filename) {
//       formData.push({
//         name: 'activityImg',
//         type: 'image/jpeg',
//         data: RNFetchBlob.wrap(stats.path),
//       });
//       // }

//       console.log('파일 정보:', RNFetchBlob.wrap(stats.path)); // 로그 출력

//       // RNFetchBlob.fetch 호출로 요청 보내기
//       return await RNFetchBlob.fetch(
//         'POST',
//         'https://zoosum.co.kr/api/activity',
//         {
//           ...headers.headers,
//           'Content-Type': 'multipart/form-data',
//         },
//         formData,
//       );
//     } catch (error) {
//       // Error가 인스턴스인 경우
//       if (error instanceof Error) {
//         console.error('아나 에러여', error.message);
//         throw error;
//       } else {
//         // Error 객체가 아닌 경우
//         console.error('An unknown error occurred');
//         throw new Error('An unknown error occurred');
//       }
//     }
//   }

// -------------------일단은 따른 라이브러리 사용해본 코드----------------------

// import RNFetchBlob from 'rn-fetch-blob';
// import {ActivityDataType} from '@/types/plogging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // storage에 저장된 token 가져오기(get)
// const getStoredToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem('AccessToken');
//     if (!token) {
//       throw new Error('Token is not available');
//     }
//     return token;
//   } catch (error) {
//     console.error('Error retrieving the token', error);
//     throw error;
//   }
// };

// export async function PloggingResultFtn(activityData: ActivityDataType) {
//   console.log('받은 직후:', activityData);

//   // 사용자 토큰 가져오기
//   const token = await getStoredToken();
//   const headers = {
//     Accept: '*/*',
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'multipart/form-data',
//     // 'Content-Type': 'multipart/form-data'는 RNFetchBlob에서 자동으로 설정하므로 여기서는 설정하지 않습니다.
//   };

//   // JSON 데이터는 문자열로 변환해서 추가합니다.
//   let data = [
//     {
//       name: 'activityRequestDto',
//       data: JSON.stringify(activityData.activityRequestDto),
//       type: 'application/json',
//     },
//   ];

//   const filePath = activityData.activityImg;
//   let cleanFilePath = filePath;
//   if (cleanFilePath && cleanFilePath.startsWith('file://')) {
//     cleanFilePath = `file://${cleanFilePath.substring(8)};`; // "file://" 는 7글자입니다.
//   }

//   if (cleanFilePath) {
//     data.push({
//       name: 'activityImg',
//       data: RNFetchBlob.wrap(cleanFilePath),
//       type: 'multipart/form-data', // 이것은 실제 이미지 유형에 따라 'image/png' 또는 'image/jpeg' 등이 될 수 있습니다.
//     });
//     // }
//   }

//   try {
//     let response = await RNFetchBlob.fetch(
//       'POST',
//       'https://zoosum.co.kr/api/activity',
//       headers,
//       data,
//     );
//     console.log('요청을 이렇게 하고 있거등요?', data);
//     let result = await response.json();
//     console.log('요청 결과:', result);
//   } catch (e) {
//     console.error('활동과 사진 업로드에 실패했습니다.', e);
//   }
// }

// import {api, Header} from './index';
// import {ActivityDataType} from '@/types/plogging';
// import RNFetchBlob from 'rn-fetch-blob';
// import {FetchBlobResponse} from 'rn-fetch-blob';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // storage에 저장된 token 가져오기(get)
// const getStorage = async (key: string) => {
//   return await AsyncStorage.getItem(key);
// };

// export async function PloggingResultFtn(activityData: ActivityDataType) {
//   console.log('지금 요청하고 있걸랑요?:', activityData);
//   const formData = new FormData();

//   const filePath = activityData.activityImg;
//   let cleanFilePath = filePath;
//   if (cleanFilePath && cleanFilePath.startsWith('file://')) {
//     cleanFilePath = cleanFilePath.substring(8); // "file://" 는 7글자입니다.
//   }

//   formData.append('activityImg', {
//     uri: cleanFilePath,
//     name: '20220912.jpg', // 실제 파일 이름이나 업로드시 사용할 이름
//     type: 'image/jpg',
//   });

//   const objectInfo = JSON.stringify(activityData.activityRequestDto);
//   const objectblob = new Blob([objectInfo], {
//     // JSON을 Blob 타입으로 변환
//     type: 'application/json',
//     lastModified: Date.now(),
//   });

//   formData.append('activityRequestDto', objectblob);
//   console.log('요청을 이렇게 하고 있거등요?', formData);
//   try {
//     const response = await fetch('https://zoosum.co.kr/api/activity', {
//       method: 'POST',
//       headers: {
//         Accept: '*/*',
//         Authorization: `Bearer ${await getStorage('AccessToken')}`,
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': 'true',
//         'Content-Type': 'multipart/form-data',
//       },
//       body: formData,
//     });

//     let result = await response.json();
//     console.log('요청 결과:', result);
//   } catch (e) {
//     // 업로드 에러 처리
//     console.error('Failed to upload activity and photo.', e);
//   }
// }

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
  console.log('받은 직후:', activityData);

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

    console.log('요청 결과:', response.data);
    return response.data;
  } catch (e) {
    console.error('활동과 사진 업로드에 실패했습니다.', e);
  }
}
