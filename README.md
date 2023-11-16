# 🌳주섬주섬🌳

![Imgur](https://i.imgur.com/HbW61cZ.gif)

- 개발기간: 2023.10.10 ~ 2023.11.17 (6주)

사람들은 환경운동에 대해서 어려움을 느낍니다. 무엇을 어떻게 해야 할지 모릅니다.  
환경운동이 그저 딱딱하고 위대한 사람만 할 수 있는 것이라고 생각합니다.  
그래서 이 주섬주섬 앱을 통해 사람들이 조금 더 쉽고 재밌게 환경운동(플로깅)을 할 수 있도록  
지속적으로 동참할 수 있는 플로깅 앱을 제작하였습니다.

---

## Skills

- FrontEnd: **TypeScript, React Native 0.72.6**
- BackEnd: **Java 17, Spring Boot 3.1.5, JPA**
- DB: **MariaDB 10.6.14(AWS RDS), Redis**
- AI: **YOLOv8, python 3.10.13, Flask**
- Infra: **Ubuntu 20.04(AWS Lightsail), Jenkins 2.414.3, Docker 24.0.6**
- Tools: **VSCode, IntelliJ, MySQL Workbench, Termius**
- 협업 Tools: **Gitlab, JIRA, Mattermost, Swagger**

## 포팅메뉴얼

- [포팅메뉴얼](exec/porting_manual.md)

## 페이지 및 기능

### 메인페이지, 소셜로그인

<div style="overflow: auto">
    <img src="https://i.imgur.com/TnSatDw.png" width="200" />
    <img src="https://i.imgur.com/qySdItH.png" width="200" />
    <img src="https://i.imgur.com/i3CORQf.png" width="200" />
    <img src="https://i.imgur.com/SEspUvA.png" width="200" />
    <img src="https://i.imgur.com/Rnfmz1E.png" width="200" />
    <img src="https://i.imgur.com/R7b9cXx.png" width="200" />
    <img src="https://i.imgur.com/AdVjnYY.png" width="200" />
</div>

- 앱을 시작할 때, 위치와 카메라 사용 권한을 획득합니다.
- 카카오 소셜 로그인을 통해 간편하게 서비스를 이용할 수 있습니다.
- 가입 후, 추가로 지역과 닉네임을 설정합니다.

### 게임배경

<div style="overflow: auto">
    <img src="https://i.imgur.com/z9JvDs5.png" width="200" />
    <img src="https://i.imgur.com/tSaxUNX.png" width="200" />
    <img src="https://i.imgur.com/42aKAMg.png" width="200" />
    <img src="https://i.imgur.com/D2B60gO.png" width="200" />
</div>

- 게임 배경을 간단하게 설명합니다.
- 환경오염으로 살 곳을 잃어버린 동물 정령들을 플로깅을 하며 구하는 컨셉입니다.

### 동물 정령 획득

<div>
    <img src="https://i.imgur.com/Dxgk0u3.png" width="200" />
    <img src="https://i.imgur.com/f6P3r3V.png" width="200" />
    <img src="https://i.imgur.com/d1BwCvu.png" width="200" />
</div>

- 최초 로그인 이후 또는 알 보상 획득 후 메인페이지에 접근했을 때 동물정령을 획득합니다.
- 터치 횟수에 따라 알이 점점 깨지고, 랜덤으로 획득하여 재미요소를 더했습니다.

### 튜토리얼

<div style="overflow: auto">
    <img src="https://i.imgur.com/lMsssW2.png" width="200" />
    <img src="https://i.imgur.com/Txwthjg.png" width="200" />
    <img src="https://i.imgur.com/5cDdvQ3.png" width="200" />
    <img src="https://i.imgur.com/9M2w7T6.png" width="200" />
    <img src="https://i.imgur.com/j4lPMcM.png" width="200" />
    <img src="https://i.imgur.com/iMVwUyX.png" width="200" />
    <img src="https://i.imgur.com/eInmBKI.png" width="200" />
    <img src="https://i.imgur.com/hMzzrbY.png" width="200" />
</div>

- 메인페이지의 물음표 버튼을 눌러 언제든지 튜토리얼을 볼 수 있습니다.
- 튜토리얼을 통해 버튼, 아이템, 플로깅 등의 사용방법을 알 수 있습니다.

### 전체/지역 랭킹 & 플로깅 활동 및 뱃지

<div style="overflow: auto">
    <img src="https://i.imgur.com/gaa2K2K.png" width="200" />
    <img src="https://i.imgur.com/aeKbaZ6.png" width="200" />
    <img src="https://i.imgur.com/6W8ivjc.png" width="200" />
    <img src="https://i.imgur.com/1vXyyOj.png" width="200" />
    <img src="https://i.imgur.com/rSpD1Uz.png" width="200" />
    <img src="https://i.imgur.com/lPE4yAg.png" width="200" />
</div>

- 전체랭킹, 지역별 랭킹을 조회할 수 있습니다.
- 본인과 다른 사람들의 활동기록과 뱃지 획득 여부를 볼 수 있습니다.
- 활동기록을 볼 때는 플로깅 경로를 크게 볼 수 있습니다.

### 내가 보유한 아이템 (섬, 나무, 동물정령)

<div>
    <img src="https://i.imgur.com/HFmUZrL.png" width="200" />
    <img src="https://i.imgur.com/TNRuaVV.png" width="200" />
    <img src="https://i.imgur.com/sMd9Qtf.png" width="200" />
    <img src="https://i.imgur.com/viXJOf4.png" width="200" />
    <img src="https://i.imgur.com/JZRTIoo.png" width="200" />
    <img src="https://i.imgur.com/Af51hGe.png" width="200" />
</div>

- 내가 보유한 섬, 나무, 동물정령 목록을 조회하고 선택할 수 있습니다.
- 동물정령의 경우 해당 동물정령 같이 플로깅한 시간, 거리, 쓰레기 수를 조회합니다.
- 현재 동물정령은 36마리, 섬은 9개, 나무는 20개, 뱃지는 24개가 준비되어 있습니다.
- **[동물, 아이템, 뱃지 정보](#동물-아이템-뱃지-정보)**

### 플로깅 시작

<div>
    <img src="https://i.imgur.com/XhIhlJA.png" width="200" />
    <img src="https://i.imgur.com/qtM1f2r.png" width="200" />
    <img src="https://i.imgur.com/JEib85O.png" width="200" />
    <img src="https://i.imgur.com/HdnagQZ.png" width="200" />
</div>

- 메인 페이지에서 "산책하기" 버튼을 통해 동물정령과 함께 플로깅을 시작합니다.
- Google 지도를 사용했으며, 이동경로와 주운 쓰레기를 위치를 확인합니다.
- "플로깅 완료하기" 버튼을 눌러 플로깅을 종료하면 플로깅 결과 화면이 나옵니다.

### 쓰레기 촬영 및 분류

<div>
    <img src="https://i.imgur.com/ZHhyhpF.png" width="200" />
    <img src="https://i.imgur.com/ngrxrOT.png" width="200" />
    <img src="https://i.imgur.com/Y56tJsT.png" width="200" />
</div>

- 쓰레기를 발견하고 사진을 찍습니다.
- 찍은 사진을 AI가 분석하여 쓰레기를 분류해줍니다.
- 돋보기 버튼을 클릭하면 어떻게 분류되었는지 확인할 수 있습니다.
- 해당 사진에서 가장 개수가 많은 쓰레기 분류의 처리 방법을 알려줍니다.

### 플로깅 보상

<div>    
    <img src="https://i.imgur.com/umrFyTU.png" width="200" />
    <img src="https://i.imgur.com/7Im7tTt.png" width="200" />
    <img src="https://i.imgur.com/pMKochh.png" width="200" />
    <img src="https://i.imgur.com/7k3Dwz8.png" width="200" />
</div>

- 쓰레기 개수, 거리, 시간을 기준으로 보상을 획득합니다.
- 보상의 종류로는 섬, 나무, 알, 씨앗, 뱃지가 있습니다.
- 메인페이지를 꾸미는 데 사용되고, 동물은 플로깅 할 때 데려갈 수 있습니다.
- 씨앗 100개를 모으면 나무심기 캠페인에 참여할 수 있습니다.
- 뱃지는 특정 업적을 달성했을 때 획득할 수 있습니다.

### 나무심기 캠페인 참여

<div>
    <img src="https://i.imgur.com/UsyFyAL.jpg" width="200" />
    <img src="https://i.imgur.com/5bb208J.jpg" width="200" />
    <img src="https://i.imgur.com/Lb2SvWq.jpg" width="200" />
    <img src="https://i.imgur.com/hlRBe73.jpg" width="200" />
</div>

- 씨앗 100개를 모아 나무심기 캠페인에 참여합니다.
- 캠페인에 참여하는 사람의 이름, 나무 이름, 생년월일, 전화번호를 적습니다.

## 주요 기능 참고자료

- [Kakao login API](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)
- [Google Map API](https://developers.google.com/maps?hl=ko)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [react-native-fast-image](https://www.npmjs.com/package/react-native-fast-image?activeTab=readme)
- [react-native-sound](https://www.npmjs.com/package/react-native-sound)
- [react-native-view-shot](https://www.npmjs.com/package/react-native-view-shot)
- [react-native-vision-camera](https://www.npmjs.com/package/react-native-vision-camera)
- [react-native-toast-message](https://www.npmjs.com/package/react-native-toast-message)
- [react-native-snap-carousel](https://www.npmjs.com/package/react-native-snap-carousel)

---

## 팀원

|                 김영민👑                  |                  노수혁                   |                  신지원                   |                  송병훈                   |                  이은성                   |                  정규성                   |
| :---------------------------------------: | :---------------------------------------: | :---------------------------------------: | :---------------------------------------: | :---------------------------------------: | :---------------------------------------: |
| ![Imgur](https://i.imgur.com/QCIniI5.png) | ![Imgur](https://i.imgur.com/j4TTBz7.png) | ![Imgur](https://i.imgur.com/o38ciBD.png) | ![Imgur](https://i.imgur.com/ixdlIIc.png) | ![Imgur](https://i.imgur.com/edfmHsy.png) | ![Imgur](https://i.imgur.com/v3N8Oq3.png) |
|               Leader, Front               |                   Front                   |               Design, Front               |                Full Stack                 |                   Back                    |                 AI, Back                  |

- 김영민: 팀장, FE리더, 동물/아이템 Asset 제작 및 Page
- 노수혁: 사용자/사용자정보/활동 Page
- 신지원: 앱 디자인, 플로깅/동물 Page
- 송병훈: BE리더, 아이템/플로깅/랭킹 API, Google Map API 적용, CI/CD 및 서버 세팅
- 이은성: 동물/사용자정보 API, 쓰레기 인식 AI 학습
- 정규성: 사용자 API, Spring Security, JWT, 쓰레기 인식 AI 학습 및 배포

## 협업과정

- [요구사항 명세서](https://www.notion.so/1edb00e483384de5a38d834953e6fdbd)
- [와이어프레임](https://www.figma.com/file/jzqMKo0Vh8cGzxMqXlbJBE/%EC%A3%BC%EC%84%AC%EC%A3%BC%EC%84%AC--Figma?type=design&node-id=0-1&mode=design&t=u9dlx5kiZGJIOT73-0)
- [ERD](https://www.erdcloud.com/d/Re9m68YRMNXtnjMK6)
- [API 명세서](https://www.notion.so/a69a430602354a5bb03241d9d5667820?v=02075e34ba5b4fe09608186a3fad3c2f)
- [트러블 슈팅](https://www.notion.so/Trouble-Shooting-4b93cb8956024e7791f70cb5cfef424c)
- [git convention](https://www.notion.so/Git-Conventions-Branch-08cd4d0b90da4fa9bb64bf86793b1908)

## APK 파일

- [zoosum.apk](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/zoosum.apk)

## 동물, 아이템, 뱃지 정보

<details>
<summary style="font-size: 24px; font-weight: bold;">동물</summary>
<div markdown="1">

`모션 : 0-Idle / 1-Breath / 2-Spin / 3-Sit`

| 번호 |    이름    |  한글이름  |  이름  | 설명                                                                      | 이미지 0                                                                                      | 이미지 1                                                                                      | 이미지 2                                                                                      | 이미지 3                                                                                      |
| :--: | :--------: | :--------: | :----: | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
|  1   | ArcticFox  |  북극여우  | 송송이 | 송송이는 툰드라 지방에서 온 여우로 흰 털이 매력적인 정령입니다            | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_0.png)   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_1.gif)   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_2.gif)   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/ArcticFox/ArcticFox_3.gif)   |
|  2   |     Ox     |    불럭    | 불불이 | 불불이는 이름처럼 불같은 성격을 가진 소 정령입니다                        | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Ox/Ox_0.png)                 | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Ox/Ox_1.gif)                 | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Ox/Ox_2.gif)                 | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Ox/Ox_3.gif)                 |
|  3   |  Penguin   |    펭귄    |  핑구  | 핑구는 뒤뚱뒤뚱 귀엽게 걷는 것이 장기인 펭귄 정령입니다                   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Penguin/Penguin_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Penguin/Penguin_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Penguin/Penguin_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Penguin/Penguin_3.gif)       |
|  4   |  Pinedeer  |    순록    | 당당이 | 당당이는 당근을 좋아하는 순록 정령으로 멋진 뿔을 가지고 있습니다          | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pinedeer/Pinedeer_0.png)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pinedeer/Pinedeer_1.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pinedeer/Pinedeer_2.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pinedeer/Pinedeer_3.gif)     |
|  5   |  SnowOwl   | 북극올빼미 | 은빛이 | 은빛이는 은빛 날개가 아주 예쁜 올빼미정령입니다                           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowOwl/SnowOwl_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowOwl/SnowOwl_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowOwl/SnowOwl_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowOwl/SnowOwl_3.gif)       |
|  6   | SnowWeasel | 북극족제비 |  코코  | 코코는 새하얀 몸을 가진 장난 치는 것을 좋아하는 족제비 정령입니다         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowWeasel/SnowWeasel_0.png) | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowWeasel/SnowWeasel_1.gif) | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowWeasel/SnowWeasel_2.gif) | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/SnowWeasel/SnowWeasel_3.gif) |
|  7   |  Buffalo   |   버팔로   |  뚜이  | 뚜이는 무리 생활을 통해 가족을 소중히 지키는 버팔로 정령입니다            | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Buffalo/Buffalo_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Buffalo/Buffalo_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Buffalo/Buffalo_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Buffalo/Buffalo_3.gif)       |
|  8   |   Chick    |   병아리   | 삐약이 | 삐약이는 작은 병아리 정령으로 누구에게나 사랑받는 귀여움을 가집니다       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Chick/Chick_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Chick/Chick_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Chick/Chick_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Chick/Chick_3.gif)           |
|  9   |    Cow     |    젖소    |  밀키  | 밀키는 분홍색 코가 매력적이며 얼룩진 모습이 귀여운 젖소 정령입니다        | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cow/Cow_0.png)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cow/Cow_1.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cow/Cow_2.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cow/Cow_3.gif)               |
|  10  |   Donkey   |   당나귀   |  동키  | 동키는 큰 귀와 길쭉한 몸을 가진 당근을 아주 좋아하는 당나귀 정령입니다    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Donkey/Donkey_0.png)         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Donkey/Donkey_1.gif)         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Donkey/Donkey_2.gif)         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Donkey/Donkey_3.gif)         |
|  11  |    Duck    |    오리    | 꽥꽥이 | 꽥꽥이는 언제나 하늘을 날고 싶어하는 귀여운 오리 정령입니다               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Duck/Duck_0.png)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Duck/Duck_1.gif)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Duck/Duck_2.gif)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Duck/Duck_3.gif)             |
|  12  |    Pig     |    돼지    | 토실이 | 토실이는 둥글고 매끄러운 몸을 가진 토실토실 돼지 정령입니다               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pig/Pig_0.png)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pig/Pig_1.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pig/Pig_2.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Pig/Pig_3.gif)               |
|  13  |   Sheep    |     양     | 잠잠이 | 잠잠이는 흰 털로 몸이 가득 덮힌 양 정령으로 귀여운 귀가 특징입니다        | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Sheep/Sheep_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Sheep/Sheep_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Sheep/Sheep_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Sheep/Sheep_3.gif)           |
|  14  |   Eagle    |   독수리   | 이글이 | 이글이는 멋지게 날고 싶은 아기 독수리 정령으로 사실은 날지 못합니다       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Eagle/Eagle_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Eagle/Eagle_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Eagle/Eagle_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Eagle/Eagle_3.gif)           |
|  15  |    Fox     |    여우    |  뽀리  | 뽀리는 영리한 여우 정령으로 늘 구슬을 찾아 여행을 떠납니다                | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Fox/Fox_0.png)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Fox/Fox_1.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Fox/Fox_2.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Fox/Fox_3.gif)               |
|  16  |  Raccoon   |    라쿤    | 쿤쿤이 | 쿤쿤이는 먼 나라 미국에서 온 라쿤 정령으로 귀여운 꼬리가 특징입니다       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Raccoon/Raccoon_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Raccoon/Raccoon_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Raccoon/Raccoon_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Raccoon/Raccoon_3.gif)       |
|  17  |    Wolf    |    늑대    |  아웅  | 아웅이는 카리스마가 넘치는 늑대 정령으로 언제나 듬직한 친구입니다         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Wolf/Wolf_0.png)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Wolf/Wolf_1.gif)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Wolf/Wolf_2.gif)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Wolf/Wolf_3.gif)             |
|  18  |    Cat     |   고양이   |  냥이  | 냥이는 줄무늬가 귀여운 고양이 정령으로 수염을 늘 정갈하게 정리해놓습니다  | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cat/Cat_0.png)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cat/Cat_1.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cat/Cat_2.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cat/Cat_3.gif)               |
|  19  |    Dog     |   강아지   |  멍이  | 멍이는 노란색을 띈 귀여운 강아지 정령으로 짧은 다리가 인상적입니다        | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Dog/Dog_0.png)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Dog/Dog_1.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Dog/Dog_2.gif)               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Dog/Dpg_3.gif)               |
|  20  |   Rabbit   |    토끼    |  콩이  | 콩이는 분홍색 토끼 정령으로 늘 경주 할 거북이를 찾아 떠납니다             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rabbit/Rabbit_0.png)         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rabbit/Rabbit_1.gif)         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rabbit/Rabbit_2.gif)         | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rabbit/Rabbit_3.gif)         |
|  21  |  Tortoise  |   거북이   | 느림이 | 느림이는 귀여운 거북이 정령으로 매일 찾아오는 콩이가 귀찮기만 합니다      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Tortoise/Tortoise_0.png)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Tortoise/Tortoise_1.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Tortoise/Tortoise_2.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Tortoise/Tortoise_3.gif)     |
|  22  |  Cheetah   |    치타    |  똘이  | 똘이는 날렵한 치타 정령으로 길쭉한 몸과 점박이가 특징입니다               | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cheetah/Cheetah_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cheetah/Cheetah_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cheetah/Cheetah_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Cheetah/Cheetah_3.gif)       |
|  23  |  Elephant  |   코끼리   |  뿌우  | 뿌우는 작고 귀여운 코끼리 정령으로 멋진 상아를 가지고 있습니다            | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Elephant/Elephant_0.png)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Elephant/Elephant_1.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Elephant/Elephant_2.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Elephant/Elephant_3.gif)     |
|  24  |  Flamingo  |  플라밍고  |  피치  | 피치는 목이 긴 플라밍고 정령으로 호기심이 많아 언제나 두리번거립니다      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Flamingo/Flamingo_0.png)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Flamingo/Flamingo_1.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Flamingo/Flamingo_2.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Flamingo/Flamingo_3.gif)     |
|  25  |  Gazelle   |    가젤    |  루루  | 루루는 우아한 가젤 정령으로 무리를 지어 달리기를 하는 것을 좋아합니다     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Gazelle/Gazelle_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Gazelle/Gazelle_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Gazelle/Gazelle_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Gazelle/Gazelle_3.gif)       |
|  26  |   Zebra    |   얼룩말   |  뽀니  | 뽀니는 장난기 가득한 얼룩말 정령으로 친구들하는 달리기 시합을 좋아합니다  | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Zebra/Zebra_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Zebra/Zebra_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Zebra/Zebra_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Zebra/Zebra_3.gif)           |
|  27  |  Bighorn   |    빅혼    | 혼혼이 | 혼혼이는 멋진 뿔을 가지고 있는 빅혼 정령으로 당당이를 좋아합니다          | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Bighorn/Bighorn_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Bighorn/Bighorn_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Bighorn/Bighorn_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Bighorn/Bighorn_3.gif)       |
|  28  |   Camel    |    낙타    | 봉울이 | 봉울이는 혹을 가지고 있는 낙타 정령으로 혹에는 항상 간식을 두고 다닙니다  | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Camel/Camel_3.gif)           |
|  29  |  Kangroo   |   캥거루   |  갸루  | 갸루는 작은 캥거루 정령으로 폴짝 뛰어다니는 것을 참 좋아합니다            | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Kangroo/Kangroo_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Kangroo/Kangroo_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Kangroo/Kangroo_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Kangroo/Kangroo_3.gif)       |
|  30  |   Koala    |   코알라   |  코비  | 코비는 나무에 늘 매달려 있는 코알라 정령으로 만사가 귀찮습니다            | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Koala/Koala_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Koala/Koala_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Koala/Koala_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Koala/Koala_3.gif)           |
|  31  |  Platypus  | 오리너구리 |  리링  | 리링이는 주걱같은 입을 가진 오리너구리 정령으로 언제나 땅을 파며 다닙니다 | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Platypus/Platypus_0.png)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Platypus/Platypus_1.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Platypus/Platypus_2.gif)     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Platypus/Platypus_3.gif)     |
|  32  |   Panda    |    판다    | 푸바오 | 푸바오는 인기있는 판다 정령으로 사람들을 매우 좋아한답니다                | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Panda/Panda_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Panda/Panda_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Panda/Panda_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Panda/Panda_3.gif)           |
|  33  |  Peacock   |    공작    | 콕콕이 | 콕콕이는 멋진 꼬리를 가진 공작 정령으로 날개로 멋짐을 자랑한답니다        | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Peacock/Peacock_0.png)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Peacock/Peacock_1.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Peacock/Peacock_2.gif)       | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Peacock/Peacock_3.gif)       |
|  34  | Crocodile  |    악어    | 라코코 | 라코코는 이빨이 귀여운 악어 정령으로 수영을 좋아합니다                    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Crocodile/Crocodile_0.png)   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Crocodile/Crocodile_1.gif)   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Crocodile/Crocodile_2.gif)   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Crocodile/Crocodile_3.gif)   |
|  35  |    Swan    |    백조    |  쪼쪼  | 쪼쪼는 몸이 흰 백조 정령으로 얼굴에는 늘 검은 마스크를 쓰고 있습니다      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Swan/Swan_0.png)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Swan/Swan_1.gif)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Swan/Swan_2.gif)             | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Swan/Swan_3.gif)             |
|  36  |   Rhino    |   코뿔소   | 라이농 | 라이농은 듬직한 코뿔소 정령으로 우람한 몸과 달리 속은 굉장히 소심하답니다 | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rhino/Rhino_0.png)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rhino/Rhino_1.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rhino/Rhino_2.gif)           | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Animal/Rhino/Rhino_3.gif)           |

