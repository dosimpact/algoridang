import { escapeRegExp } from 'lodash';

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

const ch2pattern = (ch: string) => {
  const offset = 44032; /* '가'의 코드 */
  // 한국어 음절
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    // 종성이 있으면 문자 그대로를 찾는다.
    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 한글 자음
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl = {
      ㄱ: '가'.charCodeAt(0),
      ㄲ: '까'.charCodeAt(0),
      ㄴ: '나'.charCodeAt(0),
      ㄷ: '다'.charCodeAt(0),
      ㄸ: '따'.charCodeAt(0),
      ㄹ: '라'.charCodeAt(0),
      ㅁ: '마'.charCodeAt(0),
      ㅂ: '바'.charCodeAt(0),
      ㅃ: '빠'.charCodeAt(0),
      ㅅ: '사'.charCodeAt(0),
    } as Record<string, number>;
    const begin =
      con2syl[ch] ||
      (ch.charCodeAt(0) - 12613) /* 'ㅅ'의 코드 */ * 588 + con2syl['ㅅ'];
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 그 외엔 그대로 내보냄
  // escapeRegExp는 lodash에서 가져옴
  return escapeRegExp(ch);
};

// 한국어 초성 정규식 객체
export const createFuzzyMatcher = (input: string) => {
  if (input === '') return new RegExp(/^$/);
  const pattern = input
    .split('')
    .map(ch2pattern)
    .map((pattern) => '(' + pattern + ')')
    .join('.*?');
  return new RegExp(pattern);
};
// createFuzzyMatcher('ㅋㅁㅅ').test('크리스마스'); // true
// createFuzzyMatcher('ㅋㅁㅅ').test('크리스'); // false
