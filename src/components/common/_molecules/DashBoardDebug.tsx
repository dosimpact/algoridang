import React from 'react';
import { useRecoilState } from 'recoil';
import {
  atomCurrentStrategyCode,
  atomInspector,
  atomUniversalSettingState,
  atomUniversalSettingStateIdx,
} from 'states/strategy/recoil/strategy-create';
import styled from 'styled-components';

// DashBoardDebug
// 아이콘과 타이틀이 들어가 있음
interface IDashBoardDebug {
  onClick?: () => void;
}
const DashBoardDebug: React.FC<IDashBoardDebug> = ({ onClick }) => {
  const inspector = useRecoilState(atomInspector);
  const universals = useRecoilState(atomUniversalSettingState);
  const currentStrategyCode = useRecoilState(atomCurrentStrategyCode);
  const universalSettingStateIdx = useRecoilState(atomUniversalSettingStateIdx);

  return (
    <SDashBoardDebug
      onClick={() => {
        if (onClick) {
          onClick();
        }
        console.log('inspector', JSON.stringify(inspector, null, 2));
        console.log('universals', JSON.stringify(universals, null, 2));
        console.log(
          'currentStrategyCode',
          JSON.stringify(currentStrategyCode, null, 2),
        );
        console.log(
          'universalSettingStateIdx',
          JSON.stringify(universalSettingStateIdx, null, 2),
        );
      }}
    >
      ATOM 디버그
    </SDashBoardDebug>
  );
};

export default DashBoardDebug;

const SDashBoardDebug = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  cursor: pointer;
`;
