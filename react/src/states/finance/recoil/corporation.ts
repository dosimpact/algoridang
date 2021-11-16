import { atom } from 'recoil';

interface ICorporation {
  ticker: string;
  corp_name: string;
}

// 현재 검색하여 고른 종목 (글로벌)
export const atomCorporationState = atom<ICorporation>({
  key: 'CorporationStatus',
  default: {
    ticker: '005930',
    corp_name: '삼성전자',
  },
});
