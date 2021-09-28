import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import {
  atomUniversalSettingState,
  selectedUniversalMiniBacktesting,
} from 'states/strategy/recoil/strategy-create';
import styled from 'styled-components';

interface IMiniBacktestResultButton {
  title?: string;
  selectedIndex: number; // atomUniversalSettingState 배열 인덱스
}

// 대시보드 (col-2) : 개별 종목 매매전략 설정 및 매매전략상세설정 button
const MiniBacktestResultButton: React.FC<IMiniBacktestResultButton> = ({
  children,
  title,
  selectedIndex,
}) => {
  const result = useRecoilValue(
    selectedUniversalMiniBacktesting({
      universalIdx: selectedIndex,
    }),
  );
  const universals = useRecoilValue(atomUniversalSettingState);

  const currentCorporation = useMemo(() => {
    return universals.selected[selectedIndex].selectedCorporations;
  }, [selectedIndex, universals]);

  return (
    <SMiniBacktestResultButton>
      <div>MINI-BT : </div>
      <div>{currentCorporation && currentCorporation.corp_name}</div>
      <div>CAGR : {result?.CAGR}</div>
      <div>MDD : {result?.MDD}</div>
    </SMiniBacktestResultButton>
  );
};

export default MiniBacktestResultButton;

const SMiniBacktestResultButton = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem;
`;
