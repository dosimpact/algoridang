<div align="center">

# Welcome 알고리당 👏  

## ReactJS 웹 클라이언트

<!-- ![IMG](https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272503198d_thumb04.png) -->

> 알고리당 서비스의 코드와 문서를 정리한 깃 레포 입니다.     

[![Badge](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=React&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/Recoil-000000?style=for-the-badge&logo=ReactRouter&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/ReactQuery-35BDB2?style=for-the-badge&logo=ReactTable&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/AntDesign-0170FE?style=for-the-badge&logo=AntDesign&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](#)


</div>


<!-- COMMON-SECTION ABOUT THE PROJECT -->
## 알고리당 프로젝트 소개

> 퀀트 전략 설계를 통해 개인투자자들에게 일관적 투자성향을 제공하는 SW플랫폼  
  
<br/>
<img src="./docs/img/landing.gif">

"주식, 퀀트로 달콤해지다"
낮은 금융 지식이 요구되는 방식으로 누구나 퀀트 전략을 수립   
전략을 백테스트를 통해 검증하고, 자만의 퀀트 전략을 기반으로 알림 제공    
수익이 나는 자신만의 전략을 공유 및 판매를 할 수 있는 SW 플랫폼을 제공     

<br/>

## 핵심 기능 개요 

- [x] 전략 탐색 하기(Taker)  
  - [x] 종목탐색 
  - [x] 전략탐색 
  - [x] 전략상세 보기 및 백테스트 결과 
  - [x] 모의투자 
  - [x] 퀀트 리포트


|종목탐색|전략탐색|
|---|---|
|<img src="./docs/img/demo-1.gif"> |  <img src="./docs/img/demo-2.gif">|  
<br/>


|전략상세 보기 및 백테스트 결과|모의투자|
|---|---|
|<img src="./docs/img/demo-3.gif"> |  <img src="./docs/img/demo-4.gif">|  
<br/>

|퀀트 리포트|
|---|
|<img src="./docs/img/demo-5.gif">|  
<br/>

- [x] 전략 생성 하기(Taker)  
  - [x] 전략 생성 대시 보드 
  - [x] 퀀트 발굴
  - [x] 매매 전략 설정 (기술적 지표 추천 ) 
  - [x] 백테스팅 및 미리보기

|전략 생성 대시 보드 |
|---|
|<img src="./docs/img/maker-demo-1.png">|  
<br/>

|퀀트 발굴 |
|---|
|<img src="./docs/img/maker-demo-2.png">|  
<br/>

|매매 전략 설정 (기술적 지표 추천 )  |
|---|
|<img src="./docs/img/maker-demo-3.png">|  
<br/>

|백테스팅 및 미리보기 |
|---|
|<img src="./docs/img/maker-demo-4.png">|  
<br/>

## 주요 기능

- 투자전략 `생성대시보드` : 종목 (유니버스)에 투자 매매 전략 적용 시켜 `나만의 투자 알고리즘 생성`  
- 투자종목 `퀀트 발굴` 기능 : `재무정보 기반`의 종목 발굴 기능  
- 투자전략 `백테스트` : 알고리즘 `백테스트` 기능 ( 과거 데이터로 매매 시뮬레이션 )  
- 투자전략 `퀀트리포트` : 백테스트 결과 `리포트` 처리  
- 투자전략 `공유` : 선정된 종목과 매매전략 자체를 수요자에게 공유 가능  
- 투자전략 `따라하기` : 수요자는 투자 전략을 탐색 및 모의투자 기능
- 투자전략 `성향별 분류` : 샤프 변동성을 기준으로 안정형, 중립형, 수익추구형 분류  
- 구매한 전략 `모의투자` 기능 : 구매한 시점부터 현재까지 시뮬레이션 배치 기능  


## 알고리당 주요 기술 과제

- [ TypeScript ] TS 기반의 `CBD` 기반의 리액트 클라이언트 및 DI 패턴의 비즈니스 `서버 아키텍처 설계`  
- [ TypeScript ] Client 사이드에서 `Server 코드의 재사용` ( 예) Entity,DTO 부분 )  
- [BE] 투자 전략 시뮬레이션 처리 안정성을 위해,  데이터 서버간 `Redis 메시지 큐` 도입  
- [BE] 쿼리 지역성을 고려한 '가격 데이터 호출 부분' `Redis API Cache 적용`  
- [BE] JWT 토큰 미들웨어 기반의 `Authentication` 및 Auth 데코레이터 기반의 `Authorization`   
- [FE] `Recoil` 기반의 `중앙집중식 애러핸들링` 구현    
- [FE] `React-Query` 기반의 `ServerState 캐시 관리` 및 `Hooks 모듈화`  
- [FE] `Headless Components 구조` 도입으로, 구현층은 hook 및 표현층은 Presenter 컴포넌트로 분리 
- [FE] `styled-components` 도입, 글로벌 CSS, 글로벌 Theming 변수  
- [FE] 리랜더링 최소화 ( `메모이제이션` 및 `SSR` )   
- [CI/CD] TestServer (Heroku, Netlify), ProdServer ( pipeline 구축 , TestCode, Docker 베포 ) 

## 알고리당 기술 블로그

https://velog.io/@ypd03008/series/%EC%95%8C%EA%B3%A0%EB%A6%AC%EB%8B%B9  
[![algebraic data types](https://img.shields.io/badge/BLOG%20POST%20LINK-663399?style=flat-square&logo=blog&logoColor=white)](https://velog.io/@ypd03008/series/%EC%95%8C%EA%B3%A0%EB%A6%AC%EB%8B%B9)                 


<!-- INDIVIDUAL-SECTION ABOUT THE PROJECT -->

## React 주요 프로젝트 산출물

|항목|설명|링크|
|--|--|--|
|IA feature.1| https://www.notion.so/IA-feature-1-c9b17b3175f44bf89568b8629fe637f9 |[:link:](https://www.notion.so/IA-feature-1-c9b17b3175f44bf89568b8629fe637f9)|  
|Kakao Oven| https://ovenapp.io/view/LNFoHDLgOyH8tHCbjHU2MPApjlDtp6bL/ |[:link:](https://ovenapp.io/view/LNFoHDLgOyH8tHCbjHU2MPApjlDtp6bL/)|
|UML-상태다이어그램| https://www.notion.so/UML-c9e92ac8581b4377b0b5dc0180f8c27c |[:link:](https://www.notion.so/UML-c9e92ac8581b4377b0b5dc0180f8c27c)
