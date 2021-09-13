import InspectorHeaderDetail from 'components/_molecules/inspector/InspectorHeaderDetail';
import React from 'react';
import { useRecoilState } from 'recoil';
import { atomInspector } from 'states/recoil/strategy-create';
import { IInspectorSettings } from '.';

interface ITradingSetting extends IInspectorSettings {}

const TradingSetting: React.FC<ITradingSetting> = ({ headerTitle }) => {
  const [inspector, setInsepctor] = useRecoilState(atomInspector);

  return (
    <div>
      <InspectorHeaderDetail headerTitle={headerTitle || 'TradingSetting'} />
      <div></div>
      {inspector.inspectorState.tradingSetting.tab}
      TradingSetting
    </div>
  );
};

export default TradingSetting;
