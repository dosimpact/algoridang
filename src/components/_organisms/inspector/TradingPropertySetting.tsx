import InspectorHeaderDetail from 'components/_molecules/inspector/InspectorHeaderDetail';
import React from 'react';
import { IInspectorSettings } from '.';

interface ITradingPropertySetting extends IInspectorSettings {}

const TradingPropertySetting: React.FC<ITradingPropertySetting> = ({
  headerTitle,
}) => {
  return (
    <div>
      <InspectorHeaderDetail
        headerTitle={headerTitle || 'TradingPropertySetting'}
      />
      <div></div>
      TradingPropertySetting
    </div>
  );
};

export default TradingPropertySetting;
