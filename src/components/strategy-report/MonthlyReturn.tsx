import ChartMonthlyReturn from "components/data-display/ChartMonthlyReturn";
import { SubTitle } from "components/data-display/Typo";
import React from "react";
import styled from "styled-components";

interface IMonthlyReturn {
  props?: any;
}

const MonthlyReturn: React.FC<IMonthlyReturn> = ({ props }) => {
  return (
    <SMonthlyReturn {...props}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title="백테스팅 월간 수익률" style={{ marginTop: "20px" }} />
      </div>
      <ChartMonthlyReturn />
    </SMonthlyReturn>
  );
};

export default MonthlyReturn;

const SMonthlyReturn = styled.section``;
