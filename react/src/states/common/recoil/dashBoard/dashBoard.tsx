import MonoTickerSettingButton from 'components/dashboard/_organisms/MonoTickerSettingButton';
import produce from 'immer';
import { atom, selector, selectorFamily } from 'recoil';
import { Corporation } from 'states/finance/interface/entities';
import { BaseTradingStrategy } from 'states/trading/interface/entities';

/**
 * 3.1 종목 관리 상태관리 - atom
 */

// IAtom 개별종목설정 State
export interface IAtomInterestedUnivItem {
  // A: 선택된 종목들
  selectedCorporations: Corporation;
  // B: 선택된 종목에 대한 기술적 지표
  selectedTechnical?: BaseTradingStrategy;
}
// IAtom 개별종목설정리스트 State
interface IAtomInterestedUnivList {
  selected: IAtomInterestedUnivItem[];
}
export const atomUniversalSettingState = atom<IAtomInterestedUnivList>({
  key: 'UniversalSettingState',
  default: {
    selected: [],
  },
});
/**
 * 4.1  만들어진 전략 코드 >  백테스팅 전략 코드
 */

export const atomCurrentStrategyCode = atom<string>({
  key: 'atomCurrentStrategyCode',
  default: '',
});

// selectors

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
  IAtomInterestedUnivItem | null,
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
          draft.selected[universalIdx] = newValue as IAtomInterestedUnivItem;
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

export const selectorCurrentCorpLen = selector<number>({
  key: 'selectorCurrentCorpLen',
  get: ({ get }) => {
    const res = get(atomUniversalSettingState);
    return res.selected.length;
  },
});
