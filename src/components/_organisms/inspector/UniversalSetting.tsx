import TickerSearch, {
  TickerSearchOnSuccessResult,
} from "components/_atoms/TickerSearch";
import WingBlank from "components/_atoms/WingBlank";
import InspectorHeaderDetail from "components/_molecules/inspector/InspectorHeaderDetail";
import React from "react";
import { useRecoilState } from "recoil";
import { Corporation } from "states/interface/finance/entities";
import {
  atomInspector,
  atomUniversalSettingState,
} from "states/recoil/strategy-create";
import styled from "styled-components";
import { RemoveMultipleElements } from "utils/parse";
import { IInspectorSettings } from ".";

// UniversalSetting - TabTickerSearch
const UniversalSettingTabTickerSearch = () => {
  // 2. 종목관리 상태
  const [universalSettingState, setUniversalSettingState] = useRecoilState(
    atomUniversalSettingState
  );
  // 2.1 삭제예정인 티커들
  const [willDelCorpIdxs, setWillDelCorpIdxs] = React.useState<Set<number>>(
    new Set()
  );
  // 2.3 종목 삭제하기
  const handleWillDelTickerClick = () => {
    setUniversalSettingState((prev) => {
      const result = RemoveMultipleElements(
        prev.selectedCorporations,
        Array.from(willDelCorpIdxs.values())
      );
      // console.log(result);
      return { ...prev, selectedCorporations: result };
    });
    // willDelCorpIdxs
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
    []
  );

  return (
    <>
      <TickerSearch
        onSuccess={handleSearchedCorporations}
        onKeyDownEnter={(e) => {
          if (searchResultCorps.length >= 1) {
            setUniversalSettingState((prev) => {
              return {
                ...prev,
                selectedCorporations: [
                  ...prev.selectedCorporations,
                  searchResultCorps[0],
                ],
              };
            });
          }
        }}
      />
      <div>---</div>
      <button onClick={handleWillDelTickerClick}>종목삭제</button>
      <div>선택된 종목 {1} 개</div>
      <div>
        {universalSettingState.selectedCorporations.map((corp, idx) => {
          return (
            <div style={{ display: "flex" }}>
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
                id={`willDel-${idx}`}
                type="checkbox"
              ></input>
              <label htmlFor={`willDel-${idx}`}>
                <div key={idx}>{corp.corp_name}</div>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

interface IUniversalSetting extends IInspectorSettings {}

const UniversalSetting: React.FC<IUniversalSetting> = ({ headerTitle }) => {
  // 1 인스펙터 상태
  const [inspectorState, setInspectorState] = useRecoilState(atomInspector);

  // 1.1 현재 인스팩터 상태
  const inspectorUniversalSetting = React.useMemo(() => {
    return inspectorState.inspectorState.universalSetting;
  }, [inspectorState]);

  // 1.1.1 TODO 탭 상태 - 중간 임시변수 없시, 바로 Recoil과 바인딩 하도록
  const [tab, setTab] = React.useState(inspectorUniversalSetting.tab);

  // 1.2 탭 상태 관리
  const handleTabIdx = (tabIdx: number) => {
    setTab(tabIdx);
    // TODO Recoild Setter ( depth level = 4) (using like immer.js)
    setInspectorState((prev) => {
      return {
        ...prev,
        inspectorState: {
          ...prev.inspectorState,
          universalSetting: {
            ...prev.inspectorState.universalSetting,
            tab: tabIdx,
          },
        },
      };
    });
  };

  return (
    <SUniversalSetting>
      <WingBlank>
        <InspectorHeaderDetail
          headerTitle={headerTitle || "UniversalSetting"}
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
            <div>퀀트 발굴</div>
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
