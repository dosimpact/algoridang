// example - 디렉터리 순회하기 + 파일읽어서 + formData로 전송 -> S3 업로드 하기

// readdir 의 {withFileTypes: true} 옵션을 주어 fs.Dirent[]객체를 반환 하도록 함
// 객체 안에는 isDirectory 함수가 있음

const fs = require('fs');
const util = require('util');
const path = require('path');
const FormData = require('form-data');
const Axios = require('axios').default;
const readdir = util.promisify(fs.readdir);

const main = async () => {
  const fileUpload = async (fileName) => {
    try {
      const formData = new FormData();
      formData.append(
        'file',
        fs.createReadStream(path.join(__dirname, fileName)),
      );
      const url = 'http://127.0.0.1:4000/v1/api/upload/ticker';
      const res = await Axios({
        method: 'post',
        url,
        data: formData,
        headers: {
          ...formData.getHeaders(),
          'x-jwt':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InlwZDAzMDA4QGdtYWlsLmNvbSIsImlhdCI6MTYyOTc3NTQ0N30.BHqv4vuTGo8ZHjDJxHreGmJ_X2HHrjmLJB3o5Zk_aIQ',
        },
      });
      // console.log("res", res.status, res.data);
      if (res.status === 201) {
        console.log('✔ ok', fileName);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  // await fileUpload("logo/000020.jpg");

  const recursiveReadFile = async (fileName) => {
    // 파일들 불러오기
    let files = await readdir(path.join(__dirname, fileName), {
      withFileTypes: true,
    });

    // 파일들 순회
    files.forEach(async (file) => {
      // console.log(`file.isDirectory ${file.isDirectory()} file.name ${file.name}`);
      console.log(
        `[${file.isDirectory() ? 'Dir' : 'File'}] ${fileName}/${file.name}`,
      );
      await fileUpload(`${fileName}/${file.name}`);
      // 디렉터리인 경우
      if (file.isDirectory()) {
        // console.log("directory 추가 검색");
        await recursiveReadFile(fileName + '/' + file.name);
      }
    });
  };
  await recursiveReadFile('logo');
};
main();
