import React from "react";
import { Link } from "react-router-dom";
import { Button, WhiteSpace, WingBlank } from "antd-mobile";
import useMember from "states/react-query/useMember";

// todo : makers, takers 선택 저장하기
const LandingPage = () => {
  const { logIn, me } = useMember();
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
      <h1 style={{ fontSize: "20px" }}>
        알고리당에 오신것을 환영합니다.
        <br />
        {!me.isLoading && me?.data?.data.member_name} 님 ({" "}
        {!me.isLoading && me?.data?.data.email_id})
      </h1>
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
    </WingBlank>
  );
};

export default LandingPage;
