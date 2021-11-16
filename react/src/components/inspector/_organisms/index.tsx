// index inspector JSX.Element
import { Button } from 'components/common/_atoms/Buttons';
import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import styled from 'styled-components';

export { default as BackTestingSetting } from './BackTestingSetting';
export { default as BasicSettings } from './BaseSettings';
export { default as TradingPropertySetting } from './TradingPropertySetting';
export { default as TradingSetting } from './TradingSetting';
export { default as UniversalSetting } from './UniversalSetting';

export interface IInspectorSettings {
  headerTitle?: string;
  toolTip?: string;
  isComplete?: boolean;
  nextBtnHandler?: () => void;
  prevBtnHandler?: () => void;
}

const InspectorSettings: React.FC<IInspectorSettings> = ({
  headerTitle,
  toolTip,
  children,
  isComplete,
  nextBtnHandler,
}) => {
  return (
    <SInspectorSettings>
      <div className="inspectorSettingsHeader">
        <InspectorHeaderDetail
          headerTitle={headerTitle || 'InspectorSettings'}
          toolTip={toolTip || ''}
        />
      </div>
      <div className="inspectorSettingsBody">{children}</div>
      <div className="inspectorSettingsFooter">
        <WingBlank>
          {isComplete && (
            <div className="inspectorSettingsNavBtns">
              {nextBtnHandler !== undefined && (
                <Button
                  className="midSizeBtn"
                  type="blue"
                  onClick={nextBtnHandler}
                >
                  다음
                </Button>
              )}
            </div>
          )}
        </WingBlank>
      </div>
    </SInspectorSettings>
  );
};

export default InspectorSettings;

const SInspectorSettings = styled.section`
  height: 100vh;
  overflow-y: scroll;
  /* position: relative; */
  .inspectorSettingsHeader {
  }
  .inspectorSettingsBody {
  }
  .inspectorSettingsFooter {
    /* position: absolute;
    bottom: 1rem;
    right: 0;
    width: 100%; */
    margin-top: 1rem;
    .inspectorSettingsNavBtns {
      display: flex;
      justify-content: flex-end;
    }
  }
  .midSizeBtn {
    height: 4rem;
    width: 30%;
    font-size: 1.8rem;
  }
`;
