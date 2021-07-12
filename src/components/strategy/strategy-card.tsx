import React from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";
import FNumber from "components/data-display/FNumber";
import { WingBlank } from "antd-mobile";

interface IStrategyCard {
  thumnail?: string;
  title: string;
  subTitle?: string;
  CAGR?: number;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const StrategyCard: React.FC<IStrategyCard> = ({
  CAGR,
  subTitle = "",
  thumnail = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  title = "Error",
  onClick,
}) => {
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
          {CAGR && (
            <div className="CAGR">
              연수익 <FNumber val={CAGR} hasPercentage={true} />
            </div>
          )}
        </article>
      </Card>
    </>
  );
};

const Card = styled.section`
  /* box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.25); */
  box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.5);
  }

  min-height: 75px;
  height: 75px;
  min-width: 300px;
  width: 100%;

  display: grid;
  grid-template-columns: 70px 1fr;
  padding: 10px;
  margin-bottom: 20px;

  cursor: pointer;
  .thumnail {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .left {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: ${(props) => props.theme.FontSizeLg};
    }
    .subTitle {
      font-size: ${(props) => props.theme.FontSizeSm};
      color: ${(props) => props.theme.ColorGray};
    }
    .CAGR {
      font-size: ${(props) => props.theme.FontSizeSm};
      color: ${(props) => props.theme.ColorGray};
    }
  }
`;

export default StrategyCard;
