import InspectorHeaderDetail from 'components/_molecules/inspector/InspectorHeaderDetail';
import React from 'react';
import { IInspectorSettings } from '.';

interface IBackTestingSetting extends IInspectorSettings {}

const BackTestingSetting: React.FC<IBackTestingSetting> = ({ headerTitle }) => {
  return (
    <div>
      <InspectorHeaderDetail
        headerTitle={headerTitle || 'BackTestingSetting'}
      />
      <div></div>
      BackTestingSetting
    </div>
  );
};

export default BackTestingSetting;