</div>
</details>

<details>
<summary style="font-size: 24px; font-weight: bold;">아이템(섬)</summary>
<div markdown="1">

| 번호 |   이름   |  설명   | 이미지                                                                         |
| :--: | :------: | :-----: | ------------------------------------------------------------------------------ |
|  1   | 주섬주섬 | 기본 섬 | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_0.png) |
|  2   | 등대 섬  |  등대   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_1.png) |
|  3   |  사막섬  |  사막   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_2.png) |
|  4   |  빙하섬  |  빙하   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_3.png) |
|  5   |  분홍섬  |  분홍   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_4.png) |
|  6   |  바위섬  |  바위   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_5.png) |
|  7   |  해변섬  |  해변   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_6.png) |
|  8   | 오두막섬 | 오두막  | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_7.png) |
|  9   |  별장섬  |  별장   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Island/island_8.png) |

</div>
</details>

<details>
<summary style="font-size: 24px; font-weight: bold;">아이템(나무)</summary>
<div markdown="1">

| 번호 |        이름        | 이미지                                                                       |
| :--: | :----------------: | ---------------------------------------------------------------------------- |
|  1   |      그냥나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_01.png) |
|  2   |      사탕나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_02.png) |
|  3   |     삼지창나무     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_03.png) |
|  4   |  아낌없이주는나무  | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_04.png) |
|  5   |     삼형제나무     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_05.png) |
|  6   |   토끼선인장나무   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_06.png) |
|  7   |      방울나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_07.png) |
|  8   |   진짜선인장나무   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_08.png) |
|  9   | 나의라임오렌지나무 | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_09.png) |
|  10  |     탕후루나무     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_10.png) |
|  11  |      진짜나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_11.png) |
|  12  |     솜사탕나무     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_12.png) |
|  13  |      홍시나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_13.png) |
|  14  |    아카시아나무    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_14.png) |
|  15  |      벚꽃나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_15.png) |
|  16  |      야자나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_16.png) |
|  17  |     바나나나무     | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_17.png) |
|  18  |      엄마나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_18.png) |
|  19  |      아빠나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_19.png) |
|  20  |      아이나무      | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Trees/Tree_20.png) |

