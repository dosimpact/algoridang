import { atom } from "recoil";
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
  },
});
