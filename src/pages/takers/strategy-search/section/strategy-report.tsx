import React, { useMemo } from "react";
import { WingBlank, WhiteSpace, Button } from "antd-mobile";
import { SubTitle } from "components/_atoms/Typo";
import StrategyCard from "components/strategy/StrategyCard";
import { useHistory, useParams } from "react-router-dom";
import { toPercentage, toRatio, toTagsString } from "utils/parse";
import styled from "styled-components";
import DetailSummary from "components/strategy-report/DetailSummary";
import CumulativeReturn from "components/strategy-report/CumulativeReturn";
import MonthlyReturn from "components/strategy-report/MonthlyReturn";
import WinRatio from "components/strategy-report/WinRatio";
import BackNav from "components/takers/BackNav";
import useStrategyDetail from "states/react-query/strategy/useStrategyDetail";
import useBackTestReport from "states/react-query/backtest/useBackTestReport";

const StrategyReport = () => {
  const history = useHistory();
  const params = useParams() as { id: string };
  const strategyCode = params?.id || 0;
  if (strategyCode === 0) {
    history.push("/");
  }
  const { strategyDetailQuery } = useStrategyDetail(strategyCode + "");
  const { accumulateProfitRateQuery, montlyProfitRateQuery, winRatioQuery } =
    useBackTestReport(strategyCode + "");

  const memberStrategy = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy,
    [strategyDetailQuery?.data]
  );
  const backtestDetailInfo = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy?.backtestDetailInfo,
    [strategyDetailQuery?.data]
  );
  const investProfitInfo = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy?.investProfitInfo,
    [strategyDetailQuery?.data]
  );

  // console.log("memberStrategy", memberStrategy);
  // console.log("backtestDetailInfo", backtestDetailInfo);
  // console.log("accumulateProfitRateQuery", accumulateProfitRateQuery);
  // console.log("montlyProfitRateQuery", montlyProfitRateQuery);
  // console.log("winRatioQuery", winRatioQuery);
  console.log("investProfitInfo", investProfitInfo);

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
        항목: "시작 날짜",
        결과: `${
          investProfitInfo?.invest_start_date
            ? investProfitInfo?.invest_start_date.slice(0, 10)
            : "-"
        }`,
      },
      {
        항목: "종료 날짜",
        결과: `${
          investProfitInfo?.invest_end_date
            ? investProfitInfo?.invest_end_date.slice(0, 10)
            : "-"
        }`,
      },
      {
        항목: "수수료",
        결과: `${
          investProfitInfo?.securities_corp_fee
            ? toPercentage(investProfitInfo?.securities_corp_fee)
            : "-"
        } %`,
      },
      {
        항목: "누적수익율",
        결과: `${
          investProfitInfo?.profit_rate
            ? toPercentage(investProfitInfo?.profit_rate)
            : "-"
        } %`,
      },
      {
        항목: "연평균수익율",
        결과: `${
          backtestDetailInfo?.year_avg_profit_rate
            ? toPercentage(backtestDetailInfo?.year_avg_profit_rate)
            : "-"
        } %`,
      },
      {
        항목: "MDD",
        결과: `${
          backtestDetailInfo?.mdd ? toPercentage(backtestDetailInfo?.mdd) : "-"
        } %`,
      },
      {
        항목: "거래 개월수",
        결과: `${
          backtestDetailInfo?.trading_month_count
            ? toPercentage(backtestDetailInfo?.trading_month_count)
            : "-"
        }`,
      },
      {
        항목: "상승 개월수",
        결과: `${
          backtestDetailInfo?.rising_month_count
            ? toPercentage(backtestDetailInfo?.rising_month_count)
            : "-"
        }`,
      },
      {
        항목: "승률",
        결과: `${winRatio ? winRatio : "-"} %`,
      },
      {
        항목: "월평균수익률",
        결과: `${
          backtestDetailInfo?.month_avg_profit_rate
            ? toPercentage(backtestDetailInfo?.month_avg_profit_rate)
            : "-"
        }`,
      },
      {
        항목: "연간변동성(표준편차)",
        결과: `${
          backtestDetailInfo?.yearly_volatility
            ? backtestDetailInfo?.yearly_volatility
            : "-"
        }`,
      },
      {
        항목: "샤프 지수",
        결과: `${backtestDetailInfo?.sharp ? backtestDetailInfo?.sharp : "-"}`,
      },
    ];
  }, [investProfitInfo, backtestDetailInfo, winRatio]);

  return (
    <StrategyDetailP>
      <WingBlank style={{ margin: "15x" }} size="lg">
        <WhiteSpace size="xl" />
        <BackNav title={"투자 전략 리포트"} />
        {memberStrategy && (
          <StrategyCard
            title={memberStrategy.strategy_name}
            subTitle={toTagsString(
              memberStrategy.hashList?.map((e) => e?.hash?.hash_contents)
            )}
            CAGR={
              memberStrategy?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(memberStrategy?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={memberStrategy.image_url}
          />
        )}
        <>
          <div className="flexRowSBt">
            <SubTitle
              title="모의 투자"
              style={{ marginRight: "15px" }}
            ></SubTitle>
            <Button type="warning" size="small" style={{ width: "100px" }}>
              시작하기
            </Button>
          </div>
        </>
        {/* 4. 상세 리포트 DetailSummary.tsx  */}
        <DetailSummary body={reportBody} header={["항목", "결과"]} />
        {/* 5. 백테스팅 누적 수익률 CumulativeReturn.tsx */}
        <CumulativeReturn strategyCode={"" + strategyCode} />
        {/* 6. 백테스팅 월간 수익률 */}
        <MonthlyReturn strategyCode={"" + strategyCode} />
        {/* 7. 승률 */}
        <WinRatio />
      </WingBlank>
    </StrategyDetailP>
  );
};

export default StrategyReport;

const StrategyDetailP = styled.section`
  margin-bottom: 120px;
  overflow: hidden;
`;
