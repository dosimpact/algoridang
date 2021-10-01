import { atom, selector, selectorFamily } from 'recoil';
import {
  BackTestingSetting,
  BasicSettings,
  IInspectorSettings,
  TradingPropertySetting,
  TradingSetting,
  UniversalSetting,
} from 'components/inspector/_organisms';
import MonoTickerSettingButton from 'components/dashboard/_organisms/MonoTickerSettingButton';
import SelectedTickerButton from 'components/dashboard/_organisms/SelectedTickerButton';
import produce from 'immer';
import { tradingApi } from 'states/api';
import MiniBacktestResultButton from 'components/dashboard/_organisms/MiniBacktestResultButton';
import { Suspense } from 'react';
import ErrorBoundary from 'components/common/_atoms/ErrorBoundary';
import { Corporation } from 'states/finance/interface/entities';
import { BaseTradingStrategy } from 'states/trading/interface/entities';
/**
 * 전략 생성에 대한 클라이언트 상태관리 입니다.
 *
 * 주요 상태 관리 대상  - atom,selector 이용
 * 1. 전략 생성에 필요한 대시보드 + 인스펙터의 View 상태 관리
 * 2. 사용자입력 (Form 및 HTMLInputElement) 에 대한 데이터 바인딩
 * 3. API 호출시 Body조립을 위한 JSX 리턴
 */

// 1.1 인스팩터 상태관리 interface & type
export type IInspectorTypes =
  | 'default'
  | 'basicSetting'
  | 'universalSetting'
  | 'tradingSetting' // 매매 전략 추가 삭제
  | 'tradingPropertySetting' // 매매 전략 상세 설정
  | 'backTestingSetting';

// IAtom - 인스팩터 state
interface IAtomInspector {
  isShow: boolean;
  inspectorType: IInspectorTypes;
  inspectorState: {
    basicSetting: {};
    universalSetting: {
      tab: number;
      isFilterModalOpen: boolean;
    };
    tradingSetting: {
      tab: number;
      // selectedIndex: number; // 변경할 atomUniversalSettingState.selected의 idx
    };
    tradingPropertySetting: {
      // selectedIndex: number; // 변경할 atomUniversalSettingState.selected의 idx
    };
    backTestingSetting: {
      tab: number;
    };
  };
}
// IAtom - 기본설정 FormState
interface IAtomBasicSetting {
  strategy_name: string; // 전략 이름
  strategy_explanation: string; // 전략 설명
  tags: string[];

  invest_principal: string; // 투자 원금
  invest_start_date: string; // 백테스트 시작일
  securities_corp_fee: string; // 수수료

  open_yes_no: boolean; // 공개범위
}
// IAtom 개별종목설정 State
export interface IAtomUniversalSettingStateItem {
  // A: 선택된 종목들
  selectedCorporations: Corporation;
  // B: 선택된 종목에 대한 기술적 지표
  selectedTechnical?: BaseTradingStrategy;
  // A+B 의 Output ( BackTesting )
  miniBacktestingResult?: {
    CAGR: string;
    MDD: string;
  };
}
// IAtom 개별종목설정리스트 State
interface IAtomUniversalSettingState {
  selected: IAtomUniversalSettingStateItem[];
}

// ---------------------------------------------------

/**
* 1.1 인스팩터 상태관리 atom
  전략 생성 페이지의 인스펙터 상태 관리
*/

export const atomInspector = atom<IAtomInspector>({
  key: 'Inspector',
  default: {
    isShow: true,
    inspectorType: 'basicSetting',
    inspectorState: {
      basicSetting: {},
      universalSetting: {
        isFilterModalOpen: false,
        tab: 0,
      },
      tradingSetting: { tab: 0 },
      tradingPropertySetting: {},
      backTestingSetting: { tab: 0 },
    },
  },
});

/**
* 1.1 인스팩터 상태관리 Selector
  get: @returns 선택된 인스펙터 JSX 리턴
*/

export const selectorInspectorFC = selector<React.FC<IInspectorSettings>>({
  key: 'selectorInspectorFC',
  get: ({ get }) => {
    const inspectorState = get(atomInspector);
    if (inspectorState.inspectorType === 'default') {
      return BasicSettings;
    } else if (inspectorState.inspectorType === 'basicSetting') {
      return BasicSettings;
    } else if (inspectorState.inspectorType === 'universalSetting') {
      return UniversalSetting;
    } else if (inspectorState.inspectorType === 'tradingSetting') {
      return TradingSetting;
    } else if (inspectorState.inspectorType === 'tradingPropertySetting') {
      return TradingPropertySetting;
    } else if (inspectorState.inspectorType === 'backTestingSetting') {
      return BackTestingSetting;
    } else {
      return BasicSettings;
    }
  },
});

/**
 *  2.1 전략 기본 설정 상태관리 - atom
 * 전략 기본 설정 입력 form 저장 atom
   @returns {IAtomBasicSetting}
 */
