import React from 'react';
import { Title, SubTitle } from 'components/common/_atoms/Typos';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TradingHistory from 'components/report/_organisms/TradingHistory';
import TradingPoints from 'components/report/_organisms/TradingPoints';
import ReturnsStatus from 'components/report/_organisms/ReturnsStatus';
import Description from 'components/report/_molecules/Description';
import useStrategyDetail from 'states/strategy/query/useStrategyDetail';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WingBlank from 'components/common/_atoms/WingBlank';
import { Button } from 'components/common/_atoms/Buttons';
import StrategyCardInfoSkeleton from 'components/common/_molecules/StrategyCardInfoSkeleton';
import {
  SectionLgSkeleton,
  SectionMdSkeleton,
} from 'components/common/_molecules/MoleculesSkeletons';

const StrategyDetails = () => {
  // 히스토리
  const history = useHistory();
  // 현재 전략 코드 알아오기
  const params = useParams() as { id: string };

  const strategyCode = params?.id || 0;
  // 현재 전략코드로 데이터 API 요청
  console.log('strategyCode', strategyCode);

  const { firstUniversal, histories, investProfitInfo, memberStrategy } =
    useStrategyDetail(strategyCode + '');

  if (strategyCode === 0) {
    return (
      <div>
        <WingBlank>전략이 없습니다.</WingBlank>
      </div>
    );
  }

  return (
    <PStrategyDetail>
      <NavHeaderDetail
        linkTo={process.env.PUBLIC_URL + '/takers/strategy-search'}
        headerTitle="투자 전략 상세"
      />

      <WingBlank>
        <WhiteSpace />
        {memberStrategy ? (
          <StrategyCardInfo strategy={memberStrategy} />
        ) : (
          <StrategyCardInfoSkeleton />
        )}
        <>
          <div className="flexRowSBt">
            <Title title="모의 투자" style={{ marginRight: '15px' }}></Title>
            <Button
              className="midsize-btn"
              onClick={() => {
                history.push(`/takers/mock-invest/create/${strategyCode}`);
              }}
            >
              시작하기
            </Button>
          </div>

          <div className="flexRowSBt" style={{ marginTop: '15px' }}>
            <SubTitle
              title="투자 수익 리포트"
              style={{ marginRight: '20px' }}
            ></SubTitle>
            <Button
              type="blue"
              className="midsize-btn"
              onClick={() => {
                console.log('deatil');
                history.push(
                  process.env.PUBLIC_URL +
                    `/takers/strategy-search/report/${params.id}`,
                );
              }}
            >
              리포트 보기
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
                    `/takers/strategy-search/bt-report/${params.id}`,
                );
              }}
            >
              리포트 보기
            </Button>
          </div>
          <WhiteSpace />
          <WhiteSpace />
          {/* 0. 전략 메이커 설명 Description.tsx */}
          {memberStrategy ? (
            <Description description={memberStrategy.strategy_explanation} />
          ) : (
            <SectionMdSkeleton />
          )}
        </>
        {/* 1. 투자 수익 현황 ReturnsStatus.tsx */}
        {investProfitInfo ? (
          <ReturnsStatus
            title="투자 수익 현황"
            profit_rate={investProfitInfo?.profit_rate}
            invest_price={investProfitInfo?.invest_price}
            invest_principal={investProfitInfo?.invest_principal}
            total_profit_price={investProfitInfo?.total_profit_price}
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
        <WhiteSpace />
        {/* 3. 트레이딩 히스토리 */}
        {histories ? (
          <TradingHistory
            title="히스토리"
            header={['날짜', `종목\n(코드)`, '가격\n(원)', '수익/손실\n(%)']}
            keyMap={[
              'history_date',
              'ticker',
              'buy_sale_price',
              'profit_loss_rate',
            ]}
            body={histories as any as Record<string, string>[]}
          />
        ) : (
          <SectionLgSkeleton />
        )}
      </WingBlank>
    </PStrategyDetail>
  );
};

export default StrategyDetails;

const PStrategyDetail = styled.section`
  .articleReturnsStatus {
    .name {
      color: ${(props) => props.theme.ColorGray};
    }
    .value {
      color: ${(props) => props.theme.ColorYellow};
      font-weight: 600;
    }
    .returnsValue {
      font-size: ${(props) => props.theme.FontSizeXXlg};
    }
  }
  .articleTrading {
  }
  .articleHistory {
  }
  .midsize-btn {
    width: 9rem;
    height: 3rem;
  }
`;
