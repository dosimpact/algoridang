import { SubTitle } from "components/data-display/Typo";
import React from "react";
import styled from "styled-components";

interface IReturnsStatus {
  title: string;
  props?: any;
}

const ReturnsStatus: React.FC<IReturnsStatus> = ({ title, ...props }) => {
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
          <div className="value returnsValue">-1.2%</div>
        </div>
        <div className="flexRowSBt" style={{ margin: "15px 0px" }}>
          <div className="name">투자 원금</div>
          <div className="value">10,160,000원</div>
        </div>
        <div className="flexRowSBt" style={{ margin: "15px 0px" }}>
          <div className="name">총 수익금</div>
          <div className="value">130,000원</div>
        </div>
        <div className="flexRowSBt" style={{ margin: "10px 0px" }}>
          <div className="name">예상 투자 금액</div>
          <div className="value">10,290,000원</div>
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
  }
`;
