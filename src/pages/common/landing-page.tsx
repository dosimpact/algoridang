import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, WhiteSpace, WingBlank } from "antd-mobile";
import useMember from "states/react-query/useMember";
import Sample from "components/light-weight/Sample";
import LineSeriesChart, {
  ILineData,
} from "components/light-weight/LineSeriesChart";
import useDailyStock from "states/react-query/finance/useDailyStock";
// todo : makers, takers 선택 저장하기
const LandingPage = () => {
  const { logIn, memberInfo } = useMember();
  console.log("memberInfo", memberInfo);

  const { dayilStocks, error, isLoading } = useDailyStock(
    "006400",
    20,
    0,
    "ASC"
  );
  console.log("dayilStocks", dayilStocks);

  const res = dayilStocks?.map((daily) => ({
    time: daily.stock_date,
    value: Number(daily.close_price),
  }));
  console.log("res", res);

  return (
    <WingBlank>
      <Button
        onClick={() => {
          logIn({
            email_id: "ypd03008@gmail.com",
            password: "ypd03008",
          });
        }}
      >
        login
      </Button>
      <WhiteSpace />
      <h1 style={{ fontSize: "20px" }}>알고리당에 오신것을 환영합니다.</h1>
      <WhiteSpace />
      <nav>
        <ul>
          <Button type="ghost">
            <Link to="takers">
              <li>전략 탐색 하기</li>
            </Link>
          </Button>
          <WhiteSpace />
          <Button type="ghost">
            <Link to="makers">
              <li>전략 생성 하기</li>
            </Link>
          </Button>
          <WhiteSpace />
        </ul>
      </nav>
      <div>Landing page</div>
      {/* <Sample /> */}
      <LineSeriesChart datas={res} />
    </WingBlank>
  );
};

export default LandingPage;
