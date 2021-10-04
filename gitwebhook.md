# git setting

```
git remote add react https://gitlab.com/algoridang/react_client.git
git remote add nest https://gitlab.com/algoridang/nestjs_server.git
git remote add python https://gitlab.com/algoridang/data_server.git
git remote add origin https://github.com/DosImpact/algoridang.git

git subtree add --prefix=react react master
git subtree add --prefix=nest nest master
git subtree add --prefix=python python master

git subtree pull --prefix=react react master
git subtree pull --prefix=nest nest master
git subtree pull --prefix=python python master
```
