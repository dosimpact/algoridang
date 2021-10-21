import { selector } from 'recoil';
import { CreateMyStrategyInput } from '../interface/dtos';
import { AddUniversalInput } from 'states/trading/interface/dtos';
import { atomBasicSetting, atomUniversalSettingState } from './strategy-create';

//  make body createMyStrategy
export const makeCreateMyStrategy = selector<CreateMyStrategyInput>({
  key: 'useCreateMyStrategy',
  get: ({ get }) => {
    const aBasic = get(atomBasicSetting);
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
