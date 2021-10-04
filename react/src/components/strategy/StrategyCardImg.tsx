import React from 'react';
import styled from 'styled-components';
import { randomDefaultThunmnail } from 'utils/default-values';

interface IStrategyCardImg {
  thumnail?: string; // 썸네일 이미지 url
  title: string; // 제목
  subTitle?: string; // 테그
  bottomText?: string; //아래 텍스트
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void; // 콜백
}

const StrategyCardImg: React.FC<IStrategyCardImg> = ({
  thumnail,
  title = 'Error',
  subTitle = '',
  bottomText = '',
  onClick,
}) => {
  thumnail = thumnail || randomDefaultThunmnail(title);
  return (
    <>
      <Card
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
      >
        <section className="imgSection">
          <img className="thumbnail" alt="thumbnail" src={thumnail}></img>
        </section>
        <section className="mainTextSection">
          <div className="title">{title}</div>
          <div className="subTitle">{subTitle}</div>
        </section>
        <section className="stateTextSection">
          <div className="bottomText">{bottomText}</div>
        </section>
      </Card>
    </>
  );
};

const Card = styled.section`
  background-color: white;
  box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.5);
  }
  min-width: 10rem;
  max-width: 28rem;
  min-height: 33rem;
  cursor: pointer;

  .imgSection {
    .thumbnail {
      width: 100%;
      height: 17rem;
    }
  }
  .mainTextSection {
    padding: 1.5rem 1rem;
    .title {
      font-size: ${(props) => props.theme.FontSizeXlg};
    }
    .subTitle {
      margin-top: 0.7rem;
      color: ${(props) => props.theme.ColorGrayD1};
      font-size: ${(props) => props.theme.FontSizeMd};
    }
  }
  position: relative;
  .stateTextSection {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: ${(props) => props.theme.ColorYellow};
    font-weight: 600;
  }
`;

export default StrategyCardImg;
