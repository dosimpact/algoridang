import React, { useMemo } from 'react';
import styled from 'styled-components';
import { randomDefaultThunmnail } from 'utils/default-values';
import BadgeCAGR from 'components/common/_atoms/BadgeCAGR';
import { toTagsString, toTickerImage } from 'utils/parse';
import RoundBadge from '../_atoms/RoundBadge';
import { MemberStrategy } from 'states/strategy/interface/entities';

/**
 * 박스형 전략탐색 카드
 */

interface IStrategyCardInfo {
  strategy: MemberStrategy;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isDisplayMock?: boolean;
}

const StrategyCardInfo: React.FC<IStrategyCardInfo> = ({
  strategy,
  onClick,
  isDisplayMock = false,
}) => {
  strategy = useMemo(() => strategy, [strategy]);

  const thumnail =
    strategy.universal.length >= 1
      ? toTickerImage(strategy.universal[0].ticker)
      : randomDefaultThunmnail(strategy.strategy_name);

  const CAGR = useMemo(() => {
    return (
      strategy?.backtestDetailInfo?.year_avg_profit_rate &&
      Number(strategy?.backtestDetailInfo?.year_avg_profit_rate)
    );
  }, [strategy]);

  const title = useMemo(() => strategy.strategy_name, [strategy]);

  const subTitle = useMemo(() => {
    return toTagsString(strategy.hashList?.map((e) => e?.hash?.hash_contents));
  }, [strategy]);

  let onErrorImg = strategy.image_url;
  if (!onErrorImg) onErrorImg = randomDefaultThunmnail(title);

  return (
    <>
      <SStrategyCardInfo
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
      >
        <article className="left">
          <img
            className="thumnail"
            src={thumnail}
            alt="thumnail"
            onError={(e) => {
              e.currentTarget.src = onErrorImg;
            }}
          ></img>
          {isDisplayMock &&
            (strategy.operation_yes_no ? (
              <div className="bottomBadge operation">운용중</div>
            ) : (
              <div className="bottomBadge not_operation">운용 중지</div>
            ))}
        </article>
        <article className="right">
          <div className="title text_ellipsis">{title}</div>
          {subTitle && <div className="subTitle">{subTitle}</div>}
          <div className="CAGR">
            {strategy.status_code === 'Success' ? (
              <BadgeCAGR val={CAGR} hasPercentage={true} />
            ) : strategy.status_code === 'Running' ? (
              <RoundBadge type="Green">백테스트 진행중</RoundBadge>
            ) : (
              strategy.status_code === 'Error' && (
                <RoundBadge type="Yellow">백테스트 오류</RoundBadge>
              )
            )}
          </div>
        </article>
      </SStrategyCardInfo>
    </>
  );
};

const SStrategyCardInfo = styled.section`
  background-color: white;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.25);
  border-radius: 7px;

  min-height: 10rem;
  height: 12rem;
  width: 100%;

  display: grid;
  grid-template-columns: 10rem 1fr;
  margin-bottom: 20px;
  cursor: pointer;
  .left {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
    margin-top: 1rem;
    width: 10rem;
    height: 10rem;
    /* background-color: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    .thumnail {
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
      width: 100%;
      height: auto;
      object-fit: scale-down;
      padding: 1rem;
    }
    position: relative;
    .bottomBadge {
      position: absolute;
      bottom: 0;

      height: 2.4rem;
      width: 100%;
      font-size: 1rem;
      line-height: 1.2rem;
      border-bottom-left-radius: 0.7rem;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    .operation {
      background: ${(props) => props.theme.ColorMainRed};
      color: #ffffff;
    }
    .not_operation {
      background: ${(props) => props.theme.ColorMainYellow};
      color: ${(props) => props.theme.ColorMainWhite};
    }
  }
  .right {
    width: 100%;
    padding: 2.2rem 1.2rem 0rem 1.2rem;
    .title {
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.5rem;
    }
    .subTitle {
      margin-top: 1rem;
      font-size: 1.1rem;
      font-weight: 400;
      color: ${(props) => props.theme.ColorMainGray};
    }
    .CAGR {
      margin-top: 1rem;
    }
  }
`;

export default StrategyCardInfo;
