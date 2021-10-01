import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomInspector,
  atomUniversalSettingStateIdx,
  selectedUniversalSetting_R,
} from 'states/strategy/recoil/strategy-create';
import styled from 'styled-components';
import { IInspectorSettings } from '.';
import TechnicalSearch from 'components/common/_atoms/TechnicalSearch';
import { useTechnicals } from 'states/trading/query/useTechnicals';
import { useRequestMiniBacktesting } from 'states/trading/query/useRequestMiniBacktesting';
import { BaseTradingStrategy } from 'states/trading/interface/entities';
import WideLine from 'components/common/_atoms/WideLine';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';

interface ITechnicalStrategyList {
  onSelect?: (e: BaseTradingStrategy) => void;
}
// - 매매 전략 리스트 랜더링
// -- 매매 전략 클릭시 해당 객체 onSelect(callback)
const TechnicalStrategyList: React.FC<ITechnicalStrategyList> = ({
  onSelect,
}) => {
  const { GetTechnicalStrategyListQuery } = useTechnicals();

  return (
    <STechnicalStrategyList>
      {GetTechnicalStrategyListQuery.isLoading && 'loading...'}
      {!GetTechnicalStrategyListQuery.isLoading && (
        <ul className="strategyList">
          {GetTechnicalStrategyListQuery.data?.map((st, idx) => (
            <Button
              type="info"
              className="strategyListItem"
              key={`${idx}-${st.trading_strategy_name}`}
              onClick={() => {
                if (onSelect) onSelect(st);
              }}
            >
              {st.trading_strategy_name}
            </Button>
          ))}
        </ul>
      )}
    </STechnicalStrategyList>
  );
};
const STechnicalStrategyList = styled.article`
  .strategyList {
  }
  .strategyListItem {
    cursor: pointer;
    margin-top: 1rem;
  }
`;
/**
 * -매매전략 검색
 * -매매 전략 리스트
 * -개별 종목에 매매 전략 적용
 */
const TradingSettingTabTechnicalSearch = () => {
  const currentIdx = useRecoilValue(atomUniversalSettingStateIdx);
  const [currentUniversalSetting, setCurrentUniversalSetting] = useRecoilState(
    selectedUniversalSetting_R({ universalIdx: currentIdx }),
  );

  // 선택한 전략을 해당 유니버스에 적용시킨다.
  const handleApplyTechinalToTicker = (e: BaseTradingStrategy) => {
    if (currentUniversalSetting)
      setCurrentUniversalSetting({
        ...currentUniversalSetting,
        selectedTechnical: e,
      });
  };

  return (
    <STradingSettingTabTechnicalSearch>
      <WhiteSpace />
      <WideLine style={{ margin: '0 0 1.3rem 0' }} />
      <div className="info">
        "{currentUniversalSetting?.selectedCorporations.corp_name}" 매매전략을
        선택해 주세요.
      </div>
      <WhiteSpace />
      <div className="info">
        선택된 매매 전략 :{' '}
        {currentUniversalSetting?.selectedTechnical?.trading_strategy_name}
      </div>
      <TechnicalSearch
        onSuccess={(e) => {
          console.log('TechnicalSearch onSuccess', e);
        }}
        onKeyDownEnter={(e) => {
          console.log('TechnicalSearch onKeyDownEnter', e);
        }}
      />
      <WhiteSpace />
      <WideLine style={{ margin: '0 0 1.3rem 0' }} />
      <TechnicalStrategyList onSelect={(e) => handleApplyTechinalToTicker(e)} />
    </STradingSettingTabTechnicalSearch>
  );
};
const STradingSettingTabTechnicalSearch = styled.section``;

/**
 * 전략 발굴에 대한 검색
 * - 종목 ticker에 대해서 , 가능한 모든 매매전략결과를 알려준다.
 * @returns
 */
