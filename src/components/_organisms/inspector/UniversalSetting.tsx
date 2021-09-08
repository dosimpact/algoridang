import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";
import React from "react";
import { IInspectorSettings } from ".";

interface IUniversalSetting extends IInspectorSettings {}

const UniversalSetting: React.FC<IUniversalSetting> = ({ headerTitle }) => {
  return (
    <div>
      <InspectorHeaderDetail headerTitle={headerTitle || "UniversalSetting"} />
      <div></div>
      universalSetting
    </div>
  );
};

export default UniversalSetting;
