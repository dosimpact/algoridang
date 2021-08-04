# 알고리당 서비스 비즈니스 서버

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