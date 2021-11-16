import produce from 'immer';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { RequestQuantSelectInput } from 'states/backtest/interface/dtos';
import {
  RequestFSBody,
  RequestFSData,
  RequestFSKeys,
} from 'states/finance/interface/entities';
// atom 정의 QS 의 헤더부 strategy,numberOfData
// selector 정의 - strategy,numberOfData 각 getter/setter

export type IatomQSHeader = Pick<
  RequestQuantSelectInput,
  'strategy' | 'numberOfData'
>;
export const atomQSHeader = atom<IatomQSHeader>({
  key: 'atomQSHeader',
  default: {
    strategy: 0,
    numberOfData: 5,
  },
});

// ⚠ 이 코드는 예제 코드 입니다.
// selector 언제 사용?
// - atom의 파생된 데이터를 getter/setter 할 때
// eg) atom은 화씨 단위, selector의 인터페이스는 섭씨

// atomQSHeader의 strategy를 getter/setter 해주는 순수함수,
//      selector<T>(options: ReadWriteSelectorOptions<T>):
//      *T는 get의 리턴이자,set의 입력  타입이다.
//      -- input,output 타입이 number이다.
export const selectorQSHeaderStretegy = selector<number>({
  key: 'selectorQSHeaderStretegy',
  get: ({ get }) => {
    return get(atomQSHeader).strategy;
  },
  set: ({ set, get }, newValue) => {
    const prev = get(atomQSHeader);
    set(atomQSHeader, { ...prev, strategy: newValue as number });
  },
});

type selectorQSHeaderDataIO = Pick<
  RequestQuantSelectInput,
  'strategy' | 'numberOfData'
>;
type selectorQSHeaderDataParam = Partial<
  Pick<RequestQuantSelectInput, 'strategy' | 'numberOfData'>
>;

// selectorFamily 언제 사용?
// - atom의 파생된 데이터를 getter/setter 할 때 + atom에서 선택해야할 파라미터가 필요할때
// eg) todoList의 특정 index를 대상으로, newValue로 PATCH하거나 GET할때

// ⚠ 이 코드는 예제 코드 입니다.
// atomQSHeader의 일부 데이터를 PATCH해주는 순수함수,
//      selectorFamily<T, P extends SerializableParam>
//      * T는 get의 리턴값, set의 입력값
//      * P는 파라미터 타입, get,set의 클로저변수 타입이다.
export const selectorQSHeaderData = selectorFamily<
  selectorQSHeaderDataIO,
  selectorQSHeaderDataParam
>({
  key: 'selectorQSHeaderData',
  // get:({numberOfData,strategy})=>({get})=>{...}
  // set:({numberOfData,strategy})=>({get,set,reset})=>{...}
  get:
    ({ numberOfData, strategy }) =>
    ({ get }) => {
      return get(atomQSHeader);
    },
  set:
    ({ numberOfData, strategy }) =>
    ({ get, set, reset }, newValue) => {
      if (!(newValue instanceof DefaultValue)) {
        const prev = get(atomQSHeader);
        set(
          atomQSHeader,
          produce(prev, (draft) => {
            if (numberOfData) draft.numberOfData = newValue.numberOfData;
            if (strategy) draft.strategy = newValue.strategy;
            return draft;
          }),
        );
      }
    },
});

// atom 정의 - fs 에 들어가는 데이터별로
// selector 정의 - strategy,numberOfData 각 getter/setter

export type IatomQSBody = Omit<
  RequestQuantSelectInput,
  'strategy' | 'numberOfData'
