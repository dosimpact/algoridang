import { SubTitle } from "components/data-display/Typo";
import React from "react";
import styled from "styled-components";
import { toAddComma } from "utils/parse";

interface IReturnsStatus {
  title: string;
  profit_rate: string; // 8.%
  invest_principal: string; // - a
  total_profit_price: string; // - b
  invest_price: string; // - = a+b
  props?: any;
}

const ReturnsStatus: React.FC<IReturnsStatus> = ({
  title,
  profit_rate,
  invest_principal,
  total_profit_price,
  invest_price,
  ...props
}) => {
  return (
    <SReturnsStatus {...props}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title={title} style={{ marginTop: "20px" }} />
      </div>

      <div className="returnsStatus" style={{ margin: "15px 0px" }}>
        <div className="flexRowSBt" style={{ margin: "5px 0px" }}>
          <div className="name">연수익률</div>
        </div>
        <div className="flexRowSBt" style={{ marginBottom: "15px" }}>
          <div className="value returnsValue">
            {Math.round(Number(profit_rate) * 100)}%
          </div>
        </div>
        <div className="flexRowSBt" style={{ margin: "15px 0px" }}>
          <div className="name">투자 원금</div>
          <div className="value">{toAddComma(invest_principal)}원</div>
        </div>
        <div className="flexRowSBt" style={{ margin: "15px 0px" }}>
          <div className="name">총 수익금</div>
          <div className="value">{toAddComma(total_profit_price)}원</div>
        </div>
        <hr />
        <div className="flexRowSBt" style={{ margin: "10px 0px" }}>
          <div className="name">예상 수익 금액</div>
          <div className="value">{toAddComma(invest_price)}원</div>
        </div>
      </div>
    </SReturnsStatus>
  );
};

export default ReturnsStatus;

const SReturnsStatus = styled.article`
  .name {
    color: ${(props) => props.theme.ColorGray};
  }
  .value {
    color: ${(props) => props.theme.ColorYellow};
    font-weight: 600;
  }
  .returnsValue {
    font-size: ${(props) => props.theme.FontSizeXXlg};
  }
`;
