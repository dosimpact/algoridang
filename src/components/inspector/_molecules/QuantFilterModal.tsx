import { Button } from 'components/common/_atoms/Buttons';
import React from 'react';
import {
  IatomQSBody,
  selectorQSBodyOnOff_IO,
  selectorQSBodyOnOff_Params,
} from 'states/common/recoil/dashBoard/QuantSelect';
import {
  RequestFSKeys,
  RequestFSKeysToKo,
  RequestFSKeysToKoDesciption,
} from 'states/finance/interface/entities';
import styled from 'styled-components';
import {
  IhandlePreset,
  IhandleSetQSBodyValue,
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
      <section className="wrapper">
        <article className="col1">
          <div>섹터 필터</div>
          <div>
            <input type="checkbox" name="kospi" id="kospi" />
            <label htmlFor="kospi">코스피</label>
            <input type="checkbox" name="kosdaq" id="kosdaq" />
            <label htmlFor="kosdaq">코스피</label>
          </div>
          <div>퀀트 필터셋</div>
          <div>
            <input type="checkbox" name="filterSet-1" id="filterSet-1" />
            <label htmlFor="filterSet-1">마법공식</label>
            <input type="checkbox" name="filterSet-2" id="filterSet-2" />
            <label htmlFor="filterSet-2">테스트 공식</label>
          </div>
        </article>
        <article className="col2">
          <div>재무 필터</div>
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
        </article>
        <article className="col3">
          <div>필터 설명</div>
          <div
            dangerouslySetInnerHTML={{
              __html: RequestFSKeysToKoDesciption[currentFSKey],
            }}
          />
        </article>
      </section>
    </SQuantFilterModal>
  );
};

export default QuantFilterModal;

const SQuantFilterModal = styled.section`
  height: 100%;
  padding: 2rem;
  z-index: 1000;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 4rem 1fr;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    min-height: 80%;
    height: calc(100%-2rem);
  }
  .col1 {
    background-color: aliceblue;
  }
  .col2 {
    background-color: antiquewhite;
  }
  .col3 {
    background-color: azure;
  }
`;
