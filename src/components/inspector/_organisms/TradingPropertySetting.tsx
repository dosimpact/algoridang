import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WideLine from 'components/common/_atoms/WideLine';
import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import StPropsSetting from 'components/inspector/_molecules/StPropsSetting';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomUniversalSettingStateIdx,
  selectedUniversalSetting_R,
} from 'states/common/recoil/dashBoard/dashBoard';
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

  const currentIdx = useRecoilValue(atomUniversalSettingStateIdx);
  console.log('currentIdx>', currentIdx);

  const [currentUniversalSetting, setCurrentUniversalSetting] = useRecoilState(
    selectedUniversalSetting_R({ universalIdx: currentIdx }),
  );
  const setting_json = useMemo(() => {
    return currentUniversalSetting?.selectedTechnical?.setting_json;
  }, [currentUniversalSetting]);
  console.log('setting_json>', setting_json);
  // 현재 변경할 unverisalSetting
  const handleSubmit = (e: unknown) => {
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
  };

  return (
    <div>
      <InspectorHeaderDetail
        headerTitle={headerTitle || '매매 전략 상세설정'}
        toolTip="매매 전략에 대한 세부 지표를 설정합니다."
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
