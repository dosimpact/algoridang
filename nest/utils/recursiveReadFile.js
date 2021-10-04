// example - 디렉터리 순회하기 + 파일읽기

// readdir 의 {withFileTypes: true} 옵션을 주어 fs.Dirent[]객체를 반환 하도록 함
// 객체 안에는 isDirectory 함수가 있음

const fs = require("fs");
const util = require("util");
const path = require("path");

const readdir = util.promisify(fs.readdir);

const main = async () => {
  const recursiveReadFile = async (fileName) => {
    // 파일들 불러오기
    let files = await readdir(path.join(__dirname, fileName), {
      withFileTypes: true,
    });

    // 파일들 순회
    files.forEach(async (file) => {
      // console.log(`file.isDirectory ${file.isDirectory()} file.name ${file.name}`);
      console.log(
        `[${file.isDirectory() ? "Dir" : "File"}] ${fileName}/${file.name}`
      );
      // 디렉터리인 경우
      if (file.isDirectory()) {
        // console.log("directory 추가 검색");
        await recursiveReadFile(fileName + "/" + file.name);
      }
    });
  };
  await recursiveReadFile("a");
};
main();
