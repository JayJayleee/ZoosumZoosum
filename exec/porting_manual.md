# ZOOSUM Porting Manual

1. **Develop Environment**
   - 1.1 Front-End
   - 1.2 Back-End
   - 1.3 Infra Structure
   - 1.4 DataBase
2. **Local Application Setting**
   - 2.1 Front-End
   - 2.2 Back-End
   - 2.3 DataBase
3. **Server Setting**
   - 3.1 EC2 준비
   - 3.2 Domain Name Server Setting
   - 3.3 기본 설정
   - 3.4 Jenkins
   - 3.5 Docker, Docker-Compose
   - 3.6 S3 준비
4. **Deployment Setting**
   - 4.1 Jenkins-Credentials
   - 4.2 Jenkins PipeLine
   - 4.3 Dockerfile
   - 4.4 docker-compose.yml
   - 4.5 SSL 적용
   - 4.6 Nginx Setting
5. **Files Ignored**
   - 5.1 Front-End
   - 5.2 Back-End

---

# 1. Develop Environment

> ### 1.1 Front-end

- yarn 1.22.19
- node 18.17.1
- react-native 0.72.6

  - Dependencies
    - "@react-native-async-storage/async-storage": "^1.19.3",
    - "@react-native-community/geolocation": "^3.1.0",
    - "@react-native-seoul/kakao-login": "^5.3.0",
    - "@react-navigation/native": "^6.1.9",
    - "@react-navigation/native-stack": "^6.9.16",
    - "@tanstack/react-query": "4.35.3",
    - "@types/react-native-snap-carousel": "^3.8.7",
    - "axios": "^1.6.0",
    - "haversine": "^1.1.1",
    - "lottie-react-native": "^6.4.0",
    - "react": "18.2.0",
    - "react-native": "0.72.6",
    - "react-native-dropdown-select-list": "^2.0.5",
    - "react-native-exit-app": "^2.0.0",
    - "react-native-fast-image": "^8.6.3",
    - "react-native-fs": "^2.20.0",
    - "react-native-geolocation-service": "^5.3.1",
    - "react-native-keyevent": "^0.3.1",
    - "react-native-maps": "^1.8.0",
    - "react-native-progress": "^5.0.1",
    - "react-native-safe-area-context": "^4.7.4",
    - "react-native-screens": "^3.27.0",
    - "react-native-snap-carousel": "4.0.0-beta.6",
    - "react-native-sound": "^0.11.2",
    - "react-native-svg": "^13.14.0",
    - "react-native-toast-message": "^2.1.7",
    - "react-native-view-shot": "^3.8.0",
    - "react-native-vision-camera": "^3.6.4"

