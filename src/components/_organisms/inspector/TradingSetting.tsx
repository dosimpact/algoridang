import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";
import React from "react";
import { IInspectorSettings } from ".";

interface ITradingSetting extends IInspectorSettings {}

const TradingSetting: React.FC<ITradingSetting> = ({ headerTitle }) => {
  return (
    <div>
      <InspectorHeaderDetail headerTitle={headerTitle || "TradingSetting"} />
      <div></div>
      TradingSetting
    </div>
  );
};

export default TradingSetting;
