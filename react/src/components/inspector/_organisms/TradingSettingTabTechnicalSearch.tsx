import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomUniversalSettingStateIdx,
  selectedUniversalSetting_R,
} from 'states/common/recoil/dashBoard/dashBoard';
import styled from 'styled-components';
import TechnicalSearch from 'components/common/_atoms/TechnicalSearch';
import { useTechnicals } from 'states/trading/query/useTechnicals';
import { BaseTradingStrategy } from 'states/trading/interface/entities';
import WideLine from 'components/common/_atoms/WideLine';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';
import { Title } from 'components/common/_atoms/Typos';

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
          {GetTechnicalStrategyListQuery.data?.map((st, idx) => {
            if (st.trading_strategy_name === 'None') {
              return <></>;
            }
            return (
              <Button
                type="blue"
                className="strategyListItem"
                key={`${idx}-${st.trading_strategy_name}`}
                onClick={() => {
                  if (onSelect) onSelect(st);
                }}
              >
                {st.trading_strategy_name}
              </Button>
            );
          })}
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
      <Title
        title={`"${currentUniversalSetting?.selectedCorporations.corp_name}" 매매전략을 선택해 주세요.`}
      ></Title>
      <WhiteSpace />
      <div className="info">
        선택된 매매 전략 :{' '}
        {currentUniversalSetting?.selectedTechnical?.trading_strategy_name}
      </div>
      {/* <TechnicalSearch
        onSuccess={(e) => {
          console.log('TechnicalSearch onSuccess', e);
        }}
        onKeyDownEnter={(e) => {
          console.log('TechnicalSearch onKeyDownEnter', e);
        }}
      /> */}
      <WhiteSpace />
      {/* <WideLine style={{ margin: '0 0 1.3rem 0' }} /> */}
      <TechnicalStrategyList onSelect={(e) => handleApplyTechinalToTicker(e)} />
    </STradingSettingTabTechnicalSearch>
  );
};

const STradingSettingTabTechnicalSearch = styled.section``;

export default TradingSettingTabTechnicalSearch;
