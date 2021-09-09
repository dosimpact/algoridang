import React from "react";
import { useRecoilState } from "recoil";
import { atomInspector } from "states/recoil/strategy-create";
import styled from "styled-components";

interface IMonoTickerSettingButton {
  title?: string;
}

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
  display: flex;
  border: 1px solid black;
  padding: 1rem;

  cursor: pointer;
  :hover {
    border: 1px solid red;
  }
`;
