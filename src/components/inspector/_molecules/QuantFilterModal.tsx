import { Button } from 'components/common/_atoms/Buttons';
import React from 'react';
import styled from 'styled-components';

// TODO 예상컨데, 필터 타입이 두가지가 있음
// Range를 먹이는 필터
// category를 먹이는 필터

interface IQuantFilterModal {
  onRequestClose: () => void;
}
const QuantFilterModal: React.FC<IQuantFilterModal> = ({ onRequestClose }) => {
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
          <div>모든 필터</div>
          {['시가 총액', '시가총액', 'PER', 'PCR', 'PSR'].map((word, idx) => {
            return (
              <div key={idx}>
                <input
                  type="checkbox"
                  name={`filter-${idx}`}
                  id={`filter-${idx}`}
                />
                <label htmlFor={`filter-${idx}`}>{word}</label>
              </div>
            );
          })}
        </article>
        <article className="col3">
          <div>필터 설명</div>
          <div
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            시가총액(Market Capitalization) 전일종가와 발행주식 수를 곱한 것으로
            주식시장에서 상장회사의 규모를 평가하는 지표이다.
          </div>
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
