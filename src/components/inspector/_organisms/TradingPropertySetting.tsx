import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WideLine from 'components/common/_atoms/WideLine';
import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import StPropsSetting from 'components/inspector/_molecules/StPropsSetting';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomInspector,
  selectedUniversalSetting_R,
} from 'states/strategy/recoil/strategy-create';
import { SettingJSON } from 'states/trading/interface/entities';
import { IInspectorSettings } from '.';

interface ITradingPropertySetting extends IInspectorSettings {}
/**
 * 인스팩터 - 매매전략 상세설정(TradingPropertySetting)
 * @param {ITradingPropertySetting} ITradingPropertySetting
 * @returns {JSX.Element} TradingPropertySetting
 */
const TradingPropertySetting: React.FC<ITradingPropertySetting> = ({
  headerTitle,
}) => {
  // 현재 변경 타겟의 seletedIdx
  const inspector = useRecoilValue(atomInspector);
  const selectedIndex = useMemo(
    () => inspector.inspectorState.tradingPropertySetting.selectedIndex,
    [inspector],
  );
  // console.log('selectedIndex', selectedIndex);

  const [currentUniversalSetting, setCurrentUniversalSetting] = useRecoilState(
    selectedUniversalSetting_R({ universalIdx: selectedIndex }),
  );
  const setting_json = useMemo(() => {
    return currentUniversalSetting?.selectedTechnical?.setting_json;
  }, [currentUniversalSetting]);
  // console.log('currentUniversalSetting', currentUniversalSetting);

  // 현재 변경할 unverisalSetting

  const handleSubmit = (e: unknown) => {
    // console.log('e', e);
    // console.log('currentUniversalSetting', currentUniversalSetting);
    const setting_json = e as SettingJSON;
    if (currentUniversalSetting && currentUniversalSetting.selectedTechnical) {
      setCurrentUniversalSetting({
        ...currentUniversalSetting,
        selectedTechnical: {
          ...currentUniversalSetting.selectedTechnical,
          setting_json,
        },
      });
    }
    // TODO 왜 안될까?
    // setCurrentUniversalSetting((prev) =>
    //   produce(prev, (draft) => {
    //     console.log(draft);
    //     console.log(draft?.selectedTechnical?.setting_json);
    //     const setting_json = e as SettingJSON;
    //     if (
    //       currentUniversalSetting &&
    //       currentUniversalSetting.selectedTechnical
    //     ) {
    //       draft?.selectedTechnical?.setting_json = setting_json;
    //     }
    //     return draft;
    //   }),
    // );
  };

  return (
    <div>
      <InspectorHeaderDetail
        headerTitle={headerTitle || '매매 전략 상세설정'}
      />
      <WideLine style={{ margin: '0 0 1.3rem 0' }} />
      <WingBlank>
        {!currentUniversalSetting?.selectedTechnical && (
          <div>매매 전략을 우선 선택해주세요</div>
        )}
        {currentUniversalSetting?.selectedTechnical && setting_json && (
          <>
            <WhiteSpace />
            <div>
              <StPropsSetting
                trading_strategy_name={
                  currentUniversalSetting?.selectedTechnical
                    .trading_strategy_name
                }
                onSubmit={handleSubmit}
                setting_json={setting_json}
              />
            </div>
          </>
        )}
      </WingBlank>
    </div>
  );
};

export default TradingPropertySetting;
