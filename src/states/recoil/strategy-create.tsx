import { atom, selector } from "recoil";
import {
  BackTestingSetting,
  BasicSettings,
  TradingPropertySetting,
  TradingSetting,
  UniversalSetting,
} from "components/_organisms/inspector";
interface IInspector {
  isShow: boolean;
  inspectorType:
    | "default"
    | "basicSetting"
    | "universalSetting"
    | "tradingSetting" // 매매 전략 추가 삭제
    | "tradingPropertySetting" // 매매 전략 상세 설정
    | "backTestingSetting";
  inspectorState: {
    basicSetting: {};
    universalSetting: {
      tab: number;
      isFilterModalOpen: boolean;
    };
    tradingSetting: {
      tab: number;
    };
    tradingPropertySetting: {};
    backTestingSetting: {
      tab: number;
    };
  };
}

// 전략 생성 페이지의 인스펙터 상태 관리
export const atomInspector = atom<IInspector>({
  key: "Inspector",
  default: {
    isShow: true,
    inspectorType: "basicSetting",
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

// JSX Selector

export const selectorInspector = selector({
  key: "selectorInspector",
  get: ({ get }) => {
    const inspectorState = get(atomInspector);
    if (inspectorState.inspectorType === "default") {
      return BasicSettings;
    } else if (inspectorState.inspectorType === "basicSetting") {
      return BasicSettings;
    } else if (inspectorState.inspectorType === "universalSetting") {
      return UniversalSetting;
    } else if (inspectorState.inspectorType === "tradingSetting") {
      return TradingSetting;
    } else if (inspectorState.inspectorType === "tradingPropertySetting") {
      return TradingPropertySetting;
    } else if (inspectorState.inspectorType === "backTestingSetting") {
      return BackTestingSetting;
    } else {
      return BasicSettings;
    }
  },
});
