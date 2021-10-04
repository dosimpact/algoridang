import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WingBlank from 'components/common/_atoms/WingBlank';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useStrategy from 'states/strategy/query/useStrategy';

// 더보기 버튼에서 온 인피니트 스크롤링 페이지

const StrategyListTypes = [
  'new',
  'high-view',
  'stable-income',
  'risk-taking',
  'neutral',
  'high-profit',
];

type StrategyListTypeParams = {
  type: string;
};

const StrategyListType = () => {
  const history = useHistory();
  const params = useParams<StrategyListTypeParams>();

  if (!StrategyListTypes.includes(params['type'])) {
    history.push(process.env.PUBLIC_URL + '/takers/strategy-search');
  }
  let type = params['type'];

  const {
    strategyListNew,
    strategyListHighView,
    strategyListRiskTaking,
    strategyListNeutral,
    strategyListStableIncome,
  } = useStrategy();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  return (
    <>
      {type === 'new' && (
        <>
          <NavHeaderDetail
            linkTo={process.env.PUBLIC_URL + '/takers/strategy-search'}
            headerTitle="신규 투자 전략"
          />
          <WhiteSpace />
          <WingBlank>
            {strategyListNew &&
              strategyListNew.map((data, key) => (
                <StrategyCardInfo
                  key={key}
                  strategy={data}
                  onClick={() => {
                    history.push(
                      `/takers/strategy-search/details/${data.strategy_code}`,
                    );
                  }}
                />
              ))}
            <WhiteSpace />
          </WingBlank>
        </>
      )}
      {type === 'high-view' && (
        <>
          <NavHeaderDetail
            linkTo={process.env.PUBLIC_URL + '/takers/strategy-search'}
            headerTitle="조회수 높은 투자 전략"
          />
          <WhiteSpace />
          <WingBlank>
            {strategyListHighView &&
              strategyListHighView.map((data, key) => (
                <StrategyCardInfo
                  key={key}
                  strategy={data}
                  onClick={() => {
                    history.push(
                      `/takers/strategy-search/details/${data.strategy_code}`,
                    );
                  }}
                />
              ))}
            <WhiteSpace />
          </WingBlank>
        </>
      )}

      {type === 'risk-taking' && (
        <>
          <NavHeaderDetail
            linkTo={process.env.PUBLIC_URL + '/takers/strategy-search'}
            headerTitle="위험 추구형 전략"
          />
          <WhiteSpace />
          <WingBlank>
            {strategyListRiskTaking &&
              strategyListRiskTaking.map((data, key) => (
                <StrategyCardInfo
                  key={key}
                  strategy={data}
                  onClick={() => {
                    history.push(
                      `/takers/strategy-search/details/${data.strategy_code}`,
                    );
                  }}
                />
              ))}
            <WhiteSpace />
          </WingBlank>
        </>
      )}
      {type === 'neutral' && (
        <>
          <NavHeaderDetail
            linkTo={process.env.PUBLIC_URL + '/takers/strategy-search'}
            headerTitle="중립형 투자 전략"
          />
          <WhiteSpace />
          <WingBlank>
            {strategyListNeutral &&
              strategyListNeutral.map((data, key) => (
                <StrategyCardInfo
                  key={key}
                  strategy={data}
                  onClick={() => {
                    history.push(
                      `/takers/strategy-search/details/${data.strategy_code}`,
                    );
                  }}
                />
              ))}
            <WhiteSpace />
          </WingBlank>
        </>
      )}
      {type === 'stable-income' && (
        <>
          <NavHeaderDetail
            linkTo={process.env.PUBLIC_URL + '/takers/strategy-search'}
            headerTitle="수익 안정형 전략"
          />
          <WhiteSpace />
          <WingBlank>
            {strategyListStableIncome &&
              strategyListStableIncome.map((data, key) => (
                <StrategyCardInfo
                  key={key}
                  strategy={data}
                  onClick={() => {
                    history.push(
                      `/takers/strategy-search/details/${data.strategy_code}`,
                    );
                  }}
                />
              ))}
            <WhiteSpace />
          </WingBlank>
        </>
      )}
      {type === 'high-profit' && (
        <>
          <NavHeaderDetail
            linkTo={process.env.PUBLIC_URL + '/takers/strategy-search'}
            headerTitle="신규 투자 전략"
          />
          <WhiteSpace />
          <WingBlank>
            {strategyListNeutral &&
              strategyListNeutral.map((data, key) => (
                <StrategyCardInfo
                  key={key}
                  strategy={data}
                  onClick={() => {
                    history.push(
                      `/takers/strategy-search/details/${data.strategy_code}`,
                    );
                  }}
                />
              ))}
            <WhiteSpace />
          </WingBlank>
        </>
      )}
    </>
  );
};

export default StrategyListType;