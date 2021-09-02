import React, { useMemo } from "react";
import { WingBlank, WhiteSpace, Button } from "antd-mobile";
import { Title, SubTitle } from "components/_atoms/Typo";
import StrategyCard from "components/lagacy/StrategyCard";
import useBackButton from "components/lagacy/useBackButton";
import { useHistory, useParams } from "react-router-dom";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import TradingHistory from "components/strategy-report/TradingHistory";
import TradingPoints from "components/strategy-report/TradingPoints";
import ReturnsStatus from "components/strategy-report/ReturnsStatus";
import Description from "components/strategy-report/Description";
import useStrategyDetail from "states/react-query/strategy/useStrategyDetail";

const StrategyDetails = () => {
  const Back = useBackButton();
  const history = useHistory();
  const params = useParams() as { id: string };
  const strategyCode = params?.id || 0;
  if (strategyCode === 0) {
    history.push("/");
  }
  const { strategyDetailQuery } = useStrategyDetail(strategyCode + "");

  const memberStrategy = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy,
    [strategyDetailQuery?.data]
  );
  // const backtestDetailInfo = useMemo(
  //   () => strategyDetailQuery?.data?.memberStrategy?.backtestDetailInfo,
  //   [strategyDetailQuery?.data]
  // );

  const firstUniversal = useMemo(
    () =>
      strategyDetailQuery?.data?.memberStrategy &&
      strategyDetailQuery?.data?.memberStrategy.universal &&
      strategyDetailQuery?.data?.memberStrategy?.universal.length >= 1 &&
      strategyDetailQuery?.data?.memberStrategy?.universal[0],
    [strategyDetailQuery?.data]
  );

  const investProfitInfo = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy?.investProfitInfo,
    [strategyDetailQuery?.data]
  );

  const histories = useMemo(
    () =>
      strategyDetailQuery?.data?.memberStrategy?.histories.map((history) => ({
        ...history,
        history_date: String(history.history_date).substr(0, 10),
      })),
    [strategyDetailQuery?.data]
  );
  // console.log("histories", histories);
  // console.log("investProfitInfo", investProfitInfo);
  // console.log("firstUniversal", firstUniversal);

  return (
    <StrategyDetailP>
      <WingBlank style={{ margin: "15x" }} size="lg">
        <WhiteSpace size="xl" />
        {strategyDetailQuery.isLoading && "loading..."}
        <div className="flexRow">
          {Back()}
          <Title title={"투자 전략 리포트"} />
        </div>
        <WhiteSpace size="xl" />

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

        <div className="flexRowSBt">
          <SubTitle
            title="모의 투자"
            style={{ marginRight: "15px" }}
          ></SubTitle>
          <Button
            type="warning"
            size="small"
            style={{ width: "100px" }}
            onClick={() => {
              history.push("/takers/mock-invest/create/1");
            }}
          >
            시작하기
          </Button>
        </div>
        <div className="flexRowSBt" style={{ marginTop: "15px" }}>
          <SubTitle
            title="상세 전략 리포트"
            style={{ marginRight: "20px" }}
          ></SubTitle>
          <Button
            type="ghost"
            size="small"
            style={{ width: "100px" }}
            onClick={(e) => {
              console.log("deatil");
              history.push(
                process.env.PUBLIC_URL +
                  `/takers/strategy-search/report/${params.id}`
              );
            }}
          >
            리포트
          </Button>
        </div>
        {/* 0. 전략 메이커 설명 Description.tsx */}
        {memberStrategy && (
          <Description description={memberStrategy.strategy_explanation} />
        )}
        {/* 1. 투자 수익 현황 ReturnsStatus.tsx */}
        {investProfitInfo && (
          <ReturnsStatus
            title="투자 수익 현황"
            profit_rate={investProfitInfo?.profit_rate}
            invest_price={investProfitInfo?.invest_price}
            invest_principal={investProfitInfo?.invest_principal}
            total_profit_price={investProfitInfo?.total_profit_price}
          />
        )}
        {/* 2. 매매 시점 TradingPoints.tsx */}
        {firstUniversal && firstUniversal.universal_code && (
          <TradingPoints
            strategyCode={String(strategyCode)}
            ticker={firstUniversal.ticker}
            title={`매매시점 - ${firstUniversal.ticker} | ${firstUniversal.trading_strategy_name}`}
          />
        )}
        {/* 3. 트레이딩 히스토리 */}
        {histories && (
          <TradingHistory
            title="히스토리"
            header={["날짜", "매수/매도", "가격", "수익/손실"]}
            keyMap={[
              "history_date",
              "ticker",
              "buy_sale_price",
              "profit_loss_rate",
            ]}
            body={histories as any as Record<string, string>[]}
          />
        )}
      </WingBlank>
    </StrategyDetailP>
  );
};

export default StrategyDetails;

const StrategyDetailP = styled.section`
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
`;
