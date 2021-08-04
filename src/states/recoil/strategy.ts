import { atom, selector } from "recoil";
import { CreateMyStrategyInput } from "states/interface/strategy/dtos";
import { AddUniversalInput } from "states/interface/trading/dtos";
import { IformStateBasicSetting } from "pages/makers/strategy-create/section/screate-basic";
import { Corporation } from "states/interface/finance/entities";

interface IStrategyState {
  createMyStrategyInput: CreateMyStrategyInput;
  addUniversalInput?: AddUniversalInput[];
  formStateBasicSetting?: IformStateBasicSetting; //  1
  formStateTickerSelected?: Corporation[]; // 2
  formStateTradingSetting?: Object; // 3
}

export const atomStrategyState = atom<IStrategyState>({
  key: "StrategyState",
  default: {
    createMyStrategyInput: {
      investProfitInfo: {
        invest_start_date: new Date().toISOString(),
      },
      strategy_explanation: "",
      strategy_name: "",
      image_url:
        process.env.REACT_APP_DEFAULT_IMG ||
        "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272499339d_thumb03.jpeg",
    },
    addUniversalInput: [],
    formStateBasicSetting: {
      invest_principal: 0,
      invest_start_date: "",
      open_yes_no: "public",
      securities_corp_fee: 0,
      strategy_explanation: "",
      strategy_name: "",
      invest_end_date: "",
    },
    // formStateTickerSelected: {},
    formStateTradingSetting: {},
  },
});

export const parseCreateMyStrategy = selector({
  key: "parseCreateMyStrategy",
  get: ({ get }) => {
    const strategyState = get(atomStrategyState);

    const newCreateMyStrategyInput =
      strategyState.createMyStrategyInput as CreateMyStrategyInput;
    const newAddUniversalInput = strategyState.addUniversalInput;

    const addUniversalInput = strategyState.addUniversalInput;
    const createMyStrategyInput = strategyState.createMyStrategyInput;

    if (strategyState.formStateBasicSetting) {
      const {
        invest_principal,
        invest_start_date,
        open_yes_no,
        securities_corp_fee,
        strategy_explanation,
        strategy_name,
        invest_end_date,
        tags,
      } = strategyState.formStateBasicSetting;
    }

    if (
      strategyState.formStateTickerSelected &&
      strategyState.formStateTickerSelected.length >= 1
    ) {
      const { ticker } = strategyState.formStateTickerSelected[0];
    }

    return {
      addUniversalInput,
      createMyStrategyInput,
    };
  },
});
