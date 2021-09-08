// index inspector JSX.Element
import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";

export { default as BackTestingSetting } from "./BackTestingSetting";
export { default as BasicSettings } from "./BaseSettings";
export { default as TradingPropertySetting } from "./TradingPropertySetting";
export { default as TradingSetting } from "./TradingSetting";
export { default as UniversalSetting } from "./UniversalSetting";

export interface IInspectorSettings {
  headerTitle?: string;
}

const InspectorSettings: React.FC<IInspectorSettings> = ({ headerTitle }) => {
  return (
    <div>
      <InspectorHeaderDetail headerTitle={headerTitle || "InspectorSettings"} />
      <div></div>
      InspectorSettings
    </div>
  );
};

export default InspectorSettings;
