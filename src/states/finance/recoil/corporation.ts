import { atom } from 'recoil';

// 애러 state를 가지고 있는 atom
interface ICorporation {
  ticker: string;
  corp_name: string;
}

export const atomCorporationState = atom<ICorporation>({
  key: 'CorporationStatus',
  default: {
    ticker: '005930',
    corp_name: '삼성전자',
  },
});
