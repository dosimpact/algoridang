export const throttling = (cb: Function, ms: number) => {
  let timer: number | null = null;

  return (e: any) => {
    if (!timer) {
      timer = window.setTimeout(() => {
        timer = null;
        if (cb) {
          cb(e);
        }
      }, ms);
    }
  };
};
// cb는 input element에 거는 핸들러 함수라고 가정하자.
// onChange = {(e)=>{}} 에서 cb는 (e)=>{} 가 된다.
// 이를 디바운싱 미들웨어 같은? 함수로 감싸보자.
export const debouncing = (cb: Function, ms: number) => {
  // 크로저 맥락
  let timer: number | null = null;

  // e는 이벤트 객체이다.
  return (e: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      timer = null;
      // 원래 부르려고 했던 함수를 불러주자
      if (cb) {
        cb(e);
      }
    }, ms);
  };
};

export const cloneObject = (obj: any) => {
  var clone = {} as any;
  for (var key in obj) {
    if (typeof obj[key] === 'object' && obj[key] != null) {
      clone[key] = cloneObject(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
};
