import TickerSearch, {
  TickerSearchOnSuccessResult,
} from 'components/common/_molecules/TickerSearch';
import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { Corporation } from 'states/interface/finance/entities';
import {
  atomInspector,
  atomUniversalSettingState,
} from 'states/recoil/strategy-create';
import styled from 'styled-components';
import { RemoveMultipleElements } from 'utils/parse';
import { IInspectorSettings } from '.';
import Modal from 'react-modal';
import produce from 'immer';

//https://velog.io/@seungsang00/React-React-Modal
Modal.setAppElement('#root');

// UniversalSetting - TabTickerSearch
const UniversalSettingTabTickerSearch = () => {
  // 2. 종목관리 상태
  const [universalSettingState, setUniversalSettingState] = useRecoilState(
    atomUniversalSettingState,
  );
  // 2.1 삭제예정인 티커들
  const [willDelCorpIdxs, setWillDelCorpIdxs] = React.useState<Set<number>>(
    new Set(),
  );
  // 2.3 종목 삭제하기
  const handleWillDelTickerClick = () => {
    setUniversalSettingState((prev) => {
      const result = RemoveMultipleElements(
        prev.selected,
        Array.from(willDelCorpIdxs.values()),
      );
      // console.log(result);
      return { ...prev, selected: result };
    });
    // willDelCorpIdxs
    setWillDelCorpIdxs(new Set<number>());
  };

  // 3. 종목 검색 결과
  const [searchResultCorps, setSearchResultCorps] = React.useState<
    Corporation[]
  >([]);
  // 3.1 검색된 종목을 임시 저장
  const handleSearchedCorporations = React.useCallback(
    (e: TickerSearchOnSuccessResult) => {
      setSearchResultCorps(e.corporations);
    },
    [],
  );

  return (
    <>
      <TickerSearch
        onSuccess={handleSearchedCorporations}
        onKeyDownEnter={(e) => {
          console.log('keydonwenter event');
          if (searchResultCorps.length >= 1) {
            console.log('searchResultCorps[0]', searchResultCorps[0]);
            setUniversalSettingState((prev) => {
              return {
                ...prev,
                selected: [
                  ...prev.selected,
                  { selectedCorporations: searchResultCorps[0] },
                ],
              };
            });
          }
        }}
      />
      <div>---</div>
      <button onClick={handleWillDelTickerClick}>종목삭제</button>
      <div>선택된 종목 {willDelCorpIdxs.size} 개 삭제하기</div>
      <div>
        {universalSettingState.selected.map((data, idx) => {
          return (
            <div
              key={`willDel-${idx}${data.selectedCorporations.ticker}`}
              style={{ display: 'flex' }}
            >
              <input
                onClick={(e) => {
                  if (e.currentTarget.checked) {
                    setWillDelCorpIdxs((prev) => new Set(prev.add(idx)));
                  } else {
                    setWillDelCorpIdxs((prev) => {
                      prev.delete(idx);
                      return new Set(prev);
                    });
                  }
                }}
                id={`willDel-${idx}${data.selectedCorporations.ticker}`}
                type="checkbox"
              ></input>
              <label htmlFor={`willDel-${idx}`}>
                <div key={idx}>{data.selectedCorporations.corp_name}</div>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

const UniversalSettingTabQuantSearch = () => {
  // 1. 모달창 open/close 상태
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  return (
    <>
      <div>UniversalSettingTabQuantSearch</div>

      <div>----</div>
      <div>
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          필터 추가
        </button>
        <button>종목 추출</button>
      </div>
      <div>종목 추가 하기</div>
      <ul>
        <li>
          <div className="title">거래량 ( 단위: )</div>
          <div style={{ display: 'flex' }}>
            <input type="text" name="" id="" placeholder="0" />
            <span>~</span>
            <input type="text" name="" id="" placeholder="100" />
          </div>
        </li>
        <li>
          <div className="title">ROE ( 단위: )</div>
          <div style={{ display: 'flex' }}>
            <input type="text" name="" id="" placeholder="0" />
            <span>~</span>
            <input type="text" name="" id="" placeholder="100" />
          </div>
        </li>
      </ul>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <QuantFilter />
        <button
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          close
        </button>
      </Modal>
    </>
  );
};

const QuantFilter = () => {
  return (
    <SQuantFilter>
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
    </SQuantFilter>
  );
};
const SQuantFilter = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  min-height: 80%;
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

interface IUniversalSetting extends IInspectorSettings {}

const UniversalSetting: React.FC<IUniversalSetting> = ({ headerTitle }) => {
  // 1 인스펙터 상태
  const [inspector, setInspector] = useRecoilState(atomInspector);

  // 1.1 현재 인스팩터 상태
  const tab = useMemo(
    () => inspector.inspectorState.universalSetting.tab,
    [inspector.inspectorState.universalSetting],
  );

  const handleTabIdx = (tabIdx: number) => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorState.universalSetting.tab = tabIdx;
        return draft;
      }),
    );
  };

  return (
    <SUniversalSetting>
      <WingBlank>
        <InspectorHeaderDetail
          headerTitle={headerTitle || 'UniversalSetting'}
        />
        <article className="tabContainer">
          <div onClick={() => handleTabIdx(0)} className="tabItem">
            종목 검색
          </div>
          <div onClick={() => handleTabIdx(1)} className="tabItem">
            퀀트 발굴
          </div>
        </article>
        {tab === 0 && (
          <>
            <UniversalSettingTabTickerSearch />
          </>
        )}
        {tab === 1 && (
          <>
            <UniversalSettingTabQuantSearch />
          </>
        )}
      </WingBlank>
    </SUniversalSetting>
  );
};

export default UniversalSetting;

const SUniversalSetting = styled.section`
  .tabContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    cursor: pointer;
    .tabItem {
      min-height: 4rem;
      background-color: bisque;
      text-align: center;
    }
  }
`;
