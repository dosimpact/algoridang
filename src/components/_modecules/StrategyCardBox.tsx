import React from "react";
import styled from "styled-components";
import FNumber from "components/data-display/FNumber";
import { randomDefaultThunmnail } from "utils/default-values";

/**
 * 박스형 전략탐색 카드
 */

interface IStrategyCardBox {
  thumnail?: string;
  title: string;
  subTitle?: string;
  CAGR?: number;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  StrategyState?: string;
}

const StrategyCardBox: React.FC<IStrategyCardBox> = ({
  CAGR,
  subTitle = "",
  thumnail = "",
  title = "Error",
  onClick,
  StrategyState,
}) => {
  if (!thumnail) thumnail = randomDefaultThunmnail(title);
  return (
    <>
      <Card
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
      >
        <article className="left">
          <img className="thumnail" src={thumnail} alt="thumnail"></img>
        </article>
        <article className="right">
          <div className="title">{title}</div>
          {subTitle && <div className="subTitle">{subTitle}</div>}
          <div className="CAGR">
            연수익{" "}
            {CAGR ? (
              <FNumber val={CAGR} hasPercentage={true} />
            ) : (
              "- 백테스팅 대기중"
            )}
          </div>
        </article>
      </Card>
    </>
  );
};

const Card = styled.section`
  background-color: white;
  transition: box-shadow 0.2s ease-in-out;
  /* :hover {
    box-shadow: 0px 0.5px 5px 0px rgba(0, 0, 0, 0.5);
  } */
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.25);
  border-radius: 7px;

  min-height: 10rem;
  height: 10rem;
  min-width: 300px;
  width: 100%;

  display: grid;
  grid-template-columns: 10rem 1fr;
  margin-bottom: 20px;

  cursor: pointer;

  .left {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
    width: 10rem;
    height: 100%;
    /* background-color: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    .thumnail {
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .right {
    width: 100%;
    margin-left: 3.4rem;
    padding-top: 1.9rem;
    .title {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.5rem;
    }
    .subTitle {
      margin-top: 0.7rem;
      font-size: 1.1rem;
      color: ${(props) => props.theme.ColorMainGray};
    }
    .CAGR {
      font-size: ${(props) => props.theme.FontSizeSm};
      color: ${(props) => props.theme.ColorGray};
    }
  }
`;

export default StrategyCardBox;
