<div align="center">

# Welcome 알고리당 👏  

## 데이터 분석 서버

<!-- ![IMG](https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272503198d_thumb04.png) -->

> 알고리당 서비스의 코드와 문서를 정리한 깃 레포 입니다.     

[![Badge](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/Celery-MQ-37814A?style=for-the-badge&logo=Celery&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/redis-MQ-DC382D?style=for-the-badge&logo=redis&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/PostgreSQL-DB-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=red)](#)

</div>



<!-- ABOUT THE PROJECT -->
## 알고리당 프로젝트 소개

> 퀀트 전략 설계를 통해 개인투자자들에게 일관적 투자성향을 제공하는 SW플랫폼  
  
<br/>

"주식, 퀀트로 달콤해지다"
낮은 금융 지식이 요구되는 방식으로 누구나 퀀트 전략을 수립   
전략을 백테스트를 통해 검증하고, 자만의 퀀트 전략을 기반으로 알림 제공    
수익이 나는 자신만의 전략을 공유 및 판매를 할 수 있는 SW 플랫폼을 제공     

|종목탐색|전략탐색|
|---|---|
|<img src="./docs/img/demo-1.gif"> |  <img src="./docs/img/demo-2.gif">|  
<br/>


## 주요 기능

- 투자전략 생성 : 종목 (유니버스)에 투자 매매 전략 적용 시켜 `나만의 투자 알고리즘 생성`  
- 투자전략 테스트 : 알고리즘 `백테스트` 기능 ( 과거 데이터로 매매 시뮬레이션 )  
- 투자전략 리포트 : 백테스트 결과 `리포트` 처리  
- 투자전략 `판매` : 선정된 종목과 매매전략 자체를 수요자한테 팔 수 있는 기능  
- 투자전략 `구매` : 수요자는 투자 전략을 탐색하고 구매할 수 있는 기능  
- 구매한 전략 `모의투자` 기능 : 구매한 시점부터 현재까지 시뮬레이션 배치 기능  
- 투자종목 발굴 기능 : `재무정보 기반`의 종목 발굴 기능  


## 주요 기술 과제

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
- [DA] Flask OLAP MSA 설계 
- [DA] 퀀트 투자 백테스트 시뮬레이션 메시지 큐
- [DA] 퀀트 투자 리포트 제너레이터 메시지 큐

## 기술 블로그

https://velog.io/@ypd03008/series/%EC%95%8C%EA%B3%A0%EB%A6%AC%EB%8B%B9  
[![algebraic data types](https://img.shields.io/badge/BLOG%20POST%20LINK-663399?style=flat-square&logo=blog&logoColor=white)](https://velog.io/@ypd03008/series/%EC%95%8C%EA%B3%A0%EB%A6%AC%EB%8B%B9)                 



## 주요 프로젝트 산출물

|항목|설명|링크|
|--|--|--|
|DB 설계 업무 플로우| https://www.notion.so/DB-63d9d2a228224bb2acb6e55fbf0c4429 |[:link:](https://www.notion.so/DB-63d9d2a228224bb2acb6e55fbf0c4429)
|ERD| https://www.erdcloud.com/d/wDaNNLi4fhT8Tvibc |[:link:](https://www.erdcloud.com/d/wDaNNLi4fhT8Tvibc)
|DataServer 단위 설계| https://www.notion.so/DataServer-6358e451ddbc48e79ca92772cf138da6 |[:link:](https://www.notion.so/DataServer-6358e451ddbc48e79ca92772cf138da6)|  
|cerebro_cheat_on_open | https://www.notion.so/cerebro_cheat_on_open-68462fe26ee746f8ba332a3bf2e8fa27 |[:link:](https://www.notion.so/cerebro_cheat_on_open-68462fe26ee746f8ba332a3bf2e8fa27)|
|quantstats| https://www.notion.so/quantstats-688150a8cadb437daae941bd03e09a2b |[:link:](https://www.notion.so/quantstats-688150a8cadb437daae941bd03e09a2b)
|Celery-ubuntu| https://www.notion.so/Celery-ubuntu-e2eb6df00bc54f88bcb01075643e01cf |[:link:](https://www.notion.so/Celery-ubuntu-e2eb6df00bc54f88bcb01075643e01cf)

