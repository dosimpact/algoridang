import { atom, selector } from 'recoil';
import { CreateMyStrategyInput } from 'states/strategy/interface/dtos';
import { AddUniversalInput } from 'states/trading/interface/dtos';
import { atomUniversalSettingState } from './dashBoard';

/**
 *  2.1 전략 기본 설정 상태관리 - atom
 * 전략 기본 설정 입력 form 저장 atom
   @returns {IAtomBasicSetting}
 */

// IAtom - 기본설정 FormState
interface IAtomBasicSettingForm {
  strategy_name: string; // 전략 이름
  strategy_explanation: string; // 전략 설명
  tags: string[];
  invest_principal: string; // 투자 원금
  invest_start_date: string; // 백테스트 시작일
  securities_corp_fee: string; // 수수료
  open_yes_no: boolean; // 공개범위
}

export const atomBasicSettingForm = atom<IAtomBasicSettingForm>({
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

//  make body createMyStrategy
export const makeCreateMyStrategy = selector<CreateMyStrategyInput>({
  key: 'useCreateMyStrategy',
  get: ({ get }) => {
    const aBasic = get(atomBasicSettingForm);
    return {
      strategy_name: aBasic.strategy_name,
      strategy_explanation: aBasic.strategy_explanation,
      tags: aBasic.tags,
      // invest_type:aBasic.
      operation_yes_no: true,
      open_yes_no: aBasic.open_yes_no,
      investProfitInfo: {
        invest_principal: aBasic.invest_principal,
        securities_corp_fee: aBasic.securities_corp_fee,
        invest_start_date: aBasic.invest_start_date,
      },
    };
  },
});

type ImakeAddUniversals = Pick<
  AddUniversalInput,
  'setting_json' | 'ticker' | 'trading_strategy_name'
>;
// make body  addUniversal
export const makeAddUniversals = selector<ImakeAddUniversals[]>({
  key: 'makeAddUniversal',
  get: ({ get }) => {
    const result: ImakeAddUniversals[] = [];
    const aBasic = get(atomUniversalSettingState);
    aBasic.selected.map((e) => {
      const { selectedCorporations, selectedTechnical } = e;
      if (selectedTechnical?.trading_strategy_name)
        result.push({
          ticker: selectedCorporations.ticker,
          trading_strategy_name: selectedTechnical.trading_strategy_name,
          setting_json: selectedTechnical.setting_json,
        });
    });
    return result;
  },
});
