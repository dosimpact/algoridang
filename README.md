# git setting

```
git remote add react https://gitlab.com/algoridang/react_client.git
git remote add nest https://gitlab.com/algoridang/nestjs_server.git
git remote add python https://gitlab.com/algoridang/data_server.git
git remote add origin https://github.com/DosImpact/algoridang.git

git subtree add --prefix=react react master
git subtree add --prefix=nest nest master
git subtree add --prefix=python python master
```

# git subtree add --prefix=[로컬 디렉토리명] [저장소 명칭] [저장소 branch]

git subtree add --prefix=subtree03 subtree master

# subtree로 들어가는 브랜치 딸 수 있음

git chekcout --track subtree03/master -b subtree03

2. subtree push/pull

# subtree레포를 최신 업데이트 할래, subtree의 주소의 master 브랜치로, 아참 로컬폴터는 prefix 옵션으로~

git subtree pull --prefix=subtree03 subtree03 master

# 슈퍼레포에서 -> subtree레포로 반영할래

git subtree push --prefix=subtree03 subtree03 master
