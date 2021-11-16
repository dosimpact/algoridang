import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WingBlank from 'components/common/_atoms/WingBlank';
import StrategyCardInfoEmpty from 'components/common/_molecules/StrategyCardInfoEmpty';
import StrategyDetailsVM from 'components/strategy/template/strategy-details-VM';
import { useRecoilValue } from 'recoil';
import { atomCurrentStrategyCode } from 'states/common/recoil/dashBoard/dashBoard';

const BackTestingSettingTabResult = () => {
  const currentStrategyCode = useRecoilValue(atomCurrentStrategyCode);
  console.log('currentStrategyCode', currentStrategyCode);

  if (currentStrategyCode === '') {
    return (
      <WingBlank>
        <WhiteSpace />
        <StrategyCardInfoEmpty message="백테스팅 탭에서 전략 생성하기를 해주세요." />
      </WingBlank>
    );
  }
  return (
    <>
      <StrategyDetailsVM
        strategyCode={currentStrategyCode}
        showType={'detail'}
      />
    </>
  );
};

export default BackTestingSettingTabResult;
