import React from 'react';
import styled from 'styled-components';

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
  padding-top: 4rem;
  padding-bottom: 5rem;
  .icon {
    fill: ${(props) => props.theme.ColorMainYellow};
    svg {
      width: 4.3rem;
      height: 4.3rem;
    }
  }
  .title {
    margin-top: 1.5rem;
    font-size: 1.8rem;
    line-height: 1.6rem;
    color: #000000;
    font-weight: 700;
  }
  .subTitle {
    margin-top: 1rem;
    font-size: 1.3rem;
    line-height: 2rem;
    font-weight: 400;
    color: ${(props) => props.theme.ColorMainGray};
    text-align: center;

    white-space: pre-wrap;
  }
`;
