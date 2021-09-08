import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";
import React from "react";
import { IInspectorSettings } from "./index";

interface IBaseSettings extends IInspectorSettings {}

const BaseSettings: React.FC<IBaseSettings> = ({ headerTitle }) => {
  return (
    <div>
      <InspectorHeaderDetail headerTitle={headerTitle || "BaseSettings"} />
      <div></div>
      BaseSettings
    </div>
  );
};

export default BaseSettings;
