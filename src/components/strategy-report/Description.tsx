import React from "react";
import { SubTitle } from "components/_atoms/Typo";
import styled from "styled-components";

interface IDescription {
  props?: any;
  description: string;
}
const Description: React.FC<IDescription> = ({ props, description }) => {
  return (
    <SDescription {...props}>
      <div className="flexRow" style={{ marginTop: "5rem" }}>
        <SubTitle title="전략 메이커 설명" style={{ marginTop: "2rem" }} />
      </div>
      <div className="description" style={{ marginTop: "1rem" }}>
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
  }
`;
