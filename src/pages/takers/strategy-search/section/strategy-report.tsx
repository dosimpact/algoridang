import React, { useMemo } from 'react';
import { Title } from 'components/_atoms/Typos';
import { useHistory, useParams } from 'react-router-dom';
import {
  toPercentage,
  toRatio,
  toTagsString,
  toTickerImage,
} from 'utils/parse';
import styled from 'styled-components';
import DetailSummary from 'components/report/_organisms/DetailSummary';
import CumulativeReturn from 'components/report/_molecules/CumulativeReturn';
import MonthlyReturn from 'components/report/_molecules/MonthlyReturn';
import WinRatio from 'components/report/_molecules/WinRatio';
import useStrategyDetail from 'states/react-query/strategy/useStrategyDetail';
import useBackTestReport from 'states/react-query/backtest/useBackTestReport';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import StrategyCardBox from 'components/common/_molecules/StrategyCardBox';
import { Button } from 'components/common/_atoms/Buttons';

interface IStrategyReport {
  showForkButton?: boolean;
}
const StrategyReport: React.FC<IStrategyReport> = ({ showForkButton }) => {
  // 모의 투자 버튼
  showForkButton = showForkButton === undefined ? true : false;

  // 전략 코드 얻어오기
  const history = useHistory();
  const params = useParams() as { id: string };
  const strategyCode = params?.id || 0;
  if (strategyCode === 0) {
    history.push('/');
  }
  const { strategyDetailQuery } = useStrategyDetail(strategyCode + '');
  const {
    winRatioQuery,
    // accumulateProfitRateQuery, montlyProfitRateQuery,
  } = useBackTestReport(strategyCode + '');

  const memberStrategy = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy,
    [strategyDetailQuery?.data],
  );
  const backtestDetailInfo = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy?.backtestDetailInfo,
    [strategyDetailQuery?.data],
  );
  const investProfitInfo = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy?.investProfitInfo,
    [strategyDetailQuery?.data],
  );

  // console.log("memberStrategy", memberStrategy);
  // console.log("backtestDetailInfo", backtestDetailInfo);
  // console.log("accumulateProfitRateQuery", accumulateProfitRateQuery);
  // console.log("montlyProfitRateQuery", montlyProfitRateQuery);
  // console.log("winRatioQuery", winRatioQuery);
  console.log('investProfitInfo', investProfitInfo);

  const winRatio = useMemo(() => {
    if (winRatioQuery.data?.ok && winRatioQuery.data.backtestWinRatio) {
      const { loss_count, win_count } = winRatioQuery.data.backtestWinRatio;
      return toPercentage(toRatio(win_count, loss_count));
    }
    return null;
  }, [winRatioQuery]);

  const reportBody = useMemo(() => {
    return [
      {
        name: '시작 날짜',
        val: `${
          investProfitInfo?.invest_start_date
            ? investProfitInfo?.invest_start_date.slice(0, 10)
            : '-'
        }`,
      },
      {
        name: '종료 날짜',
        val: `${
          investProfitInfo?.invest_end_date
            ? investProfitInfo?.invest_end_date.slice(0, 10)
            : '-'
        }`,
      },
      {
        name: '수수료',
        val: `${
          investProfitInfo?.securities_corp_fee
            ? toPercentage(investProfitInfo?.securities_corp_fee)
            : '-'
        } %`,
      },
      {
        name: '누적수익율',
        val: `${
          investProfitInfo?.profit_rate
            ? toPercentage(investProfitInfo?.profit_rate)
            : '-'
        } %`,
      },
      {
        name: '연평균수익율',
        val: `${
          backtestDetailInfo?.year_avg_profit_rate
            ? toPercentage(backtestDetailInfo?.year_avg_profit_rate)
            : '-'
        } %`,
      },
      {
        name: 'MDD',
        val: `${
          backtestDetailInfo?.mdd ? toPercentage(backtestDetailInfo?.mdd) : '-'
        } %`,
      },
      {
        name: '거래 개월수',
        val: `${
          backtestDetailInfo?.trading_month_count
            ? backtestDetailInfo?.trading_month_count
            : '-'
        }`,
      },
      {
        name: '상승 개월수',
        val: `${
          backtestDetailInfo?.rising_month_count
            ? backtestDetailInfo?.rising_month_count
            : '-'
        }`,
      },
      {
        name: '승률',
        val: `${winRatio ? winRatio : '-'} %`,
      },
      {
        name: '월평균수익률',
        val: `${
          backtestDetailInfo?.month_avg_profit_rate
            ? `${toPercentage(backtestDetailInfo?.month_avg_profit_rate)} %`
            : '-'
        }`,
      },
      {
        name: '연간변동성\n(표준편차)',
        val: `${
          backtestDetailInfo?.yearly_volatility
            ? backtestDetailInfo?.yearly_volatility
            : '-'
        }`,
      },
      {
        name: '샤프 지수',
        val: `${backtestDetailInfo?.sharp ? backtestDetailInfo?.sharp : '-'}`,
      },
    ];
  }, [investProfitInfo, backtestDetailInfo, winRatio]);

  return (
    <PStrategyDetail>
      <NavHeaderDetail
        linkTo={
          process.env.PUBLIC_URL +
          `/takers/strategy-search/details/${strategyCode}`
        }
        headerTitle="전략 상세 리포트"
      />
      <WingBlank>
        <WhiteSpace />
        {memberStrategy && (
          <StrategyCardBox
            title={memberStrategy.strategy_name}
            subTitle={toTagsString(
              memberStrategy.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              memberStrategy?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(memberStrategy?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={
              memberStrategy.universal.length >= 1
                ? toTickerImage(memberStrategy.universal[0].ticker)
                : ''
            }
            onErrorImg={memberStrategy.image_url}
          />
        )}
        <>
          {showForkButton && (
            <div className="flexRowSBt">
              <Title title="모의 투자" style={{ marginRight: '15px' }}></Title>
              <Button
                style={{ width: '8rem' }}
                onClick={() => {
                  history.push(`/takers/mock-invest/create/${strategyCode}`);
                }}
              >
                시작하기
              </Button>
            </div>
          )}
        </>
        {/* 4. 상세 리포트 DetailSummary.tsx  */}
        <DetailSummary body={reportBody} header={['name', 'val']} />
        {/* 5. 백테스팅 누적 수익률 CumulativeReturn.tsx */}
        <CumulativeReturn strategyCode={'' + strategyCode} />
        {/* 6. 백테스팅 월간 수익률 */}
        <MonthlyReturn strategyCode={'' + strategyCode} />
        {/* 7. 승률 */}
        <WinRatio />
      </WingBlank>
    </PStrategyDetail>
  );
};

export default StrategyReport;

const PStrategyDetail = styled.section`
  margin-bottom: 120px;
  overflow: hidden;
`;
