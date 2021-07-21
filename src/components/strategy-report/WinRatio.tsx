import ChartWinRatio from "components/data-display/ChartWinRatio";
import { SubTitle } from "components/data-display/Typo";
import React from "react";
import styled from "styled-components";

interface IWinRatio {
  props?: any;
}

const WinRatio: React.FC<IWinRatio> = ({ props }) => {
  return (
    <SWinRatio {...props}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title="백테스팅 승률" style={{ marginTop: "20px" }} />
      </div>
      <ChartWinRatio />
    </SWinRatio>
  );
};

export default WinRatio;

const SWinRatio = styled.section``;