</div>
</details>

<details>
<summary style="font-size: 24px; font-weight: bold;">뱃지</summary>
<div markdown="1">

| 번호 |       이름        |   ID    | 달성 조건               | 인트값 | 이미지                                                                          |
| :--: | :---------------: | :-----: | ----------------------- | :----: | ------------------------------------------------------------------------------- |
|  1   |  첫 걸음의 설렘   |  PTCT1  | 플로깅 참여 횟수 1회    |   1    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_01.png) |
|  2   |   또 오셨군요!    | PTCT10  | 플로깅 참여 횟수 10회   |   10   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_02.png) |
|  3   |  언제나 함께해요  | PTCT20  | 플로깅 참여 횟수 20회   |   20   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_03.png) |
|  4   |   거리를 살리자   | TRSH100 | 쓰레기 주운 횟수 100회  |  100   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_04.png) |
|  5   |   도시를 살리자   | TRSH200 | 쓰레기 주운 횟수 200회  |  200   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_05.png) |
|  6   |   지구를 살리자   | TRSH300 | 쓰레기 주운 횟수 300회  |  300   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_06.png) |
|  7   |    시계는 와치    | TIME100 | 플로깅 활동 시간 100분  |  100   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_07.png) |
|  8   |  시간은 째깍째깍  | TIME200 | 플로깅 활동 시간 200분  |  200   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_08.png) |
|  9   |     1일 1주섬     | TIME300 | 플로깅 활동 시간 300분  |  300   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_09.png) |
|  10  |    달려라 달려    | LGTH10  | 플로깅 활동 거리 10km   |   10   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_10.png) |
|  11  |    뛰어라 뛰어    | LGTH20  | 플로깅 활동 거리 20km   |   20   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_11.png) |
|  12  |    날아라 날라    | LGTH30  | 플로깅 활동 거리 30km   |   30   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_12.png) |
|  13  |  정령이 와글와글  | ANML10  | 동물 캐릭터 10회 획득   |   10   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_13.png) |
|  14  |  정령이 복작복작  | ANML20  | 동물 캐릭터 20회 획득   |   20   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_14.png) |
|  15  |  정령이 우르르르  | ANML30  | 동물 캐릭터 30회 획득   |   30   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_15.png) |
|  16  |  우리 집에 올래?  |  LAND3  | 섬 테마 아이템 3회 획득 |   3    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_16.png) |
|  17  | 우리 별장에 올래? |  LAND6  | 섬 테마 아이템 6회 획득 |   6    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_17.png) |
|  18  |  우리 섬에 올래?  |  LAND9  | 섬 테마 아이템 9회 획득 |   9    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_18.png) |
|  19  |   나는야 꿈나무   |  LCRN5  | 지역 랭킹 5등 달성      |   5    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_19.png) |
|  20  |   나는야 지킴이   |  LCRN3  | 지역 랭킹 3등 달성      |   3    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_20.png) |
|  21  |   나는야 수호자   |  LCRN1  | 지역 랭킹 1등 달성      |   1    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_21.png) |
|  22  | 내가 50등이라니!  | TPRN50  | 전체 랭킹 50등 달성     |   50   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_22.png) |
|  23  | 내가 20등이라니!  | TPRN20  | 전체 랭킹 20등 달성     |   20   | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_23.png) |
|  24  |  내가 1등이라니!  |  TPRN1  | 전체 랭킹 1등 달성      |   1    | ![](https://zoosum-bucket.s3.ap-northeast-2.amazonaws.com/Reward/Reward_24.png) |

</div>
</details>
