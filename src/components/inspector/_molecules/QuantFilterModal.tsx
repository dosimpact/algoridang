import { Button } from 'components/common/_atoms/Buttons';
import React from 'react';
import { IatomQSBody } from 'states/common/recoil/dashBoard/QuantSelect';
import {
  IQuantPreset,
  QuantPresetObject,
  RequestFSKeys,
  RequestFSKeysToKo,
  RequestFSKeysToKoDesciption,
} from 'states/finance/interface/entities';
import styled from 'styled-components';
import {
  IhandlePreset,
  IhandleToggleQSBodyValue,
} from '../_organisms/UniversalSettingTabQuantSearchVM';

// TODO 예상컨데, 필터 타입이 두가지가 있음
// Range를 먹이는 필터
// category를 먹이는 필터

interface IQuantFilterModal {
  QSBody: IatomQSBody;
  currentFSKey: RequestFSKeys;
  onRequestClose: () => void;
  onSetCurrentFSKey?: (key: RequestFSKeys) => void;
  handleToggleQSBodyValue?: IhandleToggleQSBodyValue;
  handlePreset?: IhandlePreset;
}
const QuantFilterModal: React.FC<IQuantFilterModal> = ({
  onRequestClose,
  QSBody,
  currentFSKey,
  onSetCurrentFSKey,
  handleToggleQSBodyValue,
  handlePreset,
}) => {
  return (
    <SQuantFilterModal>
      <section className="wrapper">
        <article className="col1">
          {/* <div>섹터 필터</div>
          <div>
            <input type="checkbox" name="kospi" id="kospi" />
            <label htmlFor="kospi">코스피</label>
            <input type="checkbox" name="kosdaq" id="kosdaq" />
            <label htmlFor="kosdaq">코스피</label>
          </div> */}
          <div className="modalTitle">퀀트 필터 프리셋</div>
          <div className="modalsubTitle warn">
            *주의 : 클릭시 필터값이 변경됩니다.
          </div>
          <div>
            {Object.keys(QuantPresetObject).map((key) => {
              let _key = key as IQuantPreset;
              return (
                <div className="row" key={_key}>
                  <input type="checkbox" id={_key} />
                  <label htmlFor={_key}>
                    <Button
                      onClick={() => {
                        if (handlePreset) handlePreset(_key);
                      }}
                      type="normal"
                      className="quantPresetBtn"
                    >
                      선택
                    </Button>
                    <div
                      className="setLabel"
                      onClick={() => {
                        if (onSetCurrentFSKey)
                          onSetCurrentFSKey(_key as RequestFSKeys);
                      }}
                    >
                      {QuantPresetObject[_key]}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </article>
        <article className="col2">
          <div className="modalTitle">재무 필터</div>
          <div className="filterScroll">
            {Object.keys(QSBody.data).map((key) => {
              const _key = key as RequestFSKeys;
              const selected = typeof QSBody.data[_key] === 'object';
              // console.log('QSBody.data[key];', QSBody.data[_key]);
              return (
                <div key={_key}>
                  <input type="checkbox" id={_key} checked={selected} />
                  <label>
                    <span
                      onClick={() => {
                        if (handleToggleQSBodyValue)
                          handleToggleQSBodyValue(_key);
                      }}
                      className="checkbox"
                    ></span>
                    <div
                      className="setLabel"
                      onClick={() => {
                        if (onSetCurrentFSKey) onSetCurrentFSKey(_key);
                      }}
                    >
                      {RequestFSKeysToKo[_key]}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </article>
        <article className="col3">
          <div className="modalTitle">필터 설명</div>
          <div
            className="setLabel"
            dangerouslySetInnerHTML={{
              __html: RequestFSKeysToKoDesciption[currentFSKey],
            }}
          />
        </article>
      </section>
      <div className="buttonList">
        <Button
          type="blue"
          className="buttonItem"
          onClick={() => {
            if (onRequestClose) onRequestClose();
          }}
        >
          적용
        </Button>
        <Button
          type="gray"
          className="buttonItem"
          onClick={() => {
            if (onRequestClose) onRequestClose();
          }}
        >
          닫기
        </Button>
      </div>
    </SQuantFilterModal>
  );
};

export default QuantFilterModal;

const SQuantFilterModal = styled.section`
  height: 100%;
  padding: 2rem;
  z-index: 1000;
  .buttonList {
    display: flex;
    justify-content: flex-end;
  }
  .buttonItem {
    width: 16.2rem;
    height: 4rem;
    align-items: center;
    font-size: 1.8rem;
    margin-left: 2rem;
  }
  .wrapper {
    padding: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 70vh;
    grid-gap: 1rem;
  }
  .col1 {
    border-right: 0.3rem solid ${(props) => props.theme.ColorGrayL1};
    padding-left: 2rem;
  }
  .col2 {
    border-right: 0.3rem solid ${(props) => props.theme.ColorGrayL1};
    padding-left: 2rem;
  }
  .col3 {
    padding-left: 2rem;
  }
  .modalTitle {
    font-weight: 500;
    font-size: 3rem;
    margin-bottom: 3rem;
  }
  .filterScroll {
    max-height: 60vh;
    overflow-y: scroll;
  }
  .modalsubTitle {
    /* font-size: 2.5rem; */
  }
  .setLabel {
    font-style: normal;
    font-size: 2rem;
    line-height: 2.9rem;
    letter-spacing: 0.06rem;
  }
  .warn {
    color: ${(props) => props.theme.ColorMainRed};
    margin-bottom: 2rem;
  }
  .row {
    margin-bottom: 1rem;
  }
  .quantPresetBtn {
    margin-right: 1rem;
  }
`;
