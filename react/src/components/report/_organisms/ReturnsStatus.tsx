import FNumber from 'components/common/_atoms/FNumber';
import { Title } from 'components/common/_atoms/Typos';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import React from 'react';
import styled from 'styled-components';
import { toAddComma } from 'utils/parse';

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
      <div className="flexRow" style={{ marginTop: '50px' }}>
        <Title title={title} style={{ marginTop: '20px' }} />
      </div>
      <WhiteSpace />
      <div className="returnsStatus" style={{ margin: '1.8rem 0px' }}>
        <div className="flexRowSBt" style={{ margin: '5px 0px' }}>
          <div className="name">수익률</div>
          <div className="value returnsValue">
            <FNumber val={Number(profit_rate)} hasPercentage={true} />
          </div>
        </div>
        <div className="flexRowSBt" style={{ margin: '1.8rem 0px' }}>
          <div className="name">투자 원금</div>
          <div className="value">{toAddComma(invest_principal)}원</div>
        </div>
        <div className="flexRowSBt" style={{ margin: '1.8rem 0px' }}>
          <div className="name">총 수익금</div>
          <div className="value">{toAddComma(total_profit_price)}원</div>
        </div>
        <hr />
        <div className="flexRowSBt" style={{ margin: '10px 0px' }}>
          <div className="name">예상 수익 금액</div>
          <div className="value">{toAddComma(invest_price)}원</div>
        </div>
      </div>
    </SReturnsStatus>
  );
};

export default ReturnsStatus;

const SReturnsStatus = styled.article`
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 1.6rem;
  .name {
    font-size: 1.7rem;
  }
  .value {
    color: ${(props) => props.theme.ColorYellow};
    font-weight: 600;
    font-size: 1.6rem;
  }
  .returnsValue {
    font-size: ${(props) => props.theme.FontSizeXXlg};
  }
`;