const TradingSettingTabQuantSearch = () => {
  const currentIdx = useRecoilValue(atomUniversalSettingStateIdx);
  const [currentUniversalSetting, setCurrentUniversalSetting] = useRecoilState(
    selectedUniversalSetting_R({ universalIdx: currentIdx }),
  );

  // 선택한 전략을 해당 유니버스에 적용시킨다.
  const handleApplyTechinalToTicker = (e: BaseTradingStrategy) => {
    if (currentUniversalSetting)
      setCurrentUniversalSetting({
        ...currentUniversalSetting,
        selectedTechnical: e,
      });
  };

  const ticker = useMemo(() => {
    return currentUniversalSetting?.selectedCorporations.ticker;
  }, [currentUniversalSetting]);

  const { RequestMiniBacktestingQuery } = useRequestMiniBacktesting();
  // console.log(RequestMiniBacktestingQuery);
  // RequestMiniBacktestingQuery.mutate

  // TODO Refactoring
  React.useEffect(() => {
    const fetchBacktesting = async () => {
      if (ticker) {
        RequestMiniBacktestingQuery.mutate({ ticker });
      }
    };
    fetchBacktesting();
  }, [ticker]);

  return (
    <div>
      <div>
        {currentUniversalSetting?.selectedCorporations.corp_name}에 대한
        매매전략 추천
      </div>
      <div>
        <br />
        <div>매매전략 이름| CAGR | MDD </div>
        {RequestMiniBacktestingQuery.data?.data.result &&
          RequestMiniBacktestingQuery.data?.data.result.map((e, idx) => {
            return (
              <div
                key={idx}
                style={{
                  cursor: 'pointer',
                  margin: '1rem',
                  backgroundColor: 'AppWorkspace',
                }}
                onClick={() => {
                  handleApplyTechinalToTicker(e.baseTradingStrategy);
                }}
              >
                {e.baseTradingStrategy.trading_strategy_name} (결과)| {e.CAGR}|{' '}
                {e.MDD}
                <br />
              </div>
            );
          })}
      </div>
      {/* <div>{RequestMiniBacktestingQuery.data?.data}</div> */}
    </div>
  );
};

interface ITradingSetting extends IInspectorSettings {}

const TradingSetting: React.FC<ITradingSetting> = ({ headerTitle }) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const tab = useMemo(
    () => inspector.inspectorState.tradingSetting.tab,
    [inspector.inspectorState.tradingSetting],
  );
  const handleTabIdx = (tabIdx: number) => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorState.tradingSetting.tab = tabIdx;
        return draft;
      }),
    );
  };

  return (
    <STradingSetting>
      <InspectorHeaderDetail headerTitle={headerTitle || '매매 전략 설정'} />
      <WingBlank>
        <WideLine style={{ margin: '0 0 1.3rem 0' }} />
        <article className="tabContainer">
          <StabItem selected={tab === 0} onClick={() => handleTabIdx(0)}>
            전략 검색
          </StabItem>
          <StabItem selected={tab === 1} onClick={() => handleTabIdx(1)}>
            전략 발굴
          </StabItem>
        </article>
        {tab === 0 && (
          <>
            <TradingSettingTabTechnicalSearch />
          </>
        )}
        {tab === 1 && (
          <>
            <TradingSettingTabQuantSearch />
          </>
        )}
      </WingBlank>
    </STradingSetting>
  );
};

export default TradingSetting;

const STradingSetting = styled.section`
  .tabContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    cursor: pointer;
    & div:first-child {
      border-top-left-radius: 0.6rem;
      border-bottom-left-radius: 0.6rem;
    }
    & div:last-child {
      border-top-right-radius: 0.6rem;
      border-bottom-right-radius: 0.6rem;
    }
  }
`;

const StabItem = styled.div<{ selected?: boolean }>`
  min-height: 6rem;
  background-color: ${(props) =>
    props.selected ? props.theme.ColorMainYellow : props.theme.ColorWhite};
  color: ${(props) =>
    props.selected ? props.theme.ColorWhite : props.theme.ColorDark};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;
