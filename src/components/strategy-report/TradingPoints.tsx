import ChartCumulativeReturn from "components/data-display/ChartCumulativeReturn";
import { SubTitle } from "components/data-display/Typo";
import React from "react";
import styled from "styled-components";

interface ITradingPoints {
  props?: any;
}
const TradingPoints: React.FC<ITradingPoints> = ({ ...props }) => {
  return (
    <STradingPoints {...props}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title="매매 시점" style={{ marginTop: "20px" }} />
      </div>
      <ChartCumulativeReturn />
    </STradingPoints>
  );
};

export default TradingPoints;

const STradingPoints = styled.article``;
