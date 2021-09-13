import React from "react";
import { useRecoilState } from "recoil";
import { atomInspector } from "states/recoil/strategy-create";
import styled from "styled-components";

interface IMonoTickerSettingButton {
  title?: string;
}

// 대시보드 (col-2) : 개별 종목 매매전략 설정 및 매매전략상세설정 button
const MonoTickerSettingButton: React.FC<IMonoTickerSettingButton> = ({
  children,
  title,
}) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const handleClickTicker = () => {
    setInspector((prev) => ({ ...prev, inspectorType: "tradingSetting" }));
  };

  const handleClickTradingSetting = () => {
    setInspector((prev) => ({
      ...prev,
      inspectorType: "tradingPropertySetting",
    }));
  };

  return (
    <SMonoTickerSettingButton>
      <div onClick={handleClickTicker}>{title}</div>
      <div>{" > "}</div>
      <div onClick={handleClickTradingSetting}>매매전략 선택</div>
    </SMonoTickerSettingButton>
  );
};

export default MonoTickerSettingButton;

const SMonoTickerSettingButton = styled.section`
  display: grid;
  grid-template-columns: 1fr 0.3fr 1fr;
  border: 1px solid black;
  cursor: pointer;
  min-height: 5rem;

  :hover {
    border: 1px solid red;
  }
`;
