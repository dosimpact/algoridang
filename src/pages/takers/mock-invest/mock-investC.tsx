import React from "react";
import { Route, Switch } from "react-router-dom";
import MockInvestP from "./mock-investP";
import MockInvestCreate from "./section/mock-invest-create";
import MockInvestDetail from "./section/mock-invest-detail";
import MockInvestList from "./section/mock-invest-list";
import MockInvestUpdate from "./section/mock-invest-update";

const MockInvestC = () => {
  // 유저아이디로, 전략을 운용 하려고 한다.
  // 조회결과

  // 1. 새로 모의 투자를 시작하는 경우
  // ⚠ 만약 여기서 newMockInvest 라는 url를 만들었다면
  // 사용자가 직접 url로 접근을 할 수 있는것 -> 그런 상황이라면 이미 전략이 만들어졌다는 메시지 뿌리기

  // 2. 모의 투자를 수정하는 경우

  // 3. 모의투자데이터가 있어서 바로 보여주면 되는 경우

  return (
    <div>
      <MockInvestP />
      <Switch>
        {/* default mock-invest page section */}
        <Route
          exact
          path={process.env.PUBLIC_URL + "/takers/"}
          component={MockInvestList}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/takers/mock-invest/details/:id"}
          component={MockInvestDetail}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/takers/mock-invest/create/:id/"}
          component={MockInvestCreate}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/takers/mock-invest/update/:id"}
          component={MockInvestUpdate}
        />
      </Switch>
    </div>
  );
};

export default MockInvestC;