>;
export const defaultQSBodyData: RequestFSData = {
  market_cap: 0,
  revenue: 0,
  operating_income: 0,
  EPS: 0,
  PER: 0,
  EV_per_EBITDA: 0,
  ROE: 0,
  dividend_yield: 0,
  BETA: 0,
  revenue_Q: 0,
  operating_income_Q: 0,
  net_income_Q: 0,
  controlling_interest_Q: 0,
  non_controlling_interest_Q: 0,
  total_assets_Q: 0,
  total_stock_holders_Q: 0,
  controlling_interest_share_Q: 0,
  non_controlling_interest_share_Q: 0,
  capital_Q: 0,
  debt_ratio_Q: 0,
  retention_rate_Q: 0,
  operating_margin_Q: 0,
  controlling_interest_rate_Q: 0,
  ROA_Q: 0,
  ROE_Q: 0,
  EPS_Q: 0,
  BPS_Q: 0,
  DPS_Q: 0,
  PBR_Q: 0,
  outstanding_shares_Q: 0,
  dividend_yield__Q: 0,
};

export const atomQSBody = atom<IatomQSBody>({
  key: 'atomQSBody',
  default: {
    data: { ...defaultQSBodyData },
  },
});
// - selector 정의 : 재무제표 key를 선택해서, 필터 on/off
// - selector 정의 : 재무제표 key를 선택해서, ( operator,valuse 수정  )
// value 가 number 이면 off
// value 가 object 이면 on
export type selectorQSBodyOnOff_IO = RequestFSBody | undefined;
export type selectorQSBodyOnOff_Params = RequestFSKeys;

export const selectorQSBodyOnOff = selectorFamily<
  selectorQSBodyOnOff_IO,
  selectorQSBodyOnOff_Params
>({
  key: 'selectorQSBodyOnOff',
  get:
    (targetKey) =>
    ({ get }) => {
      const QSBody = get(atomQSBody);
      return QSBody.data[targetKey];
    },
  set:
    (targetKey) =>
    ({ get, set }, newValue) => {
      if (!(newValue instanceof DefaultValue) && newValue) {
        const QSBody = get(atomQSBody);
        set(
          atomQSBody,
          produce(QSBody, (draft) => {
            draft.data[targetKey] = newValue;
            return draft;
          }),
        );
      }
    },
});

// export const selectorQSBodyValue = selector<selectorQSBodyOnOff_IO>({
//   key: 'selectorQSBodyValue',
//   get: ({ get }) => {},
//   set: ({ get, set }, newValue) => {},
// });

// TODO: 커스텀 훅 함수로 변환
//  React Hook "useRecoilState" is called in function "usehandleSetQSBodyValue" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter  react-hooks/rules-of-hooks
// export const usehandleSetQSBodyValue = (
//   data: selectorQSBodyOnOff_IO,
//   key: selectorQSBodyOnOff_Params,
// ) => {
//   const [QSBody, setQSBody] = useRecoilState(atomQSBody);
//   setQSBody(
//     produce(QSBody, (df) => {
//       df.data[key] = data;
//       return df;
//     }),
//   );
// };

// selector 합치기 selectorQSApiBody = atomQSHeader + atomQSBody
export const selectorQSApiBody = selector<RequestQuantSelectInput>({
  key: 'selectorQSApiBody',
  get: ({ get }) => {
    const head = get(atomQSHeader);
    const body = get(atomQSBody);
    return { ...head, ...body };
  },
});

// select b."ticker" , b."name",b."sum"
// from(
//    select a."ticker"as "ticker" , a."name"  as "name", a."Rank_PBR_Q" + a."Rank_GPA" as "sum"
//    from (
//       select  c."ticker"as "ticker" , c."name"  as "name", rank () OVER(order by c."PBR_Q" desc) as "Rank_PBR_Q", rank () over(order by c."GPA" asc) as "Rank_GPA",c."GPA"
//       from (
//          select cor.ticker as "ticker", cor.corp_name as "name", fin."PBR_Q" as "PBR_Q", fin."operating_income_Q"*10000/fin."total_assets_Q" as "GPA" , fin."operating_income_Q",fin."total_assets_Q"
//          from financial_statement fin, corporation cor
//          where fin."ticker"=cor."ticker"
//          and fin."PBR_Q" > 0
//          and fin."operating_income_Q" >= 0
//          and fin."total_assets_Q" > 0
//          and fin."market_cap" >= '5000'
//       ) c
//       --order by c."GPA" desc

//       ) a
//    ) b
// order by b."sum" desc
// limit 50