- Tool: [VSCode](https://code.visualstudio.com/)

> ### 1.2 Back-end

- [openjdk 17.0.3 msi](https://github.com/ojdkbuild/ojdkbuild) (latest)
- [Spring](https://start.spring.io/)

  - Project Build: Gradle - Kotlin
  - Language: JDK 17
  - Spring Boot: 3.1.5
  - Packaging: Jar
  - Dependencies:

    - spring-boot-starter-data-jpa
    - spring-boot-starter-security
    - spring-boot-starter-web
    - lombok
    - mariadb-java-client
    - Others

      ```
        // Redis
        implementation ("org.springframework.boot:spring-boot-starter-data-redis")

        // Querydsl
        implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
        annotationProcessor("com.querydsl:querydsl-apt:${dependencyManagement.importedProperties["querydsl.version"]}:jakarta")
        annotationProcessor("jakarta.annotation:jakarta.annotation-api")
        annotationProcessor("jakarta.persistence:jakarta.persistence-api")

        // p6spy - SQL Check
        implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.9.0")

        // Swagger
        implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2")


        // jwt
        implementation ("io.jsonwebtoken:jjwt-api:0.11.5")
        implementation ("io.jsonwebtoken:jjwt-impl:0.11.5")
        implementation ("io.jsonwebtoken:jjwt-jackson:0.11.5")
        // S3
        //AWS Cloud와 통합을 쉽게 해주는 Spring Cloud AWS 모듈의 스타터 패키지. 내부적으로는 AWS SDK를 포함.
        implementation("org.springframework.cloud:spring-cloud-starter-aws:2.2.6.RELEASE")

        // https://mvnrepository.com/artifact/javax.xml.bind/jaxb-api
        implementation("javax.xml.bind:jaxb-api:2.3.1")
      ```

- Tool: [IntelliJ Ultimate (2023.1.3)](https://www.jetbrains.com/ko-kr/idea/download/?section=windows)

> ### 1.3 Back-end(python fastapi)

>> ![RDS](https://github.com/ramaking/yolov8-custom-train/assets/58355046/a44e6711-37d4-4f91-accb-19eb9493f3b9)

- Python 3.10.13
- pip 23.3.1
  - pip package version
    - uvicorn 0.24.0.post1
    - fastapi 0.104.1
    - ultralytics 8.0.208
    - torch 2.1.0
    - numpy 1.23.5
    - opencv-python 4.8.1.78
- Tool : [VSCode](https://code.visualstudio.com/)

> ### 1.4 Infrastructure

- AWS Lightsail Instance
  - Price: 80$ USD
  - RAM: 16 GB
  - vCPU: 4
  - SSD: 320 GB
  - OS: Ubuntu 20.04.6 LTS
- Jenkins: 2.414.3
- Webhook
- Docker: 24.0.6
- Docker-Compose: 1.24.1
- Nginx: 1.15.12
- certbot: latest
- Tool: Termius
- AWS EC2 Instance (GPU server) 
    - AMI : AWS Deep Learning Base AMI Ubuntu 18.04 32.0 with Support by Bansir 
    - price : US$0.20/시간 
    - OS : Ubuntu Linux/Unix, 18.04 
    - 인스턴스 유형 : g4dn.xlarge 
    - price : US$0.64799/시간 
    - RAM : 16 GiB - vCPU : 4 
    - SSD : 585 GiB 
    - GPU : Tesla T4 
    - Graphic driver version : 470.223.02 
    - cuda : 11.4

> ### 1.5 DataBase

- AWS RDS
  - Price: Free tier
  - Engine: MariaDB 10.6.14
  - vCPU: 2
  - RAM: 1GB
  - Instance Class: db.t3.micro
  - Storage: 범용 SSD(gp2), 20GiB
  - Multi AZ: No
  - Inbound Rule
    - Before Release: Every IP Allow
    - After Release: Only Project Instance IP Allow
  - Parameter Group
    - char: utfmb4
    - time_zone: Asia/Seoul
    - collation: utf8mb4_general_ci
    - lower_case_table_names: 1
- Tool: AWS RDS, MySQL Workbench 8.0.33
- Redis
  ```bash
  docker run --name redis_container -p 6379:6379 -v /path/on/redis:/data -d redis redis-server --appendonly yes --requirepass {redis password}
  ```

---

# 2. Local Application Setting

> ### 2.1 Front-End

1. [Node](https://nodejs.org/ko) LTS버전 다운로드
2. [VSCode](https://code.visualstudio.com/) 다운로드
   - VSCode에서 Extension으로 작업을 도와주는 도구들을 다운받는다.
   - Prettier, JSON, file-icons, ES7 + React/Redux/React-Native snippets
3. Android Studio를 다운받고 초기 설정을 한다. ([참고링크](https://yun5o.tistory.com/entry/React-Native-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%955-%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4-%EC%84%A4%EC%B9%98))
4. React Native 프로젝트
   - 프로젝트를 만들 경로 안에서  
     `npx react-native init [PROJECT_NAME] --template react-native-template-typescript` 를 입력한다.
   - 프로젝트 개발에 필요한 모듈은 `yarn add [모듈 이름]` 으로 설치한다. 전역 모듈로 설치하려면 add 뒤에 `-g` 를 붙인다.
   - 프로젝트 생성 후 자주 쓰는 명령어
     - `yarn start` 로 시작하고,
     - `yarn cache clean` 로 캐시를 지우고,
     - `yarn react-native doctor` 로 문제를 찾아 해결한다.
     - `yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/` 로 apk 추출 준비를 한다.
     - `yarn react-native run-android` 로 앱을 실행시키면, 코드가 apk에 적용된다.
     - android > app > build > outputs > apk > debug 로 이동하여, `app-debug.apk` 파일을 스마트폰으로 가져와 실행한다.

> ### 2.2 Back-End

1. openJDK 다운로드.
   - [openjdk 17.0.3](https://github.com/ojdkbuild/ojdkbuild) 에서 17버전 msi를 다운받는다.
   - msi는 환경변수를 자동으로 세팅해주기에, 다운받기만 하면 된다.
2. [IntelliJ](https://www.jetbrains.com/ko-kr/idea/download/?section=windows) 다운로드
   - 무료인 Community, 유료인 Ultimate 상관없다.
3. start.spring.io 에서 Spring 프로젝트 세팅을 한다.
   - Gradle - Kotlin: 다른 빌드 도구인 Ant나 Maven보다 성능이 좋고, Gradle - Kotlin은 Gradle - Groovy 보다 자동완성, 컴파일 오류 잡기, 리팩터링에 유리하다.
   - Spring Boot 3.1.5: Spring Boot 2 버전이 2023년 11월부터 지원이 종료된다고 하여 3.x 버전을 사용했다.
   - Java 17: Spring Boot 3 버전을 사용하려면 17 이상으로 사용해야 한다.
   - Jar: Spring Boot 안에 Tomcat을 내장하고 있어서, 코드만 패키징하는 Jar 형식을 선택했다.
   - Dependencies:
     - Spring Web
     - Spring Boot DevTools
     - Lombok
     - Spring Data JPA
     - MariaDB Driver
   - Generate 클릭
4. 프로젝트 압축을 풀고, build.gradle 을 클릭한다. 의존 라이브러리를 가져올 때까지 기다린다.
5. "File" -> "Settings"
   - "Plugins" 에서 Lombok Install 되어있는지 확인
   - "Editor" -> "File Encodings" -> Encoding 설정들 UTF-8로 변경 -> "Apply"
   - "Build, Execution, Deployment" -> "Build Tools" -> "Gradle" -> "Build and Run" 에서 Gradle로 되어있는 것 IntelliJ로 변경 -> "Apply"
   - "Build, Execution, Deployment" -> "Compiler" -> "Annotation Processors" -> "Enable annotation Processing" 체크 -> "Apply", "OK"
6. build.gradle.kts에 추가로 사용할 Dependency를 적용한다.
7. application.yml 파일을 세팅한다.

   ```yml
   spring:
     # spring - Multipart Size
     servlet:
       multipart:
         max-file-size: 100MB
         max-request-size: 100MB

     # spring - MariaDB Connection
     datasource:
       driver-class-name: org.mariadb.jdbc.Driver
       url: jdbc:mariadb://[DB_HOST]:[PORT_NUMBER]/[SCHEMA]?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8
       username: [USERNAME]
       password: [PASSWORD]
       # DB Connection Pool
       hikari:
         maximum-pool-size: 30

     # spring - JPA
     jpa:
       # Show JPA query
       show-sql: false
       # DDL Configure
       hibernate:
         ddl-auto: none
       properties:
         hibernate:
           format_sql: false
         open-in-view: true

     # spring - JWT
     jwt:
       prefix: "Bearer"
       secret: [SECRET]
       token:
         access-expiration-time: 10800000
         refresh-expiration-time: 604800000

     # spring - Redis
     data:
       redis:
         host: [HOST]
         port: [PORT]
         password: [PASSWORD]

   # Spring Server Setting
   server:
     port: 5000
     servlet:
       context-path: /api

   # Logging
   logging:
     level:
       web: debug

   # AWS S3 Setting
   cloud:
     aws:
       s3:
         bucket: [BUCKET_NAME]
         url: [BUCKET_URL]
       region:
         static: ap-northeast-2
         auto: false
       stack:
         auto: false
       credentials:
         access-key: [ACCESS_KEY]
         secret-key: [SECRET_KEY]
   ```

> ### 2.3 Python-Back-End

1. [Python](https://www.python.org/downloads/) 다운로드
   - 개발 환경에 맞는 최신 버전을 다운로드 받는다
2. [VSCode](https://code.visualstudio.com/) 다운로드
   - VSCode에서 Extension으로 작업을 도와주는 도구들을 다운받는다.
   - Pylance, Python,
3. 라이브러리 다운로드

   ```bash
   pip install ultralytics
   pip install fastapi
   pip install uvicorn
   pip install python-multipart
   ```

> ### 2.4 DataBase

(reference: [Blog](https://velog.io/@nefertiri/AWS-RDS%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0))   

[AWS RDS](https://aws.amazon.com/ko/rds/)에 DB를 만든다.

1.  RDS 인스턴스 생성   

    ![RDS](https://i.imgur.com/mGw9Olc.png)   

    - 1.1 AWS 사이트 상단에 있는 검색창에서 RDS를 검색한다.
    - 1.2 MariaDB를 선택한다.
    - 1.3 프리 티어를 선택하고 DB 인스턴스 식별자와 마스터 사용자 정보를 등록한다. 마스터 사용자 정보로 데이터베이스에 접근한다.
    - 1.4 스토리지 용량을 설정한다. 프리 티어에서는 20GiB까지 이용할 수 있다.
    - 1.5 퍼블릭 액세스를 "예"로 선택한다. 추후 보안 그룹에서 지정된 IP만 접근하도록 설정한다.
    - 1.6 보안 그룹을 새로 생성하고 이름을 입력해준다.
    - 1.7 추가구성에서 초기 데이터베이스 이름을 설정하고, DB의 `username`, `password, port_number`를 정한다.
    - 1.8 프리티어 조건을 확인하고 데이터베이스 생성을 선택한다.

2.  RDS 설정   

    ![parameter](https://i.imgur.com/cTynsvZ.png)   

    - 2.1 왼쪽 메뉴에서 파라미터 그룹을 선택 후, 파라미터 그룹을 생성한다.
    - 2.2 생성한 MariaDB와 같은 버전을 선택하고, 파라미터 그룹 이름을 입력하여 파라미터 그룹을 생성한다.
    - 2.3 생성된 파라미터 그룹을 확인하고, 파라미터 편집을 선택한다.
    - 2.4 파라미터 검색창에 `time_zone`을 검색한다. `time_zone` 파라미터의 값을 `Asia/Seoul`로 선택한다.
    - 2.5 파라미터 검색창에 `char`을 검색한다. 아래 그림에 보이는 6개의 파라미터들의 값을 utf8mb4로 선택한다.
    - 2.6 파라미터 검색창에 `collation`을 검색한다. `collation_connection`, `collation_server` 의 값을 `utf8mb4_general_ci`로 선택한다.
    - 2.7 파라미터 검색창에 `lower_case_table_names`를 검색한다. 해당 파라미터의 값을 1로 설정한다. 해당 값이 1일 경우 테이블명의 대소문자를 구분하지 않는다.
    - 2.8 파라미터 검색창에 `max_connection`을 검색한다. `max_connections`는 인스턴스 사양에 따라 자동으로 정해진다.
    - 2.9 생성된 파라미터 그룹을 데이터베이스에 연결한다. 생성한 데이터베이스 인스턴스를 선택하고 수정을 선택한다.
    - 2.10 추가 구성의 데이터베이스 옵션의 DB 파라미터 그룹을 방금 생성한 파라미터 그룹으로 변경한다.
    - 2.11 수정 사항 적용 시간을 즉시 적용으로 선택하고, 데이터베이스 재부팅을 진행한다.

3.  로컬 PC에서 RDS 접속   

    ![inbound](https://i.imgur.com/PDOGNh6.png)   

    - 3.1 데이터베이스 세부 정보에서 VPC 보안 그룹을 선택한다.
    - 3.2 데이터베이스의 보안 그룹을 선택하고 인바운드 규칙 편집을 선택한다.
    - 3.3 팀원 모두가 각각 DB에 접근해야 한다면 "모든 TCP", 0.0.0.0/0 으로 설정한다.
    - 3.4 추후 개발이 완성된 이후, 특정 IP에서만 DB에 접근한다면, 해당 IP만 허용한다.
    - 3.5 로컬 PC에서 데이터베이스에 접근하기 위한 클라이언트 프로그램으로 MySQL Workbench를 사용한다. 해당 프로그램을 설치한다. [(Download Link)](https://dev.mysql.com/downloads/workbench/)
    - 3.6 상단 메뉴의 Database -> Manage Connections -> New 를 선택하여 데이터 베이스 연결 정보를 입력한다. Hostname에는 RDS의 엔드포인트를 입력한다. 엔드포인트는 RDS 상세 정보 페이지에 있다. Username, Password에는 RDS 생성시 설정한 마스터 사용자 이름과 암호를 입력한다.
    - 3.7 데이터베이스가 선택된 상태에서 현재의 설정을 확인한다. 일부 항목이 제대로 설정되어 있지 않으므로 직접 변경한다.

```sql
# 문자 설정 확인
SHOW VARIABLES LIKE 'c%';

ALTER DATABASE [SCHEMA_NAME]
CHARACTER SET = 'utf8mb4'
COLLATE = 'utf8mb4_general_ci';

# 시간 설정 확인 -> Asia/Seoul(+9:00) 이 맞나?
SELECT @@time_zone, now();

SET GLOBAL time_zone = '+9:00';
SET time_zone = '+9:00';

# 테이블 대소문자 구분 설정 확인 -> 1 이 맞나?
SHOW VARIABLES LIKE 'lower_case_table_names';

# lower_case_table_names를 수정하는 SQL은 찾아도 안 나온다.
# RDS를 사용 중이기에 DB의 인바운드 규칙을 편집하여 EC2에서 접속 가능하도록 하여
# CLI를 통해 "lower_case_table_names = 1" 를 DB 설정 파일에 추가하면 된다.
# 아니면 RDS를 재부팅하면 이전에 설정했던 "lower_case_table_names = 1" 가 제대로 적용되기도 한다.
```

---

# 3. Server Setting

> ### 3.1 서버 준비

1. AWS 계정을 생성한다.

- 계정 생성 직후 1년 동안 무료로 AWS 기능들을 사용할 수 있는 Free tier가 주어진다.
- EC2는 Free tier를 기준으로 설명한다.
- Lightsail은 유료다.

2. AWS EC2를 사용하는 경우

![EC2](https://i.imgur.com/Kl1pMv8.png)

- [AWS EC2](https://ap-northeast-2.console.aws.amazon.com/ec2/home) 사이트에 접속한다.
- "인스턴스 시작" -> 인스턴스 이름 입력 -> OS에서 "Ubuntu" 선택 -> "20.04 LTS" 선택
- 인스턴스 유형은 프리티어를 지원해주는 유형으로 선택
- 새 "키 페어"를 생성하여 컴퓨터에 저장해 놓는다. 인스턴스 접속에 필요한 key다.
- 키 이름을 입력하고, RSA로 생성한다.
- Windows라면 ppk로 다운받아 Putty라는 어플리케이션을 사용하고, Mac이라면 pem을 다운받는다.
- Windows이어도, Termius 라는 어플리케이션을 사용하면 pem으로 다운받아도 된다. (추천)
- 방화벽(보안 그룹)은 없다면 새로 생성한다.
- "위치무관 SSH 트래픽 허용"이 기본값인데, 기본 설정 그대로 둔다.
- 키만 갖고 있다면, 기본 SSH(22번 포트)로 어디에서나 접근 가능하다.
- "스토리지 구성"에서는 기본 8GiB로 되어있는 것을 30GiB로 늘린다. Free tier에서 최대 30GiB까지 허용한다.
- 나머지 설정은 기본값대로 두고, 인스턴스를 시작한다.
- Public IP 주소가 있는데, 이 IP로 접근한다.
- "인스턴스" -> "보안" -> "인바운드 규칙" -> "보안 그룹" -> "인바운드 규칙" -> "인바운드 규칙 편집" -> "유형"에서 "모든 TCP" 후 "규칙 저장"
- 모든 TCP에서 허용해야 외부에서 접근이 가능해진다.

3. AWS Lightsail을 사용하는 경우

![Lightsail](https://i.imgur.com/gI0LuyY.png)

- [AWS Lightsail](https://lightsail.aws.amazon.com/ls/webapp/home/instances) 사이트에 접속한다.
- "인스턴스 생성" -> "OS 전용" -> "Ubuntu 20.04 LTS" 선택
- "인스턴스 플랜"은 월별 요금 \$3.5 ~ $160로 다양하다.
- \$5 짜리가 EC2 프리티어보다 조금 더 좋다. 원하는 사양으로 선택한다.
- 고유한 인스턴스 이름을 지정하고 인스턴스를 생성한다.
- 재부팅할 때마다 IP 주소가 변하지 않도록, 고정 IP로 설정한다.
- 생성 후 "네트워킹" 설정란에서 특정 IPv4 주소 또는 범위에 대해 포트를 개방하는 규칙을 생성할 수 있다.
- "모든 IPv4 주소" 로 허용해야, 이 인스턴스 내부에서 실행되는 Jenkins나 웹사이트에 접근할 수 있다.

4. 인스턴스에 접속하기

![Termius](https://i.imgur.com/zrMIWsK.png)

- Windows 창을 통해 Microsoft Store에 접근하고 Termius를 다운받는다.
- Termius를 실행하고 "NEW HOST"를 클릭한다. 우측에 설정 입력란이 나온다.
- Label에는 원하는 이름을 적고, Address에 인스턴스의 Public IP주소를 입력한다.
- SSH를 입력하는 곳에서 "Set a Key" -> "NEW KEY" 를 클릭하여 인스턴스를 생성하며 다운받은 pem key를 삽입한다.
- SSH의 username은 OS가 Amazon이라면 "ec2-user", Ubuntu라면 "ubuntu"를 입력해준다.
- HOST가 등록이 되었다. 이제 클릭 한 번으로 인스턴스에 접근할 수 있다.

![Imgur](https://i.imgur.com/Ynfk3aa.png)

> ### 3.2 Domain Name Server Setting

DNS를 등록하는 방법은 다양하다.

1. AWS Lightsail을 사용하는 경우, Lightsail의 "도메인" 설정란을 통해 설정할 수 있다.
2. [gabia](https://domain.gabia.com/) 같은 유료 도메인 사이트에서 구매할 수 있다.

- "My가비아" -> "도메인" -> "관리" -> "DNS 정보" -> "도메인 연결"의 설정버튼 -> "DNS 설정"의 설정버튼 -> "레코드 수정"

3. [무료 도메인](https://xn--220b31d95hq8o.xn--3e0b707e/) 사이트를 통해서도 도메인을 설정할 수 있다.

DNS를 등록할 때 설정하는 값을 보면 아래와 같다.

![Imgur](https://i.imgur.com/FqUTFzH.png)

- 타입: A, CNAME
- 호스트: www, @
- 값: A면 IPv4 주소, CNAME이면 이미 설정된 도메인 이름
- TTL: 전용선 등과 같이 고정IP를 이용하는 도메인의 경우는 TTL값은 최대한 길게 잡는 것이 유리하며(권장 값 : 3600), 유동아이피의 경우는 TTL값을 최대한 줄여주는 것이 좋다.(권장 값 : 120)

> ### 3.3 기본 설정

생성한 인스턴스 서버에 접속한다.

1. ufw 상태 확인

```bash
sudo ufw status
> Status : inactive
```

2. 사용할 포트 허용하기 (ufw inactive 상태)

   `sudo ufw allow 22`

3. 등록한 포트 조회하기 (ufw inactive 상태)

   ```bash
   sudo ufw show added
   > Added user rules (see 'ufw status' for running firewall):
   > ufw allow 22
   ```

4. ufw 활성화 하기

   ```bash
   sudo ufw enable
   > Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
   > Firewall is active and enabled on system startup
   ```

5. ufw 상태 및 등록된 rule 확인하기

   ```bash
   sudo ufw status numbered
   > Status: active

       To                         Action      From
       --                         ------      ----
   [ 1] 22                         ALLOW IN    Anywhere
   [ 2] 22 (v6)                    ALLOW IN    Anywhere (v6)
   ```

6. 허용하고자 하는 PORT가 있다면 추가한다.

- 80, 9090, 443을 사용할 것이므로 추가해준다.

  ```bash
  sudo ufw allow 80
  > Rule added
  > Rule added (v6)
  sudo ufw allow 9090
  > Rule added
  > Rule added (v6)
  sudo ufw allow 443
  > Rule added
  > Rule added (v6)
  sudo ufw enable
  > Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
  > Firewall is active and enabled on system startup
  sudo ufw status numbered
  > Status: active

      To                         Action      From
      --                         ------      ----
  [ 1] 22                         ALLOW IN    Anywhere
  [ 2] 80                         ALLOW IN    Anywhere
  [ 3] 9090                       ALLOW IN    Anywhere
  [ 4] 443                        ALLOW IN    Anywhere
  [ 5] 22 (v6)                    ALLOW IN    Anywhere (v6)
  [ 6] 80 (v6)                    ALLOW IN    Anywhere (v6)
  [ 7] 9090 (v6)                  ALLOW IN    Anywhere (v6)
  [ 8] 443 (v6)                   ALLOW IN    Anywhere (v6)
  ```

7. 삭제할 때는

   `sudo ufw status numbered` 로 조회하고  
   아래에서부터 `sudo ufw delete [번호]` 로 삭제하고  
   `sudo ufw enable` 를 적용한다.

> ### 3.4 Jenkins

맨 처음 `java --version` 를 입력하면, 아직 jdk가 없기에

```bash
> Command 'java' not found, but can be installed with:

> sudo apt install openjdk-11-jre-headless  # version 11.0.19+7~us1-0ubuntu1~20.04.1, or
> sudo apt install default-jre              # version 2:1.11-72
> sudo apt install openjdk-16-jre-headless  # version 16.0.1+9-1~20.04
> sudo apt install openjdk-17-jre-headless  # version 17.0.7+7~us1-0ubuntu1~20.04
> sudo apt install openjdk-8-jre-headless   # version 8u372-ga~us1-0ubuntu1~20.04
> sudo apt install openjdk-13-jre-headless  # version 13.0.7+5-0ubuntu1~20.04
```

이렇게 설치하는 방법을 알려준다. jdk를 설치하는 이유는, jenkins를 실행시키기 위해 필요하기 때문이다. jenkins의 Java 버전은 2.357 버전 이후로 Java 11 또는 17만 지원한다. 그러므로 JDK 11 또는 17을 설치하면 된다. FE, BE 프로그램들은 도커에서 실행할 것이기에 다른 프로그램과 상관없이 설치하면 된다.

1. 설치 및 업그레이드를 자동화하는 Jenkins의 데비안 패키지 저장소를 추가하기 위해 시스템에 키를 추가

   ```bash
   curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
       /usr/share/keyrings/jenkins-keyring.asc > /dev/null
   ```

   (참고링크: [Jenkins 공식문서](https://pkg.origin.jenkins.io/debian-stable/))

2. 그런 다음 Jenkins apt 저장소 항목을 추가

   ```bash
   echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
   https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
   /etc/apt/sources.list.d/jenkins.list > /dev/null
   ```

3. 인스턴스 기본 update

   `sudo apt-get update`

4. JDK 설치 (openjdk-17)

   `sudo apt install openjdk-17-jdk openjdk-17-jre`

   Y/n을 물어본다면, Enter를 누르면 된다.
   설치 후 버전을 확인해보면 제대로 설치된 것을 알 수 있다.

   ```bash
   java --version
   > openjdk 17.0.8 2023-07-18
   > OpenJDK Runtime Environment (build 17.0.8+7-Ubuntu-120.04.2)
   > OpenJDK 64-Bit Server VM (build 17.0.8+7-Ubuntu-120.04.2, mixed mode, sharing)

   javac --version
   > javac 17.0.8
   ```

5. 젠킨스 설치

   `sudo apt-get install jenkins`

   Y/n을 물어보면, Enter를 누른다. 자동으로 대문자로 응답한다.
   여기까지 한다면?

   - Jenkins를 시작할 때 실행되는 데몬으로 설정한다. 자세한 내용은 `/etc/init.d/jenkins`를 참조.
   - 이 서비스를 실행할 'jenkins' 사용자를 만든다.
   - `/var/log/jenkins/jenkins.log` 에 로그를 출력한다.
   - `/etc/default/jenkins` 시작을 위한 구성 매개변수로 채운다 . 예:JENKINS_HOME

6. Jenkins 포트번호 변경하기

   (참고링크: [EC2에 Jenkins 설치](https://doing7.tistory.com/118))

- 톰캣 기본포트가 8080포트이기때문에 포트번호가 겹친다. Jenkins포트를 9090포트로 변경하자.

  `sudo vi /etc/default/jenkins`

  입력 후, 편집하기 위해 `i` 를 누른다. vi모드가 INSERT 모드로 변경된다.
  편집 후에는 쓴 것을 저장하고 나간다는 의미로 esc를 누르고 `:wq`를 입력한다. (write and quit)

  ```bash
  ...
  # set the umask to control permission bits of files that Jenkins creates.
  #   027 makes files read-only for group and inaccessible for others, which some security sensitive users
  #   might consider benefitial, especially if Jenkins runs in a box that's used for multiple purposes.
  #   Beware that 027 permission would interfere with sudo scripts that run on the master (JENKINS-25065.)
  #
  #   Note also that the particularly sensitive part of $JENKINS_HOME (such as credentials) are always
  #   written without 'others' access. So the umask values only affect job configuration, build records,
  #   that sort of things.
  #
  #   If commented out, the value from the OS is inherited,  which is normally 022 (as of Ubuntu
  12.04,
  #   by default umask comes from pam_umask(8) and /etc/login.defs

  # UMASK=027

  # port for HTTP connector (default 8080; disable with -1)
  HTTP_PORT=9090


  # servlet context, important if you want to use apache proxying
  PREFIX=/$NAME
  ...
  ```

7. Jenkins 실행

   `sudo systemctl start jenkins`

8. Jenkins 서비스 상태 확인

   `sudo systemctl status jenkins`

   ```bash
   jenkins.service - Jenkins Continuous Integration Server
       Loaded: loaded (/lib/systemd/system/jenkins.service; enabled; vendor preset: enabled)
       Active: active (running) since Wed 2023-08-16 07:35:28 UTC; 14min ago
   Main PID: 18037 (java)
       Tasks: 38 (limit: 1141)
       Memory: 290.0M
       CGroup: /system.slice/jenkins.service
               └─18037 /usr/bin/java -Djava.awt.headless=true -jar /usr/share/java/jenkins.war --webroot=/var/cache/jenkins/war --httpPort=8080

   Aug 16 07:34:58 ip-172-31-37-100 jenkins[18037]: [Jenkins 초기 password]
   Aug 16 07:34:58 ip-172-31-37-100 jenkins[18037]: This may also be found at: /var/lib/jenkins/secrets/initialAdminPassword
   Aug 16 07:34:58 ip-172-31-37-100 jenkins[18037]: *************************************************************
   Aug 16 07:34:58 ip-172-31-37-100 jenkins[18037]: *************************************************************
   Aug 16 07:34:58 ip-172-31-37-100 jenkins[18037]: *************************************************************
   Aug 16 07:35:28 ip-172-31-37-100 jenkins[18037]: 2023-08-16 07:35:28.735+0000 [id=30]        INFO        jenkins.InitReactorRunner$1#onAttained: Completed initialization
   Aug 16 07:35:28 ip-172-31-37-100 jenkins[18037]: 2023-08-16 07:35:28.756+0000 [id=24]        INFO        hudson.lifecycle.Lifecycle#onReady: Jenkins is fully up and running
   Aug 16 07:35:28 ip-172-31-37-100 systemd[1]: Started Jenkins Continuous Integration Server.
   Aug 16 07:35:29 ip-172-31-37-100 jenkins[18037]: 2023-08-16 07:35:29.704+0000 [id=46]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.tasks.Maven.MavenInstaller
   Aug 16 07:35:29 ip-172-31-37-100 jenkins[18037]: 2023-08-16 07:35:29.705+0000 [id=46]        INFO        hudson.util.Retrier#start: Performed the action check updates server successfully at the attempt #1
   ```

9. 젠킨스 재시작 및 종료

   `sudo systemctl restart jenkins`  
   `sudo systemctl stop jenkins`

   지금 젠킨스 status를 보면 port가 8080이다. 9090으로 변경되지 않았다. 이럴 때는

   `sudo vi /usr/lib/systemd/system/jenkins.service` 에서 변경해야 한다.

   ```bash
   # Port to listen on for HTTP requests. Set to -1 to disable.
   # To be able to listen on privileged ports (port numbers less than 1024),
   # add the CAP_NET_BIND_SERVICE capability to the AmbientCapabilities
   # directive below.
   Environment="JENKINS_PORT=9090"
   ```

   그리고 demon을 재시작 해야 한다.

   ```bash
   $ sudo systemctl daemon-reload
   $ sudo systemctl stop jenkins
   $ sudo systemctl start jenkins
   $ sudo systemctl status jenkins
   ```

   ```bash
   ● jenkins.service - Jenkins Continuous Integration Server
    Loaded: loaded (/lib/systemd/system/jenkins.service; enabled; vendor preset: enabled)
    Active: active (running) since Wed 2023-08-16 08:16:56 UTC; 19s ago
   Main PID: 19860 (java)
       Tasks: 45 (limit: 1141)
       Memory: 205.3M
       CGroup: /system.slice/jenkins.service
               └─19860 /usr/bin/java -Djava.awt.headless=true -jar /usr/share/java/jenkins.war --webroot=/var/cache/jenkins/war --httpPort=9090

   Aug 16 08:16:40 ip-172-31-37-100 jenkins[19860]: Jenkins initial setup is required. An admin user has been created and a password generated.
   Aug 16 08:16:40 ip-172-31-37-100 jenkins[19860]: Please use the following password to proceed to installation:
   Aug 16 08:16:40 ip-172-31-37-100 jenkins[19860]: [Jenkins 초기 password]
   Aug 16 08:16:40 ip-172-31-37-100 jenkins[19860]: This may also be found at: /var/lib/jenkins/secrets/initialAdminPassword
   Aug 16 08:16:40 ip-172-31-37-100 jenkins[19860]: *************************************************************
   Aug 16 08:16:40 ip-172-31-37-100 jenkins[19860]: *************************************************************
   Aug 16 08:16:40 ip-172-31-37-100 jenkins[19860]: *************************************************************
   Aug 16 08:16:56 ip-172-31-37-100 jenkins[19860]: 2023-08-16 08:16:56.390+0000 [id=31]        INFO        jenkins.InitReactorRunner$1#onAttained: Completed initialization
   Aug 16 08:16:56 ip-172-31-37-100 jenkins[19860]: 2023-08-16 08:16:56.411+0000 [id=24]        INFO        hudson.lifecycle.Lifecycle#onReady: Jenkins is fully up and running
   Aug 16 08:16:56 ip-172-31-37-100 systemd[1]: Started Jenkins Continuous Integration Server.
   ```

![jenkins 초기 화면](https://i.imgur.com/nFEpfvb.png)

10. Jenkins 초기 password 입력
    CLI에서 나오는 [Jenkins 초기 password]를 입력하면 된다.

11. Customize Jenkins
    Customize Jenkins에서 Install suggested plugins를 클릭하여 기본적인 플러그인을 추가한다.
    그 후 계정 정보를 입력하고 로그인하면 된다.

12. 필요한 플러그인들을 다운받는다.
    "Dashboard" > "Jenkins 관리" > "Plugins" > "Available plugins" - Generic Webhook Trigger - Gitlab - Gitlab API - Gitlab Authentication - Mattermost Notification - Docker pipeline

13. 추후 작업
    - Jenkins 추가 설정
    - Credentials 설정
    - Pipeline 만들기

> ### 3.5 Docker, Docker-Compose

1. 인스턴스 기본 update

   `sudo apt-get update`

2. 설치에 필요한 SW 설치

   - ca-certificates: 인증서 관련 모듈
   - curl: HTTP 등을 통해 파일을 내려받기 위한 모듈
   - gnupg: 디지털 서명을 사용하기 위한 모듈
   - lsb-release: 리눅스 배포판을 식별하는 데 이용되는 모듈

   ```bash
   sudo apt-get install \
   apt-transport-https \
   ca-certificates \
   curl \
   gnupg \
   lsb-release
   ```

   Y/n 을 물어보면 Enter를 누른다.

3. 서명키로 사용할 GPG 키를 추가

- 디렉토리를 만들고, 권한 부여

  `sudo mkdir -m 0755 -p /etc/apt/keyrings`

- GPG 키 추가

  `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`

4. 안정화된 Repository 환경 구축

   ```bash
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. 도커 설치

   ```bash
   sudo apt-get update

   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

   설치 후 버전을 확인해본다.

   ```bash
   docker --version
   > Docker version 24.0.5, build ced0996
   ```

6. 관리자 외에도 Docker를 사용할 수 있도록 설정

   `sudo usermod -aG docker ubuntu`

7. 도커 컴포즈 설치

- 도커 컴포즈 설치
- 도커 컴포즈에 권한을 설정
- 심볼릭 링크 설정 (설정을 안해주면 path에러 발생)
- 설치 된 도커컴포즈 버전 확인

  ```bash
  sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                  Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
  100 15.4M  100 15.4M    0     0  7316k      0  0:00:02  0:00:02 --:--:-- 10.8M

  sudo chmod +x /usr/local/bin/docker-compose
  sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
  docker-compose -version
  > docker-compose version 1.24.1, build 4667896b
  ```

- 참고링크: [도커 설치](https://erinh.tistory.com/entry/CICD-Spring-Jenkins-Nginx-EC2-Docker%EB%A1%9C-%EB%AC%B4%EC%A4%91%EB%8B%A8-%EB%B0%B0%ED%8F%AC-%EA%B5%AC%ED%98%84-1-EC2-%EC%84%9C%EB%B2%84-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95-%EB%8F%84%EC%BB%A4-%EC%A0%A0%ED%82%A8%EC%8A%A4-Nginx-JDK-MySQL-Redis-%EC%84%A4%EC%B9%98), [도커 컴포즈 설치](https://soyoung-new-challenge.tistory.com/73#google_vignette)

> ### 3.6 S3 준비

1. AWS S3 Bucket 생성

   - AWS S3 이동
   - "버킷 만들기" 클릭
   - Bucket 이름 입력, AWS Region 선택
   - 나머지 Default 값으로 둔다.

2. IAM 사용자 S3 접근 권한 추가

   - 사용자 추가, 사용자 이름 입력
   - AWS 액세스 유형 > "프로그래밍 방식 액세스"
   - AmazonS3FullAccess 권한 추가

3. Spring의 `build.gradle.kts`에  
   `implementation("com.amazonaws:aws-java-sdk-s3:1.12.519")` 추가

4. Spring의 `application.yml`에 아래 코드 추가

```yml
cloud:
  aws:
    credentials:
      accessKey: ${AWS_ACCESS_KEY_ID} # AWS IAM AccessKey 적기
      secretKey: ${AWS_SECRET_ACCESS_KEY} # AWS IAM SecretKey 적기
    s3:
      bucket: 버킷 이름 # ex) marryting-gyunny
      dir: S3 디렉토리 이름 # ex) /gyunny
    region:
      static: ap-northeast-2
    stack:
      auto: false
```

- [참고 블로그](https://devlog-wjdrbs96.tistory.com/323)

---

# 4. Deployment Setting

> ### 4.1 Jenkins-Credentials

1. GitLab Credentials 설정
   "Dashboard" -> "Jenkins 관리" -> "Credentials" -> (global) -> "+ Add Credentials" 버튼

![Imgur](https://i.imgur.com/91xT0Wd.png)

- Username with password 방식으로 인증정보 생성
- Username에는 email을 작성하여 알아보기 쉽게 하자.
- Password에는 GitLab 계정의 Token을 삽입한다.
  ![Imgur](https://i.imgur.com/zZn8UEs.png)
  - GitLab > User Setting > Access Tokens > 토큰이름 / 만료일자 / 허용범위를 지정하여 생성 > 토큰 고유번호를 복사하여 따로 저장해 둔다.
- 이 Credential의 이름이 되는 ID를 입력한다.
- Token 고유번호 입력 외에 GitLab 관련 설정이 없는데도, 나중에 GitLab과 연결될 때 사용된다.

> ### 4.2 Jenkins-Pipeline

1. Jenkins에서 GitLab 설정
   "Jenkins 관리" > "System" > "GitLab"

- Connection name: 원하는 이름
- GitLab host URL: GitLab의 Domain이름만 작성. 뒤의 URI는 생략 `ex) http://gitlab.mydomain.com`
- Credentials는 이전에 설정했기에 여기선 설정하지 않아도 된다.

2. Pipeline 생성

![Imgur](https://i.imgur.com/Kblfoea.png)

- \+ 새로운 Item > Pipeline > OK

3. GitLab과 Pipeline 연동

- Pipeline > 구성 > Build Triggers > Build when a change is pushed to GitLab. GitLab webhook URL: http://[DOMAIN]/project/[ITEM_NAME] 체크
- Build를 유발할 Trigger 옵션을 선택하여 적용한다.
- 선택 후 "고급"을 눌러 Webhook 설정을 위한 Secret Token을 발급받는다. (Generate 클릭)
- GitLab Project > Settings > Webhooks
  ![Imgur](https://i.imgur.com/KSr7XPE.png) - URL: Jenkins Project URL 입력 - Secret token: 방금 생성한 Secret token 입력 - Trigger: 원하는 Event 설정
- 생성 후, Test를 눌렀을 때 200 응답이 return 되면 성공이다.
  ![Imgur](https://i.imgur.com/8pBq7VO.png)

4. Pipeline script 작성
   "Pipeline script" 와 "Pipeline script from SCM" 둘 중 하나의 방식으로 script를 작성할 수 있다. "Pipeline script"는 Jenkins 내부에서 script를 작성하는 것이고, "Pipeline script from SCM"는 개발 프로젝트에 jenkinsfile을 작성하여 이 파일을 읽어들이는 것이다. SCM은 외부에 노출될 가능성이 있다는 단점이 있다. 이 프로젝트에서는 "Pipeline script" 를 작성했다.

   - Merge Request 했을 때, 요청 브랜치 Build 테스트하는 jenkinsfile. 브랜치 이름에 필터를 적용시켜 원하는 브랜치에만 적용시킨다.

   ```bash
   properties([[$class: 'GitLabConnectionProperty', gitLabConnection: 'gitlab_connention']])

   pipeline {
       agent any     // 사용 가능한 에이전트에서 이 파이프라인 또는 해당 단계를 실행

       options {
           gitLabConnection('gitlab-token')
           gitlabBuilds(builds: ['build'])
       }

       // 진행할 Pipeline들
       stages {
           // Pipeline의 요소 하나. Git의 소스코드를 가져온다.
           stage('Git clone BE') {
               steps {
                   checkout (
                       [
                           $class: 'GitSCM',
                           branches: [[name: "origin/${env.gitlabSourceBranch}"]],
                           extensions: [[
                               $class: 'PreBuildMerge',
                               options: [
                                   fastForwardMode: 'FF',
                                   mergeRemote: 'origin',
                                   mergeStrategy: 'DEFAULT',
                                   mergeTarget: "${env.gitlabTargetBranch}"
                               ]
                           ]],
                           userRemoteConfigs: [[
                               name: 'origin',
                               credentialsId: "gitlab-token",
                               url: '[GITLAB_URL]'
                           ]]
                       ]
                   )
               }

               // step 이후 수행
               post {
                   // 실패했을 때
                   failure {
                       sh 'echo "Fail Cloned Repository"'
                   }
                   // 성공했을 때
                   success {
                       sh 'echo "Successfully Cloned Repository"'
                   }
               }
           }

           // 가져온 소스코드를 Build 해본다.
           stage('Build BE Code') {
               steps {
                   // var/lib/jenkins에서 gradlew 파일이 있는 곳으로 경로 이동
                   dir('backend') {
                       // 실행권한 부여 후 build 실행
                       sh '''
                           chmod +x ./gradlew
                           ./gradlew clean build --exclude-task test
                       '''
                   }
               }
               post {
                   // build 실패시
                   failure {
                       echo 'gradle build failed'
                       updateGitlabCommitStatus name: 'build', state: 'failed'
                   }
                   // build 성공시
                   success {
                       echo 'gradle build success'
                       updateGitlabCommitStatus name: 'build', state: 'success'
                   }
               }
           }
       }
   }
   ```

   - Merge Accept 했을 때 dev/be 브랜치의 코드를 가져와 백엔드 프로그램을 배포하는 jenkinsfile

   ```bash
   pipeline {
       agent any 	// 사용 가능한 에이전트에서 이 파이프라인 또는 해당 단계를 실행

       environment {
           GIT_URL = "[GITLAB_URL]";
           BE_IMAGE_NAME = "BE_IMAGE_NAME"
       }

       stages {
           stage('Git clone BE') {
               steps {
                   git branch: 'dev/be',
                   url: "${GIT_URL}",
                   credentialsId: "gitlab-token"
               }

               post {
                   success {
                       sh 'echo "Successfully Cloned Repository"'
                   }
                   failure {
                       sh 'echo "Fail Cloned Repository"'
                   }
               }
           }



           // 가져온 소스코드를 Build 해본다.
           stage('Build BE Code') {
               steps {
                   // var/lib/jenkins에서 gradlew 파일이 있는 곳으로 경로 이동
                   dir('backend') {
                       // 실행권한 부여 후 build 실행
                       sh '''
                           chmod +x ./gradlew
                           ./gradlew clean build --exclude-task test
                       '''
                   }
               }
               post {
                   // build 실패시
                   failure {
                       echo 'gradle build failed'
                   }
                   // build 성공시
                   success {
                       echo 'gradle build success'
                   }
               }
           }

           stage('Docker down') {
               steps {
                   dir('backend') {
                       sh 'docker-compose down --rmi all'
                   }
               }
               post {
                   failure {
                       echo 'Down Failed'
                   }
                   success {
                       echo 'Down Success'
                   }
               }
           }

           stage('Docker Image Build'){
               steps{
                   dir('backend') {
                       sh 'docker build -t ${BE_IMAGE_NAME} .'
                   }
               }
               post {
                   failure {
                       sh 'echo "Build Docker Image Fail"'
                   }
                   success {
                       sh 'echo "Build Docker Image Success"'
                   }
               }
           }


           stage('Docker up') {
               steps {
                   dir('backend') {
                       sh 'docker-compose up -d'
                   }
               }
               post {
                   failure {
                       echo 'Deploy Failed'
                   }
                   success {
                       echo 'Deploy Success'
                   }
               }
           }
       }
   }
   ```

   - Python BE 코드를 GitLab에서 가져와서 Build를 진행하고 기존 도커 컨테이너를 종료, 도커 이미지를 삭제, 도커 이미지를 만들어 도커를 실행한다.

   ```bash
   pipeline {
       agent any 	// 사용 가능한 에이전트에서 이 파이프라인 또는 해당 단계를 실행

       environment {
           GIT_URL = "[프로젝트 URL (.git 까지)]"
           AI_IMAGE_NAME = "[Docker image 이름]"
           AI_CONTAINER_NAME = "[Docker container 이름]"
       }

       stages {
           stage('Git clone BE') {
               steps {
                   git branch: 'dev/python/be',
                   url: "${GIT_URL}",
                   credentialsId: "gitlab-token"
               }

               post {
                   success {
                       sh 'echo "Successfully Cloned Repository"'
                   }
                   failure {
                       sh 'echo "Fail Cloned Repository"'
                   }
               }
           }

           stage('Docker container kill'){
               steps{
                   sh 'docker rm -f ${AI_CONTAINER_NAME}'
               }
           }

           stage('Docker Image remove'){
               steps{
                   sh 'docker rmi ${AI_IMAGE_NAME}'
               }
           }


           stage('Docker Image Build'){
               steps{
                   dir('pythonBackend') {
                       sh 'docker build -t ${AI_IMAGE_NAME} .'
                   }
               }
               post {
                   failure {
                       sh 'echo "Build Docker Image Fail"'
                   }
                   success {
                       sh 'echo "Build Docker Image Success"'
                   }
               }
           }


           stage('Docker Start') {
               steps {
                   dir('디렉토리') {
                       sh 'docker run -d --network backend_zoosumnetwork -h 0.0.0.0 -p 8000:8000 -P --name fastapi-container zoosum_ai uvicorn fastapiserver:app --host 0.0.0.0 --port 8000 --workers 4'
                   }
               }
               post {
                   failure {
                       echo 'Deploy Failed'
                   }
                   success {
                       echo 'Deploy Success'
                   }
               }
           }
       }
   }
   ```

> ### 4.3 Dockerfile

Pipeline의 script를 보면, Develop/BackEnd/joinit 경로에 BackEnd의 Dockerfile이 있고,
Develop/FrontEnd/joinit 경로에 FrontEnd의 Dockerfile이 있다는 것을 알 수 있다.

1. BackEnd Dockerfile

```dockerfile
# FROM: 이미지 지정
FROM openjdk:17

# ARG: docker build 커맨드를 사용할 때 입력받을 수 있는 인자를 선언
ARG JAR_FILE=build/libs/*.jar

# COPY: 이미지에 파일이나 폴더를 추가
COPY ${JAR_FILE} app.jar

# ENTRYPOINT: 컨테이너를 실행할 때 실행할 명령어 강제 지정
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Jenkins에서 Git Clone으로 소스코드를 가져와 빌드를 하면 build 파일이 생기는데,
이 build 파일을 openjdk:17 으로 실행시키는 이미지를 생성한다.
이 이미지를 기반으로 컨테이너가 만들어지면, 바로 실행된다.

2. Front
   사용자가 다운로드하는 apk파일이 Front 코드다.

3. Python BackEnd Dockerfile

   ```
   # FROM: 이미지 지정
   FROM ultralytics/ultralytics

   # COPY: 이미지에 파일이나 폴더를 추가
   COPY fastapiserver.py fastapiserver.py
   COPY yolov8s_custom.pt yolov8s_custom.pt
   COPY yolov8n_custom.pt yolov8n_custom.pt

   RUN pip install fastapi
   RUN pip install uvicorn
   RUN pip install python-multipart
   ```

ultralytics가 설치된 container 실행시키는 기본 이미지를 불러온다.

Jenkins에서 Git Clone으로 소스코드를 가져온 파일 중 필요한 파일을 container 내부로 복사한다.
pip install 명령어를 통해 추가로 필요한 package 를 설치한 후 이미지를 빌드한다.

> ### 4.4 docker-compose.yml

`docker-compose.yml` 의 volumes 기능을 사용하기 위한 두 방식이 있다. 절대경로로 지정한다.

1. 서버에 파일을 만들어 두어, 이것을 도커 컨테이너에 적용시키기
   - 홈 디렉토리에 있는 파일을 사용하려면 `~`을 사용한다.
   - 루트 디렉토리에 있는 파일을 사용하려면 `/`부터 시작한다.
2. Gitlab 프로젝트 특정 폴더에 작성하여 이것을 가져와 도커 컨테이너에 적용시키기
   - /var/lib/jenkins/workspace/[Pipeline이름]/[프로젝트폴더경로]

```dockerfile
version: '3'

# 컨테이너들
services:
    # nginx 라는 service
    nginx:
        # 사용되는 이미지
        image: nginx:1.15-alpine
        # 만들어질 컨테이너명
        container_name: nginx-container
        # 도커 네트워크
        networks:
            - backend_zoosumnetwork
        # 환경
        environment:
            - TZ=Asia/Seoul
        # 의존하고 있는 서비스(컨테이너)
        depends_on:
            - spring
        # 재시작하는 경우
        restart: unless-stopped
        # 컨테이너가 만들어질 때, 가져올 데이터들.
        # jenkins를 통해 실행되므로 var/lib/jenkins 하위 디렉토리에서 데이터를 가져온다.
        volumes:
            - /var/lib/jenkins/workspace/B102-SERVER-DEPLOY/backend/src/main/resources/index:/usr/share/nginx/html
            - /data/nginx:/etc/nginx/conf.d
            - /data/certbot/conf:/etc/letsencrypt
            - /data/certbot/www:/var/www/certbot
        # 외부에 공개할 포트
        ports:
            - "80:80"
            - "443:443"
        # 컨테이너가 만들어진 후에 실행할 명령어
        command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
    # certbot 이라는 service
    certbot:
        # 사용되는 이미지
        image: certbot/certbot
        # 만들어질 컨테이너명
        container_name: certbot-container
        # 도커 네트워크
        networks:
            - backend_zoosumnetwork
        # 재시작하는경우
        restart: unless-stopped
        # 컨테이너가 만들어질 때, 가져올 데이터들
        # jenkins를 통해 실행되므로 var/lib/jenkins 하위 디렉토리에서 데이터를 가져온다.
        volumes:
            - ~/data/certbot/conf:/etc/letsencrypt
            - ~/data/certbot/www:/var/www/certbot
        # 컨테이너가 만들어진 후에 강제로 실행할 명령어
        entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
    # spring 이라는 service
    spring:
        # 사용되는 이미지
        image: [서버 안에 만들어진 도커 이미지]
        # 만들어질 컨테이너명
        container_name: spring-container
        # 도커 네트워크
        networks:
            - backend_zoosumnetwork
        # 재시작하는경우
        restart: always
        # 컨테이너 내부에서 도커 네트워크에게 열어주는 포트
        expose:
            - "5000"
        environment:
            TZ: "Asia/Seoul"

# 도커 네트워크
networks:
    # 도커 네트워크 이름
    backend_zoosumnetwork:
        # 외부에 만들어 둔 네트워크를 사용한다. 즉, 네트워크는 삭제하지 않는다.
        external: true


```

- [참고 블로그](https://velog.io/@oneook/Docker%EB%A1%9C-React-%EA%B0%9C%EB%B0%9C-%EB%B0%8F-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

> ### 4.5 SSL 적용

- [참고 블로그](https://velog.io/@zero-black/Docker-compose-certbot-nginx-%EB%A1%9C-SSL-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89%ED%95%98%EA%B8%B0)
- [참고 블로그(영어)](https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)

1. 준비사항

- 본인의 서버를 띄우고 도메인을 발급받아서 DNS에 등록된 도메인이 있어야 SSL인증을 받을 수 있다.
- Docker와 Docker-compose가 준비되어 있어야 한다.
- 한 컨테이너에서 nginx를 실행하고 다른 컨테이너에서 HTTPS 인증서를 얻고 갱신하기 위한 서비스를 실행하는 docker-compose 설정을 구축할 것이다.

2. `docker-compose.yml` 파일 구성

   ```dockerfile
   version: '3'
   services:
   nginx:
       image: nginx:1.15-alpine
       ports:
       - "80:80"
       - "443:443"
       volumes:
       - /data/nginx:/etc/nginx/conf.d
       - /data/certbot/conf:/etc/letsencrypt
       - /data/certbot/www:/var/www/certbot
   certbot:
       image: certbot/certbot
       volumes:
       - /data/certbot/conf:/etc/letsencrypt
       - /data/certbot/www:/var/www/certbot
   ```

3. `data/nginx/app.conf` 파일 구성

   ```conf
   server {
       listen 80;
       server_name [내 도메인 주소];

       location / {
           return 301 https://$host$request_uri;
       }

       location /.well-known/acme-challenge/ {
           root /var/www/certbot;
       }
   }

   server {
       listen 443 ssl;
       server_name [내 도메인 주소];

       ssl_certificate /etc/letsencrypt/live/[내 도메인 주소]/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/[내 도메인 주소]/privkey.pem;
       include /etc/letsencrypt/options-ssl-nginx.conf;
       ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

       location / {
           proxy_pass http://[내 도메인 주소]; #for demo purposes
       }
   }
   ```

4. Let's Encrypt 유효성 검사
   Let's Encrypt 유효성 검사를 수행하려면 nginx가 필요하지만 인증서가 없으면 nginx가 시작되지 않는다.
   그래서 더미 인증서를 생성하고, nginx를 시작하고, 더미를 삭제하고 실제 인증서를 요청할 것이다.
   이를 위해 편리한 스크립트가 있다.

   - `init-letsencrypt.sh` 안에 script를 다운받는다.

   ```
    curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh
   ```

   - ⭐(중요!!) `init-letsencrypt.sh`를 편집하여 도메인과 이메일 주소를 추가한다.
   - 그 후에 실행권한을 부여하고, 실행한다.

   ```
    chmod +x init-letsencrypt.sh
    sudo ./init-letsencrypt.sh
   ```

5. 자동 인증서 갱신

   - docker-compose.yml의 certbot 부분에 아래 코드를 추가한다. 이 코드는 자동으로 인증서를 갱신해주는 코드다.

   ```
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
   ```

   - nginx 부분에서는 새로 얻은 인증서를 다시 받아오는지 확인해야 하므로 아래 코드를 추가한다.

   ```
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
   ```

6. 최종 설정 파일

- `docker-compose.yml`

  ```dockerfile
  version: '3'

  services:
  nginx:
      image: nginx:1.15-alpine
      restart: unless-stopped
      volumes:
      - ./data/nginx:/etc/nginx/conf.d
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
      ports:
      - "80:80"
      - "443:443"
      command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
  certbot:
      image: certbot/certbot
      restart: unless-stopped
      volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
      entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
  ```

- `data/nginx/app.conf`

  ```conf
  server {
      listen 80;
      server_name [내 도메인 주소];
      server_tokens off;

      location /.well-known/acme-challenge/ {
          root /var/www/certbot;
      }

      location / {
          return 301 https://$host$request_uri;
      }
  }

  server {
      listen 443 ssl;
      server_name [내 도메인 주소];
      server_tokens off;

      ssl_certificate /etc/letsencrypt/live/[내 도메인 주소]/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/[내 도메인 주소]/privkey.pem;
      include /etc/letsencrypt/options-ssl-nginx.conf;
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

      location / {
          proxy_pass  http://[내 도메인 주소];
          proxy_set_header    Host                $http_host;
          proxy_set_header    X-Real-IP           $remote_addr;
          proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
      }
  }
  ```

> ### 4.6 Nginx Setting

`nginx.conf`

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # 여기서 아래 app.conf 파일을 불러온다.
    include /etc/nginx/conf.d/*.conf;
}
```

위 파일의 마지막 부분을 보면, include 로 다른 파일을 http { } 안으로 가져온다.
그 파일이 아래의 `app.conf` 파일이다. `app.conf` 파일의 내용들은 http { } 안에 들어가게 될 내용들이다.

`app.conf`

```conf
# 프로젝트 특성상 GIF 파일 전송이 가능하도록 용량을 늘렸다.
client_max_body_size 100M;

# upstream을 통해 nginx reverse proxy 기능을 사용한다.
# upstream 우측의 이름은 nginx 내부에서 사용되는 host 이름이고
# 구현부의 server 우측의 이름은 docker-compose에서 선언한 service의 이름이다.
upstream react {
        server react:3000;
}

upstream spring {
        server spring:5000;
}


# 80 포트번호로 들어오면 https로 redirect 시켜준다.
server {
    listen 80;
    server_name join-it.site www.join-it.site;
    server_tokens off;

    location / {
        return 301 https://$host$request_uri;
    }

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
    }
}

# join-it.site 도메인으로 https, 443으로 들어왔을 때 reverse proxy 설정을 해준다.
# / 로 들어오면 react로 들여보내고, /api로 들어오면 spring으로 들여보낸다.
# nginx 이후로는 도커 네트워크를 통해 컨테이너간 통신이 가능해지므로 http가 된다.
server {
    listen 443 ssl;
    server_name join-it.site www.join-it.site;
    server_tokens off;

    # certbot으로 SSL 인증을 받은 파일들의 위치를 명시함으로서 https 기능이 활성화된다.
    ssl_certificate /etc/letsencrypt/live/join-it.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/join-it.site/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass                              http://react;
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;

        proxy_buffer_size                       128k;
        proxy_buffers                           4 256k;
        proxy_busy_buffers_size                 256k;
    }

    location /api {
        proxy_pass                              http://spring;
        proxy_set_header   Host                 $host;
        proxy_set_header   X-Real-IP            $remote_addr;
        proxy_set_header   X-Forwarded-For      $proxy_add_x_forwarded_for;
    }
}
```

- [참고 블로그](https://velog.io/@shin6949/Nginx-Reverse-Proxy-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-feat.-Docker)

# 5. Files Ignored

> ### 5.1 Front-end

`.gitignore`

```
# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
ios/.xcode.env.local

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/
*.keystore
!debug.keystore

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

**/fastlane/report.xml
**/fastlane/Preview.html
**/fastlane/screenshots
**/fastlane/test_output

# Bundle artifact
*.jsbundle

# Ruby / CocoaPods
/ios/Pods/
/vendor/bundle/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*

# testing
/coverage
```

> ### 5.2 Back-end

`.gitignore`

```
HELP.md
.gradle
build/
!gradle/wrapper/gradle-wrapper.jar
!**/src/main/**/build/
!**/src/test/**/build/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache
bin/
!**/src/main/**/bin/
!**/src/test/**/bin/

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr
out/
!**/src/main/**/out/
!**/src/test/**/out/

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/

### VS Code ###
.vscode/

!**/src/main/generated/
Q*.java
```
