import { atom, selector } from 'recoil';
import { Corporation } from 'states/finance/interface/entities';
import { CreateMyStrategyInput } from 'states/strategy/interface/dtos';
import { AddUniversalInput } from 'states/trading/interface/dtos';

interface IStrategyState {
  createMyStrategyInput: CreateMyStrategyInput;
  addUniversalInput?: Partial<AddUniversalInput>[];
  // formStateBasicSetting?: IformStateBasicSetting; //  1
  formStateTickerSelected?: Corporation[]; // 2
  formStateTradingSetting?: Object; // 3
}
// lagacy
export const atomStrategyState = atom<IStrategyState>({
  key: 'StrategyState',
  default: {
    createMyStrategyInput: {
      investProfitInfo: {
        invest_start_date: new Date().toISOString(),
      },
      strategy_explanation: '',
      strategy_name: '',
      image_url:
        process.env.REACT_APP_DEFAULT_IMG ||
        'https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272499339d_thumb03.jpeg',
    },
    addUniversalInput: [],
    // formStateBasicSetting: {
    //   invest_principal: 0,
    //   invest_start_date: "",
    //   open_yes_no: "public",
    //   securities_corp_fee: 0,
    //   strategy_explanation: "",
    //   strategy_name: "",
    //   invest_end_date: "",
    // },
    formStateTickerSelected: [],
    formStateTradingSetting: {},
  },
});
// lagacy
export const parseCreateMyStrategy = selector({
  key: 'parseCreateMyStrategy',
  get: ({ get }) => {
    const strategyState = get(atomStrategyState);
    const crops = strategyState.formStateTickerSelected;

    const addUniversalInput = [] as Partial<AddUniversalInput>[];
    // addUniversalInput 파싱
    addUniversalInput.push({
      ticker: crops && crops[0] && crops[0]?.ticker,
      setting_json: strategyState.formStateTradingSetting,
    });
    return {
      addUniversalInput: addUniversalInput,
      createMyStrategyInput: strategyState.createMyStrategyInput,
    };
  },
});
