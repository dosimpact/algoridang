import ChartCumulativeReturn from "components/data-display/ChartCumulativeReturn";
import { SubTitle } from "components/data-display/Typo";
import React from "react";
import styled from "styled-components";

interface ICumulativeReturn {
  props?: any;
}

const CumulativeReturn: React.FC<ICumulativeReturn> = ({ props }) => {
  return (
    <SCumulativeReturn {...props}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title="백테스팅 누적 수익률" style={{ marginTop: "20px" }} />
      </div>
      <ChartCumulativeReturn />
    </SCumulativeReturn>
  );
};

export default CumulativeReturn;

const SCumulativeReturn = styled.section``;
