import React from 'react';
import { SubTitle } from 'components/common/_atoms/Typos';
import styled from 'styled-components';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';

interface IDescription {
  props?: any;
  description: string;
}
const Description: React.FC<IDescription> = ({ props, description }) => {
  return (
    <SDescription {...props}>
      <div className="flexRow">
        <SubTitle title="전략 메이커 설명" />
      </div>
      <WhiteSpace />
      <div className="description">
        {description}
        {/* 국민 주식 삼성전자에 가장 어울리는 매매전략인 골든 크로스로 제작 */}
      </div>
    </SDescription>
  );
};

export default Description;

const SDescription = styled.article`
  .description {
    line-height: 20px;
    color: ${(props) => props.theme.ColorMainGray};
    white-space: wrap;
  }
`;
