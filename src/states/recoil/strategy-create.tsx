import { atom, selector } from "recoil";
import {
  BackTestingSetting,
  BasicSettings,
  IInspectorSettings,
  TradingPropertySetting,
  TradingSetting,
  UniversalSetting,
} from "components/_organisms/inspector";

// 인스팩터 상태관리
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

// 인스펙터 JSX Selector
export const selectorInspector = selector<React.FC<IInspectorSettings>>({
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

// 전략 기본 설정 상태관리

interface IBasicSetting {
  strategy_name: string; // 전략 이름
  strategy_explanation: string; // 전략 설명
  tags: string[];

  invest_principal: string; // 투자 원금
  invest_start_date: string; // 백테스트 시작일
  securities_corp_fee: string; // 수수료

  operation_yes_no: boolean; // 공개범위
}
export const atomBasicSetting = atom<IBasicSetting>({
  key: "BasicSetting",
  default: {
    strategy_name: "",
    strategy_explanation: "",
    tags: [""],
    operation_yes_no: true,
    invest_principal: "",
    invest_start_date: "",
    securities_corp_fee: "",
  },
});
interface IUniversalSetting {}
interface ITradingSetting {}
interface ITradingPropertySetting {}
interface IBackTestingSetting {}