export const atomBasicSetting = atom<IAtomBasicSetting>({
  key: 'BasicSetting',
  default: {
    strategy_name: '',
    strategy_explanation: '',
    tags: [''],
    open_yes_no: true,
    invest_principal: '',
    invest_start_date: '',
    securities_corp_fee: '',
  },
});

// ------------------------------------------------------------------------

/**
 * 3.1 종목 관리 상태관리 - atom
   @returns {IUniversalSettingState}
 */
export const atomUniversalSettingState = atom<IAtomUniversalSettingState>({
  key: 'UniversalSettingState',
  default: {
    selected: [],
  },
});
/**
 * 3.1.1 종목 관리 상태관리 - atom
 * 세팅할 인덱스 넘버
   @returns {IUniversalSettingState}
 */
export const atomUniversalSettingStateIdx = atom<number>({
  key: 'AtomUniversalSettingStateIdx',
  default: -1,
});

/**
 * (deprecated) 종목 관리 상태관리 - selector
  get : @returns 선택된 종목리스트 JSX[]
 */

export const selectedTickerElementListJSX = selector({
  key: 'selectedTickerElementListJSX',
  get: ({ get }) => {
    const at = get(atomUniversalSettingState);
    return at.selected.map((data, idx) => (
      <SelectedTickerButton
        key={idx}
        selectedIndex={idx} // atomUniversalSettingState 배열 인덱스
        title={`${data.selectedCorporations.corp_name}`}
      />
    ));
  },
});

/**
 * 3.3 종목 관리 상태관리 - selector
  get : @returns 개별 매매전략 셋팅 리스트 JSX[]
 */

export const selectedMonoTickerSettingButtonListJSX = selector({
  key: 'selectedMonoTickerSettingButtonListJSX',
  get: ({ get }) => {
    const at = get(atomUniversalSettingState);
    return at.selected.map((data, idx) => (
      <MonoTickerSettingButton
        key={idx}
        selectedIndex={idx} // atomUniversalSettingState 배열 인덱스
        title={`${data.selectedCorporations.corp_name}`}
      />
    ));
  },
});

/**
 * 3.4  종목 관리 상태관리 - selector
  get : @returns 현재 selectedIdx의 유니버스 리턴
  set : @returns 현재 selectedIdx의 유니버스 매매전략 설정
 */

export const selectedUniversalSetting_R = selectorFamily<
  IAtomUniversalSettingStateItem | null,
  { universalIdx: number }
>({
  key: 'selectedUniversalSetting_R',
  get:
    ({ universalIdx }) =>
    ({ get }) => {
      const at = get(atomUniversalSettingState);
      if (universalIdx < at.selected.length) return at.selected[universalIdx];
      else return null;
    },
  set:
    ({ universalIdx }: { universalIdx: number }) =>
    ({ set, get }, newValue) => {
      const at = get(atomUniversalSettingState);

      if (universalIdx < at.selected.length && newValue) {
        const nextState = produce(at, (draft) => {
          draft.selected[universalIdx] =
            newValue as IAtomUniversalSettingStateItem;
          return draft;
        });
        set(atomUniversalSettingState, nextState);
      } else {
        console.error(
          '[Error]선택된 종목이 없는상태로 매매전략 추가 universalIdx :',
          universalIdx,
        );
      }
    },
});

/**
 * 3.5  종목 관리 상태관리 - selectorFamily
  get : @returns 개별종목에 매매전략이 셋팅되어 있다면, 미니 백테스팅 결과 리턴
 */
// TODO : selector cache가 작동 안한다 ..!
export const selectedUniversalMiniBacktesting = selectorFamily({
  key: 'selectedUniversalMiniBacktesting',
  get:
    ({ universalIdx }: { universalIdx: number }) =>
    async ({ get }) => {
      const universal = get(atomUniversalSettingState);
      if (universalIdx < universal.selected.length) {
        const target = universal.selected[universalIdx];
        if (target.selectedTechnical?.trading_strategy_name) {
          // console.log('[mini backtesting mock] target ', target);
          const result = await tradingApi.POST.__mockRequestMiniBacktesting(
            '1234',
          );
          const resData = result.data as {
            ok: boolean;
            result: { CAGR: string; MDD: string }[];
          };
          // console.log('[mini backtesting mock] result', result.data);
          return resData.result[0];
        }
      }
      return null;
    },
});

/**
 * (deprecated) 종목 관리 상태관리 - selector
  get : @returns 매매전략이 셋팅된 종목 백테 결과 JSX[]
 */

export const selecteMiniBacktestResultListJSX = selector({
  key: 'selecteMiniBacktestResultListJSX',
  get: ({ get }) => {
    const at = get(atomUniversalSettingState);
    return at.selected.map((data, idx) => (
      <ErrorBoundary>
        <Suspense fallback={<div>backtesting loading...</div>}>
          <MiniBacktestResultButton
            key={`MiniBt-${idx}`}
            selectedIndex={idx} // atomUniversalSettingState 배열 인덱스
            title={`${data.selectedCorporations.corp_name}`}
          />
        </Suspense>
      </ErrorBoundary>
    ));
  },
});
