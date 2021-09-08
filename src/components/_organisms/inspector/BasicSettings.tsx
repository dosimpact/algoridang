import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";
import React from "react";
import { IInspectorSettings } from "./index";

interface IBasicSettings extends IInspectorSettings {}

const BasicSettings: React.FC<IBasicSettings> = ({ headerTitle }) => {
  return (
    <div>
      <InspectorHeaderDetail headerTitle={headerTitle || "BasicSettings"} />
      <div></div>
      BasicSettings
    </div>
  );
};

export default BasicSettings;
