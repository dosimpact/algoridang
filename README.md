<div align="center">


# Welcome 알고리당 👏  

## NestJS 비즈니스 서버 

![IMG](https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272503198d_thumb04.png)

> 알고리당 서비스의 코드와 문서를 정리한 깃 레포 입니다.     

[![Badge](https://img.shields.io/badge/Nestjs-SERVER-F3BC2F?style=for-the-badge&logo=nestjs&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=red)](#)
[![Badge](https://img.shields.io/badge/PostgreSQL-DB-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=red)](#)

</div>


<!-- ABOUT THE PROJECT -->
## About The Project

주린이들을 위한 8.8% 이상의 투자수익을 가져갈 수 있는  
투자 전략 매매 플렛폼   

Feature1 핵심 기능:
* 나만의 투자 전략 생성 
* 종목 선별 및 매매 전략 선택
* 백테스팅 기능
* 투자 현황 및 리포트 기능   

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have have contributed to expanding this template!

A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Laravel](https://laravel.com)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```JS
   const API_KEY = 'ENTER YOUR API';
   ```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

김도영 Kim Do Young - ypd03008@gmail.com





----

<div align="center">


### 표 테스트

|H1|H2|H3|
|--|--|--|
|1|2|[:link:](URL)|  
|awefawef|[![NestBadge](https://img.shields.io/badge/BLOG%20POST%20LINK-hello-F3BC2F?style=flat-squre&logo=nestjs&logoColor=red)](https://naver.com)|6|

 
  [![algebraic data types](https://img.shields.io/badge/CODE%20LINK-white?style=flat-square&logo=typescript)](#)    
  
  [![algebraic data types](https://img.shields.io/badge/BLOG%20POST%20LINK-663399?style=flat-square&logo=gatsby&logoColor=white)](#)                    
</div>




[![NestBadge](https://img.shields.io/badge/BLOG%20POST%20LINK-hello-F3BC2F?style=for-the-badge&logo=nestjs&logoColor=red)](https://naver.com)

[![NestBadge](https://img.shields.io/badge/BLOG%20POST%20LINK-hello-F3BC2F?style=flat-squre&logo=nestjs&logoColor=red)](https://naver.com)


## Git 커밋규칙

```jsx
feat : 새로운 기능에 대한 커밋
fix : 버그 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋
chore : 그 외 자잘한 수정에 대한 커밋
ci : CI관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
refactor :  코드 리팩토링에 대한 커밋
test : 테스트 코드 수정에 대한 커밋
```

[[Git] 좋은 커밋 메세지 작성하기위한 규칙들](https://beomseok95.tistory.com/328)


### 빌드 및 베포
- TestServer  
```
git remote add heroku https://git.heroku.com/algoridang.git
git push heroku master
```
### Service Naming 규칙  

|이름|내용|비고|
|------|---|---|
|get<엔터티이름>[List]By[인자]  |:get   |CRUD
|create<엔터티이름>[List]       |:create|CRUD
|update<엔터티이름>             |:update|CRUD
|upsert<엔터티이름>             |:create+update|CRUD
|delete<엔터티이름>	            |:softDelete|CRUD
|hardDelete<엔터티이름>         |:hardDelete|CRUD
|recover<엔터티이름>            |:              |CRUD

|addHistory<엔터티이름>         |:1:N 추가할때+(Upsert기능도)|
|notice<엔터티이름>	            |:알림          |
|copy<엔터티이름>		        |:복사          |


### Installed Packaged

- package  
```ts
typeorm @nestjs/typeorm pg chance 
@nestjs/config cross-env joi jsonwebtoken bcrypt
class-transformer class-validator @nestjs/mapped-types
aws-sdk 
@nestjs/bull bull cache-manager cache-manager-redis-store
@nestjs/passport passport passport-google-oauth20
@nestjs/graphql graphql apollo-server-express@2.x.x @apollo/gateway
ts-morph
```
- @types  

```ts
-@types/bcrypt @types/jsonwebtoken 
-@types/multer 
-@types/passport-google-oauth20 
-@types/bull @types/cache-manager @types/cache-manager-redis-store
```
### 커밋 규칙 
|규칙|설명|
|---|---|
|feat     | 새로운 기능에 대한 커밋          |
|fix      | 버그 수정에 대한 커밋            |
|build    | 빌드 관련 파일 수정에 대한 커밋           |
|chore    | 그 외 자잘한 수정에 대한 커밋          |
|ci       | CI관련 설정 수정에 대한 커밋           |
|docs     | 문서 수정에 대한 커밋            |
|style    | 코드 스타일 혹은 포맷 등에 관한 커밋            |
|refactor | 코드 리팩토링에 대한 커밋           |
|test     | 테스트 코드 수정에 대한 커밋           |

### 이슈 Label 규칙 
|접두어|내용|
|---|---|
|type | todo💚|
|type | feature🎉|
|type | docs📄|
|type | QA🍶|
|type | bug🐞|
|type | discussion🔥|
|type | refactor🧬|
