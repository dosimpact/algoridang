import React from "react";
import styled from "styled-components";
import FNumber from "components/data-display/FNumber";

interface IStrategyCard {
  thumnail?: string;
  title: string;
  subTitle?: string;
  CAGR?: number;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  StrategyState?: string;
}

const mapToDefaultThunmnail = (title: string) => {
  const idx = title.length % 4;
  if (idx === 0)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272438714d_thumb01.jpeg";
  if (idx === 1)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272493836d_thumb02.png";
  if (idx === 2)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272499339d_thumb03.jpeg";
  if (idx === 3)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272503198d_thumb04.png";
  return "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";
};

const StrategyCard: React.FC<IStrategyCard> = ({
  CAGR,
  subTitle = "",
  thumnail = "",
  title = "Error",
  onClick,
  StrategyState,
}) => {
  if (!thumnail) thumnail = mapToDefaultThunmnail(title);
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
        <article className="mid">
          <div className="title">{title}</div>
          {subTitle && <div className="subTitle">{subTitle}</div>}
          <div className="CAGR">
            연수익 {CAGR ? <FNumber val={CAGR} hasPercentage={true} /> : "-"}
          </div>
        </article>
        <article className="right">
          {StrategyState && (
            <div className="strategyState">{StrategyState}</div>
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
  height: 85px;
  min-width: 300px;
  width: 100%;

  display: grid;
  grid-template-columns: 70px 1fr 70px;
  padding: 10px;
  margin-bottom: 20px;

  cursor: pointer;
  .thumnail {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .left {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mid {
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
  .right {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    .strategyState {
      font-size: ${(props) => props.theme.FontSizeLg};
      color: ${(props) => props.theme.ColorYellow};
    }
  }
`;

export default StrategyCard;
