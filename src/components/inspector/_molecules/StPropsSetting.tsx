import React, { useCallback, useMemo } from 'react';
import { SettingJSON, StrategyName } from 'states/interface/trading/entities';
import { StPropsSMA, StPropsGoldenCross } from './StPropsSettingItems';

interface IStPropsSetting {
  trading_strategy_name: StrategyName;
  onSubmit?: (e: unknown) => void;
  setting_json?: SettingJSON;
}
const StPropsSetting: React.FC<IStPropsSetting> = ({
  children,
  trading_strategy_name,
  onSubmit,
  setting_json,
}) => {
  const handleSubmit = useCallback(
    (e: unknown) => {
      if (onSubmit) onSubmit(e);
    },
    [onSubmit],
  );

  const SelectedStSettingItem = useMemo(() => {
    if (trading_strategy_name === StrategyName.SMA) {
      return <StPropsSMA onSubmit={handleSubmit} setting_json={setting_json} />;
    } else if (trading_strategy_name === StrategyName.GoldenCross) {
      return (
        <StPropsGoldenCross
          onSubmit={handleSubmit}
          setting_json={setting_json}
        />
      );
    }
    return <div>Error</div>;
  }, [trading_strategy_name, handleSubmit]);

  return (
    <div>
      <div>매매전략 이름 : {trading_strategy_name}</div>
      {children}
      {SelectedStSettingItem}
    </div>
  );
};

export default StPropsSetting;
