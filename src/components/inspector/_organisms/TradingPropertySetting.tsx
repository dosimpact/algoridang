import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import StPropsSetting from 'components/inspector/_molecules/StPropsSetting';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SettingJSON } from 'states/interface/trading/entities';
import {
  atomInspector,
  atomUniversalSettingState,
  selectedUniversalSetting,
  selectedUniversalSetting_R,
} from 'states/recoil/strategy-create';
import { IInspectorSettings } from '.';

interface ITradingPropertySetting extends IInspectorSettings {}

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
        headerTitle={headerTitle || 'TradingPropertySetting'}
      />

      {!currentUniversalSetting?.selectedTechnical && (
        <div>매매전략을 설정해주세요</div>
      )}

      {currentUniversalSetting?.selectedTechnical && setting_json && (
        <>
          <div>매매 전략 상세 설정</div>
          <div>
            <StPropsSetting
              trading_strategy_name={
                currentUniversalSetting?.selectedTechnical.trading_strategy_name
              }
              onSubmit={handleSubmit}
              setting_json={setting_json}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TradingPropertySetting;
