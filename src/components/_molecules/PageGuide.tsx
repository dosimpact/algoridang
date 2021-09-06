import React from "react";
import styled from "styled-components";

const PageGuide: React.FC<{
  icon: JSX.Element;
  title: string;
  subTitle?: string;
}> = ({ icon, title, subTitle }) => {
  return (
    <SPageGuide>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="subTitle">{subTitle}</div>
    </SPageGuide>
  );
};

export default PageGuide;

const SPageGuide = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 5.4rem 0rem;
  .icon {
    fill: ${(props) => props.theme.ColorMainYellow};
    svg {
      width: 4.3rem;
      height: 4.3rem;
    }
  }
  .title {
    margin-top: 1.3rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: #000000;
    font-weight: bold;
  }
  .subTitle {
    margin-top: 1rem;
    font-size: 1.15rem;
    color: ${(props) => props.theme.ColorMainGray};
  }
`;
