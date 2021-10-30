import React, { useMemo } from 'react';
import { SubTitle, Title } from 'components/common/_atoms/Typos';
import { useHistory, useParams } from 'react-router-dom';
import { getTodayDiff } from 'utils/parse';
import styled from 'styled-components';
import ReturnsStatus from 'components/report/_organisms/ReturnsStatus';
import TradingHistory from 'components/report/_organisms/TradingHistory';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import { Button } from 'components/common/_atoms/Buttons';
import { useMyStrategyDetail } from 'states/strategy/query/useMyStrategyDetail';
import TradingPoints from 'components/report/_organisms/TradingPoints';
import StrategyCardInfoSkeleton from 'components/common/_molecules/StrategyCardInfoSkeleton';
import {
  SectionLgSkeleton,
  SectionMdSkeleton,
} from 'components/common/_molecules/MoleculesSkeletons';

const MockInvestDetail = () => {
  const history = useHistory();
  const params = useParams() as { id: string };
  if (!params.id || !Number.isInteger(Number(params.id))) {
    history.push(process.env.PUBLIC_URL + '/takers/mock-invest');
  }
  const strategyCode = params.id;
  const {
    firstUniversal,
    histories,
    investProfitInfo,
    memberStrategy,
    myStrategyDetailQuery,
  } = useMyStrategyDetail(strategyCode + '');

  const todayHistories = useMemo(() => {
    if (histories) {
      const todayHistories = histories.filter((history) => {
        return getTodayDiff(history.history_date) <= 2;
      });

      return todayHistories;
    }
    return [];
  }, [histories]);

  return (
    <StrategyDetailP>
      <NavHeaderDetail
        linkTo={process.env.PUBLIC_URL + '/takers/mock-invest'}
        headerTitle="모의 투자 상세보기"
      />
      <WingBlank>
        <WhiteSpace />
        {memberStrategy ? (
          <StrategyCardInfo isDisplayMock={true} strategy={memberStrategy} />
        ) : (
          <StrategyCardInfoSkeleton />
        )}
        <div className="flexRowSBt">
          <Title title="모의 투자" style={{ marginRight: '15px' }}></Title>
          <Button
            className="midsize-btn"
            onClick={() => {
              history.push(`/takers/mock-invest/update/${strategyCode}`);
            }}
          >
            수정하기
          </Button>
        </div>
        <div className="flexRowSBt" style={{ marginTop: '15px' }}>
          <SubTitle
            title="투자 수익 리포트"
            style={{ marginRight: '20px' }}
          ></SubTitle>
          <Button
            className="midsize-btn"
            type="blue"
            onClick={() => {
              history.push(
                process.env.PUBLIC_URL +
                  `/takers/mock-invest/report/${strategyCode}`,
              );
            }}
          >
            리포트
          </Button>
        </div>
        <div className="flexRowSBt" style={{ marginTop: '15px' }}>
          <SubTitle
            title="백테스트 리포트"
            style={{ marginRight: '20px' }}
          ></SubTitle>
          <Button
            type="blue"
            className="midsize-btn"
            onClick={() => {
              history.push(
                process.env.PUBLIC_URL +
                  `/takers/mock-invest/bt-report/${params.id}`,
              );
            }}
          >
            리포트 보기
          </Button>
        </div>
        <WhiteSpace />
        <WhiteSpace />
        {/* 0. 전략 메이커 설명 Description.tsx */}
        {/* {memberStrategy && (
          <Description description={memberStrategy.strategy_explanation} />
        )} */}
        {/* 1. 투자 수익 현황 ReturnsStatus.tsx */}
        {investProfitInfo ? (
          <ReturnsStatus
            title={`모의 투자 수익 현황 ${'(운용중)'}`}
            profit_rate={investProfitInfo?.profit_rate}
            invest_price={investProfitInfo?.invest_price}
            invest_principal={investProfitInfo?.invest_principal}
            total_profit_price={investProfitInfo?.total_profit_price}
          />
        ) : (
          <SectionMdSkeleton />
        )}
        {/* <TradingPoints /> */}
        <WhiteSpace />
        <WhiteSpace />
        {/* 3. 트레이딩 히스토리 */}
        {histories && todayHistories ? (
          <TradingHistory
            title={`오늘의 종목 (${todayHistories.length}개)`}
            header={['날짜', `종목\n(코드)`, '가격\n(원)', '수익/손실\n(%)']}
            keyMap={[
              'history_date',
              'ticker',
              'buy_sale_price',
              'profit_loss_rate',
            ]}
            body={todayHistories as any as Record<string, string>[]}
          />
        ) : (
          <SectionMdSkeleton />
        )}
        {/* 2. 매매 시점 TradingPoints.tsx */}
        {firstUniversal && firstUniversal.universal_code ? (
          <TradingPoints
            strategyCode={String(strategyCode)}
            ticker={firstUniversal.ticker}
            title={`매매시점 - ${firstUniversal.ticker} | ${firstUniversal.trading_strategy_name}`}
          />
        ) : (
          <SectionLgSkeleton />
        )}
      </WingBlank>
    </StrategyDetailP>
  );
};

export default MockInvestDetail;

const StrategyDetailP = styled.section`
  .articleHistory {
  }
  .midsize-btn {
    width: 9rem;
    height: 3rem;
  }
`;
